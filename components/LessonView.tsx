
import React, { useState, useEffect, useRef } from 'react';
import { TranslationStructure, Language, PracticeItem, QuizPractice, CodePractice, Module } from '../types';
import { ArrowLeft, CheckCircle, ArrowRight, Play, Eye, Code, HelpCircle, Loader2, Lightbulb, Square, Volume2, Trophy, ThumbsUp, ThumbsDown } from 'lucide-react';
import { getLessonContent } from '../data';
import Editor from "@monaco-editor/react";
import confetti from 'canvas-confetti';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { auth, voteLesson, getLessonRating, saveLessonFeedback } from '../services/firebase';
import RatingFeedbackModal from './RatingFeedbackModal';
import { sendFeedbackEmail } from '../services/email';

interface LessonViewProps {
  t: TranslationStructure;
  lang: Language;
  onComplete: (id: string) => void;
  completedLessons: string[];
  courseData: Module[];
}

// Extracted to be reusable in QuizComponent
const renderInlineMarkdown = (text: string) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((p, pi) => {
      if (p.startsWith('**') && p.endsWith('**')) return <strong key={pi} className="text-slate-900 dark:text-white font-semibold">{p.slice(2, -2)}</strong>;
      if (p.startsWith('`') && p.endsWith('`')) return <code key={pi} className="bg-slate-200 dark:bg-slate-800/80 px-1.5 py-0.5 rounded-md text-brand-700 dark:text-brand-300 font-mono text-sm border border-slate-300 dark:border-slate-700/50 mx-1 shadow-sm inline-block" dir="ltr">{p.slice(1, -1)}</code>;
      return p;
  });
};

const QuizComponent: React.FC<{ item: QuizPractice; t: TranslationStructure; onSolved: (id: string) => void }> = ({ item, t, onSolved }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = selected === item.correctAnswer;

  useEffect(() => {
    if (submitted && isCorrect) {
      onSolved(item.id);
    }
  }, [submitted, isCorrect, item.id, onSolved]);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-8 shadow-lg">
      <div className="flex items-center mb-4">
        <HelpCircle className="text-brand-500 dark:text-brand-400 mr-2 rtl:mr-0 rtl:ml-2" size={24} />
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.question}</h3>
      </div>
      
      <div className="space-y-3">
        {item.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => { setSelected(idx); setSubmitted(true); }}
            disabled={submitted && isCorrect}
            className={`
              w-full text-start p-4 rounded-lg border transition-all flex justify-between items-center
              ${submitted && idx === item.correctAnswer && idx === selected
                ? 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-800 dark:text-green-100' 
                : submitted && idx === selected && idx !== item.correctAnswer
                  ? 'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-100'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'}
            `}
          >
            <span>{renderInlineMarkdown(option)}</span>
            {submitted && idx === item.correctAnswer && idx === selected && <CheckCircle size={18} className="text-green-600 dark:text-green-400" />}
          </button>
        ))}
      </div>

      {submitted && (
        <div className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200'} animate-fade-in-up`}>
          <p className="font-bold mb-1">
            {isCorrect ? t.practice.quizCorrect : t.practice.quizIncorrect}
          </p>
          {isCorrect && item.explanation && (
            <p className="text-sm opacity-90">{renderInlineMarkdown(item.explanation)}</p>
          )}
        </div>
      )}
    </div>
  );
};

