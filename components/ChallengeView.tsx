import React, { useState } from 'react';
import { TranslationStructure, Challenge } from '../types';
import { ArrowLeft, CheckCircle, Loader2, Play, Trophy, XCircle, Info } from 'lucide-react';
import Editor from "@monaco-editor/react";
import confetti from 'canvas-confetti';

interface ChallengeViewProps {
  t: TranslationStructure;
  challenge: Challenge;
  onBack: () => void;
  onComplete: () => void;
}

const ChallengeView: React.FC<ChallengeViewProps> = ({ t, challenge, onBack, onComplete }) => {
  const [code, setCode] = useState(challenge.initialCode);
  const [previewKey, setPreviewKey] = useState(0);
  const [status, setStatus] = useState<'idle' | 'success' | 'failure'>('idle');

  const handleRunTests = () => {
    // Refresh preview
    setPreviewKey(prev => prev + 1);

    // Validate
    const isValid = challenge.validation(code);
    
    if (isValid) {
        setStatus('success');
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            zIndex: 100
        });
        setTimeout(() => {
             confetti({ particleCount: 100, spread: 120, origin: { y: 0.6 }, zIndex: 100 });
        }, 500);
    } else {
        setStatus('failure');
    }
  };

  const srcDoc = `
    <html>
      <style>
        body { color: #0f172a; font-family: sans-serif; padding: 20px; margin: 0; }
      </style>
      <body>
        ${code}
      </body>
    </html>
  `;

  return (
    <div className="pt-16 h-screen flex flex-col bg-slate-100 dark:bg-[#0b1120] animate-fade-in-up">
      
      {/* Header - Compact & Full Width */}
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm z-10 shrink-0">
         <div className="flex flex-col gap-3">
             {/* Title Row */}
             <div className="flex items-center gap-3">
                 <button onClick={onBack} className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                     <ArrowLeft size={18} className="rtl:rotate-180" />
                 </button>
                 <h1 className="text-xl font-bold flex items-center text-slate-900 dark:text-white">
                     <Trophy className="text-yellow-500 mr-2 rtl:mr-0 rtl:ml-2" size={20} />
                     {challenge.title}
                 </h1>
             </div>

             {/* Instructions Box with Button Inside */}
             <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-900/30 flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="flex items-start gap-3 flex-1">
                    <Info size={18} className="text-blue-600 dark:text-blue-400 shrink-0 mt-1" />
                    <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                        {challenge.description}
                    </p>
                </div>
                
                {/* Button - Positioned at the end (left in RTL) */}
                <button 
                    onClick={handleRunTests}
                    className="shrink-0 px-6 py-2 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white rounded-lg font-bold shadow-md hover:scale-105 transition-all flex items-center whitespace-nowrap self-end md:self-start"
                >
                    <Play size={18} fill="currentColor" className="mr-2 rtl:mr-0 rtl:ml-2" />
                    {t.challenge.runTests}
                </button>
             </div>
         </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col md:flex-row overflow-hidden p-4 gap-4">
          
          {/* Editor Container */}
          <div className="w-full md:w-1/2 flex flex-col rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700 shadow-xl">
             <div className="bg-[#1e1e1e] border-b border-white/10 p-2 px-3 flex justify-between items-center shrink-0">
                 <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                 </div>
                 <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                     index.html
                 </div>
                 <div className="w-10"></div>
             </div>
             <div className="flex-grow relative bg-[#1e1e1e]" dir="ltr">
                <Editor
                    height="100%"
                    defaultLanguage={challenge.language}
                    language={challenge.language}
                    value={code}
                    theme="vs-dark"
                    onChange={(value) => setCode(value || '')}
                    loading={<Loader2 className="animate-spin text-white m-auto" />}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 15,
                        lineNumbers: 'on',
                        automaticLayout: true,
                        padding: { top: 16 },
                        fontFamily: "'Fira Code', monospace",
                        scrollBeyondLastLine: false,
                    }}
                />
             </div>
          </div>

          {/* Preview Container */}
          <div className="w-full md:w-1/2 flex flex-col rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700 shadow-xl bg-white dark:bg-slate-900">
             <div className="bg-slate-100 dark:bg-slate-800 p-2 text-xs text-slate-600 dark:text-slate-400 uppercase font-bold border-b border-slate-200 dark:border-slate-700 flex justify-center items-center shrink-0">
                 {t.practice.preview}
             </div>
             <div className="flex-grow relative bg-white">
                <iframe 
                    key={previewKey}
                    srcDoc={srcDoc}
                    title="challenge-preview"
                    className="w-full h-full border-none"
                    sandbox="allow-scripts"
                />
             </div>
             
             {/* Status Bar */}
             <div className={`
                 p-3 border-t border-slate-200 dark:border-slate-800 transition-all duration-300 shrink-0
                 ${status === 'success' ? 'bg-green-50 dark:bg-green-900/20' : ''}
                 ${status === 'failure' ? 'bg-red-50 dark:bg-red-900/20' : 'bg-slate-50 dark:bg-slate-900'}
             `}>
                 {status === 'idle' && (
                     <p className="text-slate-500 dark:text-slate-400 text-sm text-center italic">{t.challenge.task}</p>
                 )}
                 {status === 'success' && (
                     <div className="flex items-center justify-between animate-fade-in-up px-2">
                         <div className="flex items-center text-green-700 dark:text-green-400 font-bold text-lg">
                             <CheckCircle className="mr-2" size={20} /> {t.challenge.success}
                         </div>
                         <button onClick={onComplete} className="px-4 py-1.5 bg-green-600 text-white rounded-lg font-bold shadow-md hover:scale-105 transition-transform text-sm">
                             {t.challenge.backToModule}
                         </button>
                     </div>
                 )}
                 {status === 'failure' && (
                     <div className="flex items-center justify-center text-red-700 dark:text-red-400 font-bold text-sm md:text-base animate-shake">
                         <XCircle className="mr-2" size={20} /> {t.challenge.failure}
                     </div>
                 )}
             </div>
          </div>
      </div>
    </div>
  );
};

export default ChallengeView;