import React, { useState, useEffect, useRef } from 'react';
import { TranslationStructure, Language, PracticeItem, QuizPractice, CodePractice } from '../types';
import { ArrowLeft, CheckCircle, Send, Bot, RefreshCw, ArrowRight, Play, Eye, Code, HelpCircle, X, MessageCircle, Loader2, Lightbulb, PlayCircle, Volume2, Square, Trophy } from 'lucide-react';
import { askAiTutor, generateLessonAudio } from '../services/geminiService';
import { getLessonContent } from '../data';
import Editor from "@monaco-editor/react";
import confetti from 'canvas-confetti';

interface LessonViewProps {
  t: TranslationStructure;
  lessonId: string;
  moduleTitle: string;
  onBack: () => void;
  lang: Language;
  onComplete: () => void;
  isCompleted: boolean;
  nextLessonId: string | null;
  onNextLesson: (id: string) => void;
  onStartChallenge: () => void;
}

// Helper: Decode base64 string to byte array
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Helper: Decode audio data for AudioContext
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  // Try using native decode first if possible (some browsers might support it for raw PCM if framed correctly, 
  // but Gemini sends raw PCM usually. The instruction suggests manual decoding or native if header exists. 
  // Since we get raw PCM usually from Live API but TTS might return WAV container in some versions, 
  // let's try strict PCM decoding logic as per Gemini docs if native fails, or use standard context decode.)
  
  // Actually, for the TTS endpoint, it often returns a container format or raw. 
  // Let's implement the standard Web Audio decode which handles most headers automatically.
  // If it fails, we fall back to raw PCM assumption.
  try {
     return await ctx.decodeAudioData(data.buffer.slice(0));
  } catch (e) {
      // Fallback manual PCM decoding if raw float32/int16 is sent without header
      // Assuming 24kHz usually for Gemini
      const dataInt16 = new Int16Array(data.buffer);
      const frameCount = dataInt16.length / numChannels;
      const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

      for (let channel = 0; channel < numChannels; channel++) {
        const channelData = buffer.getChannelData(channel);
        for (let i = 0; i < frameCount; i++) {
          channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
        }
      }
      return buffer;
  }
}