const CodePlayground: React.FC<{ item: CodePractice; t: TranslationStructure }> = ({ item, t }) => {
  const [code, setCode] = useState(item.initialCode);
  const [showSolution, setShowSolution] = useState(false);
  const [previewKey, setPreviewKey] = useState(0); 
  const [isRunning, setIsRunning] = useState(false);

  const srcDoc = `
    <html>
      <style>
        body { color: #0f172a; font-family: sans-serif; padding: 10px; margin: 0; }
      </style>
      <body>
        ${code}
      </body>
    </html>
  `;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden mb-8 shadow-lg flex flex-col">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex justify-between items-center">
        <div className="flex items-center">
          <Code className="text-brand-500 dark:text-brand-400 mr-2 rtl:mr-0 rtl:ml-2" size={20} />
          <h3 className="font-bold text-slate-900 dark:text-white text-sm md:text-base">{item.title}</h3>
        </div>
        <button 
          onClick={() => setShowSolution(!showSolution)}
          className="text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white underline transition-colors"
        >
          {showSolution ? t.practice.hideSolution : t.practice.showSolution}
        </button>
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-300 text-sm border-b border-slate-200 dark:border-slate-800">
        {item.description}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 h-[400px]">
        {/* Editor */}
        <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-700 bg-[#1e1e1e]">
          <div className="bg-slate-950 p-2 text-xs text-slate-500 uppercase font-mono border-b border-slate-800 flex justify-between items-center">
             <span>{t.practice.yourCode} (Monaco Editor)</span>
             {showSolution && <span className="text-yellow-500 animate-pulse">Solution Mode</span>}
          </div>
          
          <div className="flex-grow relative h-full w-full" dir="ltr">
            <Editor
              key={showSolution ? "solution" : "user"} 
              height="100%"
              defaultLanguage={item.language}
              language={item.language}
              value={showSolution ? item.solution : code}
              theme="vs-dark"
              onChange={(value) => !showSolution && setCode(value || '')}
              loading={
                  <div className="flex items-center justify-center h-full text-slate-400">
                      <Loader2 className="animate-spin mr-2" /> Loading Editor...
                  </div>
              }
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                readOnly: showSolution,
                automaticLayout: true,
                padding: { top: 16 },
                fontFamily: "'Fira Code', monospace",
              }}
            />
          </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col bg-white relative border-t border-slate-200 lg:border-t-0">
          <div className="bg-slate-100 p-2 text-xs text-slate-600 uppercase font-bold border-b border-slate-300 flex items-center justify-between">
            <span className="flex items-center">
              <Eye size={12} className="mr-1 rtl:mr-0 rtl:ml-1" />
              {t.practice.preview}
            </span>
            <button 
              onClick={() => {
                setIsRunning(true);
                setTimeout(() => {
                    setPreviewKey(prev => prev + 1);
                    setIsRunning(false);
                }, 400);
              }}
              className="p-1 hover:bg-slate-200 rounded text-slate-700"
              title={t.practice.runCode}
            >
              <Play size={12} fill="currentColor" />
            </button>
          </div>
          
          <div className="relative flex-grow h-full w-full">
            {isRunning && (
                <div className="absolute inset-0 bg-white/90 z-10 flex flex-col items-center justify-center text-slate-500">
                    <Loader2 className="animate-spin text-brand-500 mb-2" size={32} />
                    <span className="text-sm font-medium">Running Code...</span>
                </div>
            )}
            <iframe 
                key={previewKey}
                srcDoc={showSolution ? `<html><style>body{color:#0f172a; font-family:sans-serif;}</style><body>${item.solution}</body></html>` : srcDoc}
                title="preview"
                className="w-full h-full border-none bg-white"
                sandbox="allow-scripts"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const LessonView: React.FC<LessonViewProps> = ({ 
  t, lang, onComplete, completedLessons, courseData
}) => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  
  // Find current module and lesson
  let activeModule: Module | undefined;
  let currentLessonIndex = -1;

  for (const mod of courseData) {
      const idx = mod.lessons.findIndex(l => l.id === lessonId);
      if (idx !== -1) {
          activeModule = mod;
          currentLessonIndex = idx;
          break;
      }
  }

  // Redirect if not found
  if (!activeModule || !lessonId) {
      return <Navigate to="/curriculum" replace />;
  }
  
  const lessonData = getLessonContent(lessonId, lang);
  const isCompleted = completedLessons.includes(lessonId);

  // Logic for Next Lesson
  const nextLessonId = currentLessonIndex < activeModule.lessons.length - 1 
      ? activeModule.lessons[currentLessonIndex + 1].id 
      : null;

  const [completedPracticeItems, setCompletedPracticeItems] = useState<string[]>([]);
  const mainContentRef = useRef<HTMLDivElement>(null); 
  const [justCompleted, setJustCompleted] = useState(false);
  
  // Voting State
  const [lessonScore, setLessonScore] = useState(0);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  useEffect(() => {
      // Load current rating
      if (lessonId) {
        getLessonRating(lessonId).then(data => {
            setLessonScore(data.score);
            setUserVote(data.userVote);
        });
      }
  }, [lessonId]);
  
  const quizzes = lessonData.practice?.filter(p => p.type === 'quiz') || [];
  const allQuizzesCompleted = quizzes.length === 0 || quizzes.every(q => completedPracticeItems.includes(q.id));
  const canMarkComplete = isCompleted || allQuizzesCompleted;

  const handleComplete = () => {
    if (!canMarkComplete) return;
    onComplete(lessonId);
    setJustCompleted(true);
    
    // Trigger confetti if this is the last lesson (no next lesson)
    if (!nextLessonId) {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#0ea5e9', '#a855f7', '#ec4899']
        });
    }
  };

  const handlePracticeSolved = (id: string) => {
    if (!completedPracticeItems.includes(id)) {
      setCompletedPracticeItems(prev => [...prev, id]);
    }
  };

  const handleVote = async (type: 'up' | 'down') => {
      if (!auth.currentUser) return; // Must be logged in
      const userId = auth.currentUser.uid;

      // Optimistic UI Update
      const previousVote = userVote;
      const previousScore = lessonScore;

      // Calculate new visual state immediately
      let newVote: 'up' | 'down' | null = type;
      let scoreChange = 0;

      if (previousVote === type) {
          // Remove vote (Toggle off)
          newVote = null;
          scoreChange = type === 'up' ? -1 : 1;
      } else if (previousVote === null) {
          // New vote
          newVote = type;
          scoreChange = type === 'up' ? 1 : -1;
      } else {
          // Switch vote (e.g. Down -> Up)
          newVote = type;
          scoreChange = type === 'up' ? 2 : -2;
      }

      // Apply local state
      setUserVote(newVote);
      setLessonScore(prev => prev + scoreChange);

      if (newVote === 'down') {
          setShowFeedbackModal(true);
      }

      // Perform actual request
      const success = await voteLesson(lessonId, type, userId);
      
      // Revert if failed (optional safety)
      if (!success) {
          setUserVote(previousVote);
          setLessonScore(previousScore);
      }
  };

  const handleSendFeedback = async (feedbackText: string) => {
      setIsSendingFeedback(true);
      try {
          await saveLessonFeedback(lessonId, feedbackText, auth.currentUser?.email || undefined);
          await sendFeedbackEmail(lessonId, feedbackText, auth.currentUser?.email || undefined);
          setShowFeedbackModal(false);
      } catch (e) {
          console.error("Failed to send feedback", e);
      } finally {
          setIsSendingFeedback(false);
      }
  };

   // --- ROBUST TTS LOGIC START ---

  // 1. Text Splitter - יציב ומסנן תווים בעייתיים
  const splitTextToSentences = (text: string): string[] => {
    if (!text) return [];
    const clean = text
      .replace(/```[\s\S]*?```/g, ' קוד דוגמה. ')
      .replace(/[*_\[\]`]/g, '') 
      .replace(/>/g, '')
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\n+/g, '. ');

    // פיצול לפי סימני פיסוק ושמירה על משפטים הגיוניים
    return clean
      .match(/[^.?!]+[.?!]+["']?|[^.?!]+$/g) || []
      .map(s => s.trim())
      .filter(s => s.length > 2); // סינון רעשים
  };

  // State & Refs
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sentencesRef = useRef<string[]>([]);
  const currentIndexRef = useRef<number>(0);
  const audioCache = useRef<Map<number, string>>(new Map());

  // פונקציה להבאת אודיו (מורידה ושומרת בזיכרון)
  const preFetchAudio = async (index: number) => {
    // אם חורג מהגבולות או כבר קיים במטמון - לא לעשות כלום
    if (index >= sentencesRef.current.length || audioCache.current.has(index)) return;

    try {
      const sentence = sentencesRef.current[index];
      const TTS_SERVER_URL = "https://edge-tts-server-tfx.onrender.com/tts"; // הכתובת שלך

      const response = await fetch(TTS_SERVER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: sentence, lang: lang }),
      });

      if (response.ok) {
        const blob = await response.blob();
        if (blob.size > 100) {
            const url = URL.createObjectURL(blob);
            audioCache.current.set(index, url);
        }
      }
    } catch (e) {
      console.warn(`Failed to pre-fetch sentence ${index}`);
    }
  };

  // פונקציית הניגון הרקורסיבית
  const playSequence = async (index: number) => {
    // תנאי עצירה: אם המשתמש עצר או שנגמרו המשפטים
    if (!audioRef.current || index >= sentencesRef.current.length) {
      stopPlayback();
      return;
    }

    currentIndexRef.current = index;
    setLoadingAudio(true);

    // 1. ניסיון להשיג את ה-URL (מהמטמון או מהרשת)
    let url = audioCache.current.get(index);

    if (!url) {
      // אם אין במטמון, נוריד עכשיו (המשתמש יחכה שניה, זה בסדר)
      await preFetchAudio(index);
      url = audioCache.current.get(index);
    }

    setLoadingAudio(false);

    // אם עדיין אין URL (תקלה בשרת), נדלג לבא
    if (!url) {
      playSequence(index + 1);
      return;
    }

    // 2. ניגון
    if (audioRef.current) {
        audioRef.current.src = url;
        
        // ** הטריק לרצף: **
        // ברגע שהתחלנו לנגן את הנוכחי, נתחיל להוריד את הבא ברקע!
        preFetchAudio(index + 1);

        audioRef.current.play()
          .then(() => {
             // כשהניגון התחיל בהצלחה - נרשום אירוע לסיום
             if(audioRef.current) {
                 audioRef.current.onended = () => {
                     // שחרור זיכרון של המשפט שנגמר (אופציונלי, חוסך RAM)
                     // URL.revokeObjectURL(url); 
                     playSequence(index + 1); // המשיך למשפט הבא
                 };
             }
          })
          .catch(err => {
             console.error("Playback failed:", err);
             playSequence(index + 1); // נסה לדלג במקרה שגיאה
          });
    }
  };

  const stopPlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      // הסרת המאזין כדי שלא יקפוץ לבא בטעות
      audioRef.current.onended = null;
    }
    setIsPlaying(false);
    setLoadingAudio(false);
  };

  const toggleSpeech = async () => {
    if (isPlaying) {
      stopPlayback();
      return;
    }

    // אתחול
    setIsPlaying(true);
    
    // אם זו התחלה חדשה או שהרשימה ריקה
    if (sentencesRef.current.length === 0 || currentIndexRef.current >= sentencesRef.current.length) {
        sentencesRef.current = splitTextToSentences(lessonData.content);
        currentIndexRef.current = 0;
        audioCache.current.clear();
    }

    // יצירת אלמנט אודיו אם לא קיים
    if (!audioRef.current) {
        audioRef.current = new Audio();
    }

    // התחלת השרשרת
    playSequence(currentIndexRef.current);
  };

  // ניקוי ביציאה מהעמוד
  useEffect(() => {
    // איפוס מלא במעבר שיעור
    stopPlayback();
    sentencesRef.current = [];
    audioCache.current.forEach(url => URL.revokeObjectURL(url));
    audioCache.current.clear();
    currentIndexRef.current = 0;

    return () => {
      stopPlayback();
    };
  }, [lessonId]);

  // --- ROBUST TTS LOGIC END ---

  const renderMarkdown = (content: string) => {
    if (!content) return null;
    const parts = content.split(/(```[\s\S]*?```)/g);
    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        const match = part.match(/```(\w*)\n?([\s\S]*?)```/);
        const code = match ? match[2] : part.replace(/```/g, '');
        return (
          <div key={index} className="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono text-sm my-6 overflow-x-auto shadow-inner group relative" dir="ltr">
             <div className="absolute top-2 right-2 flex space-x-1">
               <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
               <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
               <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
             </div>
             <pre className="text-brand-100 pt-2"><code className="language-html">{code.trim()}</code></pre>
          </div>
        );
      } else {
        return (
          <div key={index}>
            {part.split('\n').map((line, i) => {
                const key = `${index}-${i}`;
                if (!line.trim()) return <div key={key} className="h-2"></div>;
                if (line.startsWith('# ')) return <h1 key={key} className="text-3xl md:text-5xl font-extrabold mt-12 mb-6 text-slate-900 dark:text-white pb-4 border-b border-slate-200 dark:border-slate-800 tracking-tight">{line.replace('# ', '')}</h1>;
                if (line.startsWith('## ')) return <h2 key={key} className="text-2xl font-bold mt-10 mb-4 text-brand-600 dark:text-brand-300 flex items-center"><span className="w-2 h-8 bg-brand-500 rounded-full mr-3 rtl:mr-0 rtl:ml-3 inline-block"></span>{line.replace('## ', '')}</h2>;
                if (line.startsWith('### ')) return <h3 key={key} className="text-xl font-bold mt-6 mb-3 text-slate-800 dark:text-white">{line.replace('### ', '')}</h3>;
                if (line.trim().startsWith('> ')) {
                   return (
                     <div key={key} className="my-6 p-4 bg-brand-50 dark:bg-brand-900/10 border-l-4 border-brand-500 rounded-r-lg flex items-start">
                        <Lightbulb className="text-brand-500 dark:text-brand-400 mr-3 rtl:mr-0 rtl:ml-3 shrink-0 mt-1" size={24} />
                        <div className="text-brand-900 dark:text-brand-100 italic">
                             {renderInlineMarkdown(line.replace('> ', ''))}
                        </div>
                     </div>
                   )
                }
                if (line.trim().startsWith('- ')) return <li key={key} className="ml-5 rtl:mr-5 mb-2 list-disc text-slate-600 dark:text-slate-300 pl-2 rtl:pr-2 marker:text-brand-500 text-lg">{renderInlineMarkdown(line.replace(/^- /, ''))}</li>;
                if (line.trim().match(/^\d+\. /)) return <li key={key} className="ml-5 rtl:mr-5 mb-2 list-decimal text-slate-600 dark:text-slate-300 pl-2 rtl:pr-2 marker:text-brand-500 marker:font-bold text-lg">{renderInlineMarkdown(line.replace(/^\d+\. /, ''))}</li>;
                
                return (
                  <p key={key} className="mb-4 text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                    {renderInlineMarkdown(line)}
                  </p>
                );
            })}
          </div>
        );
      }
    });
  };

  return (
    <div className="pt-20 h-screen flex flex-col md:flex-row overflow-hidden bg-slate-50 dark:bg-dark-bg relative transition-colors duration-300">
      
      {/* Feedback Modal */}
      {showFeedbackModal && (
          <RatingFeedbackModal 
            t={t}
            isSending={isSendingFeedback}
            onClose={() => setShowFeedbackModal(false)}
            onSubmit={handleSendFeedback}
          />
      )}

      {/* Centered Content */}
      <div 
        ref={mainContentRef}
        className="h-full w-full overflow-y-auto p-6 md:p-12 custom-scrollbar transition-all duration-300 mx-auto max-w-5xl"
      >
        <div className="flex justify-between items-center mb-8">
            <button 
                onClick={() => navigate(`/course/${activeModule?.id}`)}
                className="flex items-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group"
            >
                <ArrowLeft size={20} className="mr-2 rtl:ml-2 rtl:mr-0 rtl:rotate-180 group-hover:-translate-x-1 transition-transform" />
                {t.lesson.backToCurriculum}
            </button>

            <button
                onClick={toggleSpeech}
                disabled={loadingAudio && !isPlaying}
                className={`flex items-center px-4 py-2 rounded-full font-medium transition-all duration-300 ${isPlaying ? 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm border border-slate-200 dark:border-slate-700'}`}
            >
                {loadingAudio && !isPlaying ? (
                    <>
                        <Loader2 className="animate-spin mr-2 rtl:ml-2 rtl:mr-0" size={18} />
                        Loading Audio...
                    </>
                ) : isPlaying ? (
                    <>
                        <Square size={16} fill="currentColor" className="mr-2 rtl:ml-2 rtl:mr-0 animate-pulse" />
                        {t.lesson.stopReading}
                        <span className="flex space-x-1 rtl:space-x-reverse ml-3 rtl:ml-0 rtl:mr-3 items-end h-4">
                             <span className="w-1 bg-red-400 animate-[bounce_1s_infinite] h-2"></span>
                             <span className="w-1 bg-red-400 animate-[bounce_1.2s_infinite] h-4"></span>
                             <span className="w-1 bg-red-400 animate-[bounce_0.8s_infinite] h-3"></span>
                        </span>
                    </>
                ) : (
                    <>
                        <Volume2 size={18} className="mr-2 rtl:ml-2 rtl:mr-0" />
                        {t.lesson.readAloud}
                    </>
                )}
            </button>
        </div>

        <div className="mb-4 text-brand-600 dark:text-brand-400 text-sm font-bold uppercase tracking-wider flex items-center">
             <span className="w-2 h-2 bg-brand-500 rounded-full mr-2 rtl:mr-0 rtl:ml-2 animate-pulse"></span>
            {t.curriculum.modules[activeModule.titleKey]}
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-10 tracking-tight leading-tight">
            {lessonData.title}
        </h1>

        <div className="prose prose-slate dark:prose-invert prose-lg max-w-none">
            {renderMarkdown(lessonData.content)}
        </div>

        {/* Practice Zone */}
        {lessonData.practice && lessonData.practice.length > 0 && (
          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
                <Code className="text-brand-500 mr-2 rtl:mr-0 rtl:ml-2" />
                {t.practice.title}
              </h2>
            </div>
            
            <div className="space-y-6">
              {lessonData.practice.map((item, index) => (
                <div key={item.id}>
                  {item.type === 'quiz' ? (
                    <QuizComponent item={item as QuizPractice} t={t} onSolved={handlePracticeSolved} />
                  ) : (
                    <CodePlayground 
                        item={item as CodePractice} 
                        t={t} 
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Bar (Complete & Next) */}
        <div className="mt-12 mb-10 flex flex-col sm:flex-row items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-10 gap-6">
            <div className="flex items-center">
              {isCompleted ? (
                <div className="flex items-center text-green-600 dark:text-green-400 font-medium bg-green-100 dark:bg-green-900/20 px-4 py-2 rounded-full border border-green-500/20">
                   <CheckCircle size={20} className="mr-2 rtl:ml-2 rtl:mr-0" />
                   {t.lesson.completed}
                </div>
              ) : (
                 <span className={`italic flex items-center ${canMarkComplete ? 'text-slate-500 dark:text-slate-500' : 'text-amber-600/80 dark:text-amber-500/80'}`}>
                    <span className={`w-2 h-2 rounded-full mr-2 rtl:mr-0 rtl:ml-2 ${canMarkComplete ? 'bg-slate-400 dark:bg-slate-600' : 'bg-amber-500'}`}></span>
                    {canMarkComplete ? t.lesson.markComplete : t.lesson.requirementsNotMet}
                 </span>
              )}
            </div>

            <div className="flex space-x-4 rtl:space-x-reverse w-full sm:w-auto">
              {!isCompleted ? (
                <button 
                    onClick={handleComplete}
                    disabled={!canMarkComplete}
                    className={`
                        flex-1 sm:flex-none flex items-center justify-center px-8 py-3 rounded-full font-bold transition-all shadow-lg
                        ${canMarkComplete 
                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-105 cursor-pointer shadow-slate-500/20' 
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-50'}
                    `}
                >
                    <CheckCircle size={20} className="mr-2 rtl:ml-2 rtl:mr-0" />
                    {t.lesson.markCompleteAction}
                </button>
              ) : (
                 nextLessonId ? (
                   <button 
                      onClick={() => navigate(`/lesson/${nextLessonId}`)}
                      className="flex-1 sm:flex-none flex items-center justify-center px-8 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-full font-bold transition-all hover:scale-105 shadow-lg shadow-brand-500/20"
                   >
                      {t.lesson.nextLesson}
                      <ArrowRight size={20} className="ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180" />
                   </button>
                 ) : (
                   <button 
                      onClick={() => navigate(`/challenge/${activeModule?.id}`)}
                      className="flex-1 sm:flex-none flex items-center justify-center px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 text-white rounded-full font-bold transition-all hover:scale-105 shadow-lg shadow-yellow-500/30 animate-pulse"
                   >
                      <Trophy size={20} className="mr-2 rtl:ml-2 rtl:mr-0" />
                      {t.lesson.finalChallenge}
                   </button>
                 )
              )}
            </div>
        </div>

        {/* Voting Section (Redesigned) */}
        <div className="mb-20 bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center border border-slate-200 dark:border-slate-700/50">
             <h3 className="text-slate-500 dark:text-slate-400 font-medium mb-4">{t.lesson.voteTitle}</h3>
             
             <div className="flex items-center gap-6 bg-white dark:bg-slate-900 p-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
                 {/* Like Button */}
                 <button 
                    onClick={() => handleVote('up')}
                    className={`
                        p-3 rounded-full transition-all duration-300 hover:bg-green-50 dark:hover:bg-green-900/20
                        ${userVote === 'up' 
                            ? 'text-green-500 bg-green-50 dark:bg-green-900/20 scale-110' 
                            : 'text-slate-400 dark:text-slate-500 hover:text-green-500'}
                    `}
                    title="Helpful"
                 >
                     <ThumbsUp size={24} className={userVote === 'up' ? 'fill-current' : ''} />
                 </button>

                 {/* Score in Middle */}
                 <div className="min-w-[40px] text-center font-bold text-xl text-slate-700 dark:text-slate-200">
                    {lessonScore > 0 ? `+${lessonScore}` : lessonScore}
                 </div>

                 {/* Dislike Button */}
                 <button 
                    onClick={() => handleVote('down')}
                    className={`
                        p-3 rounded-full transition-all duration-300 hover:bg-red-50 dark:hover:bg-red-900/20
                        ${userVote === 'down' 
                            ? 'text-red-500 bg-red-50 dark:bg-red-900/20 scale-110' 
                            : 'text-slate-400 dark:text-slate-500 hover:text-red-500'}
                    `}
                    title="Not Helpful"
                 >
                     <ThumbsDown size={24} className={userVote === 'down' ? 'fill-current' : ''} />
                 </button>
             </div>
        </div>

      </div>
    </div>
  );
};

export default LessonView;
