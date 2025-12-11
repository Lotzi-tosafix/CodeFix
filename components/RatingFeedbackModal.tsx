
import React, { useState } from 'react';
import { X, MessageSquare, Send } from 'lucide-react';
import { TranslationStructure } from '../types';

interface RatingFeedbackModalProps {
  t: TranslationStructure;
  onClose: () => void;
  onSubmit: (feedback: string) => void;
  isSending: boolean;
}

const RatingFeedbackModal: React.FC<RatingFeedbackModalProps> = ({ t, onClose, onSubmit, isSending }) => {
  const [feedback, setFeedback] = useState("");

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 w-full max-w-md rounded-2xl shadow-2xl p-6 animate-fade-in-up">
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
            <X size={20} />
        </button>

        <div className="text-center mb-6">
            <div className="bg-red-100 dark:bg-red-900/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-red-500">
                <MessageSquare size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {t.lesson.feedbackTitle}
            </h2>
        </div>

        <textarea 
            className="w-full h-32 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none resize-none mb-4 text-slate-900 dark:text-white placeholder-slate-400"
            placeholder={t.lesson.feedbackPlaceholder}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
        />

        <div className="flex gap-3">
            <button 
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
                {t.lesson.feedbackCancel}
            </button>
            <button 
                onClick={() => onSubmit(feedback)}
                disabled={!feedback.trim() || isSending}
                className="flex-1 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSending ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                    <>
                        {t.lesson.feedbackSend}
                        <Send size={16} className="ml-2 rtl:mr-2 rtl:ml-0" />
                    </>
                )}
            </button>
        </div>
      </div>
    </div>
  );
};

export default RatingFeedbackModal;