const cleanMarkdownForSpeech = (markdown: string): string => {
  return markdown
    .replace(/```[\s\S]*?```/g, 'Code example.')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/#{1,6}\s?/g, '')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/>\s?/g, '')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, 'Image: $1')
    .replace(/^(\s*-\s|\s*\d+\.\s)/gm, '')
    .replace(/\n+/g, '. ');
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
            <span>{option}</span>
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
            <p className="text-sm opacity-90">{item.explanation}</p>
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
  t, lessonId, moduleTitle, onBack, lang, onComplete, isCompleted, nextLessonId, onNextLesson, onStartChallenge
}) => {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [isAiVisible, setIsAiVisible] = useState(true);
  const [completedPracticeItems, setCompletedPracticeItems] = useState<string[]>([]);
  
  // Audio State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null); 
  const mainContentRef = useRef<HTMLDivElement>(null); 
  const [justCompleted, setJustCompleted] = useState(false);

  const lessonData = getLessonContent(lessonId, lang);
  
  const quizzes = lessonData.practice?.filter(p => p.type === 'quiz') || [];
  const allQuizzesCompleted = quizzes.length === 0 || quizzes.every(q => completedPracticeItems.includes(q.id));
  const canMarkComplete = isCompleted || allQuizzesCompleted;

  const handleAskAi = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoadingAi(true);

    const answer = await askAiTutor(userMsg, lessonData.content, lang);
    
    setChatHistory(prev => [...prev, { role: 'ai', text: answer }]);
    setIsLoadingAi(false);
  };

  const handleComplete = () => {
    if (!canMarkComplete) return;
    onComplete();
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

  const stopAudio = () => {
      if (audioSourceRef.current) {
          try {
              audioSourceRef.current.stop();
          } catch (e) { /* ignore if already stopped */ }
          audioSourceRef.current = null;
      }
      setIsSpeaking(false);
  };

  const toggleSpeech = async () => {
    if (isSpeaking) {
      stopAudio();
    } else {
      setIsLoadingAudio(true);
      const textToRead = cleanMarkdownForSpeech(lessonData.content);
      
      const base64Audio = await generateLessonAudio(textToRead, lang);
      
      if (!base64Audio) {
          setIsLoadingAudio(false);
          alert("Could not generate audio at this time.");
          return;
      }

      try {
          if (!audioContextRef.current) {
              audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
          }
          const ctx = audioContextRef.current;
          
          // Decode audio
          const audioBytes = decode(base64Audio);
          const audioBuffer = await decodeAudioData(audioBytes, ctx, 24000, 1);
          
          // Play audio
          const source = ctx.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(ctx.destination);
          
          source.onended = () => {
              setIsSpeaking(false);
              audioSourceRef.current = null;
          };

          source.start(0);
          audioSourceRef.current = source;
          setIsSpeaking(true);

      } catch (error) {
          console.error("Audio Playback Error", error);
          alert("Error playing audio.");
      } finally {
          setIsLoadingAudio(false);
      }
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isAiVisible]);

  useEffect(() => {
    setJustCompleted(false);
    setChatHistory([]); 
    setInput('');
    setCompletedPracticeItems([]); 
    
    stopAudio();

    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
    
    return () => {
       stopAudio();
       if (audioContextRef.current) {
           audioContextRef.current.close();
           audioContextRef.current = null;
       }
    };
  }, [lessonId]);

  const renderMarkdown = (content: string) => {
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

  const renderInlineMarkdown = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((p, pi) => {
        if (p.startsWith('**') && p.endsWith('**')) return <strong key={pi} className="text-slate-900 dark:text-white font-semibold">{p.slice(2, -2)}</strong>;
        if (p.startsWith('`') && p.endsWith('`')) return <code key={pi} className="bg-slate-200 dark:bg-slate-800/80 px-1.5 py-0.5 rounded-md text-brand-700 dark:text-brand-300 font-mono text-sm border border-slate-300 dark:border-slate-700/50 mx-1 shadow-sm" dir="ltr">{p.slice(1, -1)}</code>;
        return p;
    });
  };

  return (
    <div className="pt-20 h-screen flex flex-col md:flex-row overflow-hidden bg-slate-50 dark:bg-dark-bg relative transition-colors duration-300">
      
      {/* Left Panel: Content */}
      <div 
        ref={mainContentRef}
        className={`h-full overflow-y-auto p-6 md:p-12 border-r border-slate-200 dark:border-slate-800 custom-scrollbar transition-all duration-300 ${isAiVisible ? 'w-full md:w-2/3' : 'w-full'}`}
      >
        <div className="flex justify-between items-center mb-8">
            <button 
                onClick={onBack}
                className="flex items-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group"
            >
                <ArrowLeft size={20} className="mr-2 rtl:ml-2 rtl:mr-0 rtl:rotate-180 group-hover:-translate-x-1 transition-transform" />
                {t.lesson.backToCurriculum}
            </button>

            <button
                onClick={toggleSpeech}
                disabled={isLoadingAudio}
                className={`flex items-center px-4 py-2 rounded-full font-medium transition-all duration-300 ${isSpeaking ? 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm border border-slate-200 dark:border-slate-700'}`}
            >
                {isLoadingAudio ? (
                    <>
                        <Loader2 size={18} className="mr-2 rtl:ml-2 rtl:mr-0 animate-spin" />
                        Generating Audio...
                    </>
                ) : isSpeaking ? (
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
            {moduleTitle}
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

        <div className="mt-12 mb-20 flex flex-col sm:flex-row items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-10 gap-6">
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
                      onClick={() => onNextLesson(nextLessonId)}
                      className="flex-1 sm:flex-none flex items-center justify-center px-8 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-full font-bold transition-all hover:scale-105 shadow-lg shadow-brand-500/20"
                   >
                      {t.lesson.nextLesson}
                      <ArrowRight size={20} className="ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180" />
                   </button>
                 ) : (
                   <button 
                      onClick={onStartChallenge}
                      className="flex-1 sm:flex-none flex items-center justify-center px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 text-white rounded-full font-bold transition-all hover:scale-105 shadow-lg shadow-yellow-500/30 animate-pulse"
                   >
                      <Trophy size={20} className="mr-2 rtl:ml-2 rtl:mr-0" />
                      {t.lesson.finalChallenge}
                   </button>
                 )
              )}
            </div>
        </div>
      </div>

      {/* Floating Button to Open AI */}
      {!isAiVisible && (
        <button 
          onClick={() => setIsAiVisible(true)}
          className="absolute bottom-6 right-6 rtl:right-auto rtl:left-6 z-20 bg-brand-600 hover:bg-brand-500 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 flex items-center"
          title={t.lesson.openAi}
        >
          <Bot size={24} />
          <span className="ml-2 rtl:ml-0 rtl:mr-2 font-bold hidden md:inline">{t.lesson.openAi}</span>
        </button>
      )}

      {/* Right Panel: AI Tutor */}
      {isAiVisible && (
          <div className="w-full md:w-1/3 h-[40vh] md:h-full bg-white dark:bg-slate-900 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 flex flex-col shadow-2xl z-10 transition-all duration-300">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between backdrop-blur-md">
                <div className="flex items-center">
                    <div className="p-2 bg-gradient-to-tr from-brand-500 to-purple-600 rounded-lg text-white mr-3 rtl:mr-0 rtl:ml-3 shadow-lg">
                        <Bot size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">{t.lesson.aiTutorTitle}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 rtl:mr-0 rtl:ml-1.5 animate-pulse"></span>
                        Online
                        </p>
                    </div>
                </div>
                <button 
                    onClick={() => setIsAiVisible(false)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                {chatHistory.length === 0 && (
                    <div className="text-center text-slate-500 dark:text-slate-500 mt-10 p-6">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200 dark:border-slate-700">
                        <Bot size={32} className="opacity-50" />
                        </div>
                        <p className="text-sm">{t.lesson.aiTutorPlaceholder}</p>
                    </div>
                )}
                {chatHistory.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                        <div className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-md leading-relaxed ${
                            msg.role === 'user' 
                            ? 'bg-brand-600 text-white rounded-br-none rtl:rounded-bl-none rtl:rounded-br-2xl' 
                            : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none rtl:rounded-br-none rtl:rounded-bl-2xl'
                        }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isLoadingAi && (
                    <div className="flex justify-start">
                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 flex items-center space-x-2">
                            <RefreshCw size={16} className="animate-spin text-brand-400" />
                            <span className="text-xs text-slate-500 dark:text-slate-400">{t.lesson.loading}</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAskAi()}
                        placeholder={t.lesson.aiTutorPlaceholder}
                        className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500/50 border border-slate-200 dark:border-slate-700 placeholder-slate-400 dark:placeholder-slate-500 rtl:pr-4 rtl:pl-12 transition-all"
                    />
                    <button 
                        onClick={handleAskAi}
                        disabled={isLoadingAi || !input.trim()}
                        className="absolute right-2 top-2 rtl:right-auto rtl:left-2 p-1.5 bg-brand-600 rounded-lg text-white hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-brand-500/20"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
          </div>
      )}

    </div>
  );
};

export default LessonView;