import React from 'react';
import { TranslationStructure, ViewState } from '../types';
import { Code2, Cpu, Zap, Heart, ArrowRight, Lightbulb } from 'lucide-react';

interface AboutProps {
  t: TranslationStructure;
  setView: (v: ViewState) => void;
}

const About: React.FC<AboutProps> = ({ t, setView }) => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header Section */}
      <div className="text-center mb-20 animate-fade-in-up">
        <div className="inline-flex items-center justify-center p-3 bg-brand-100 dark:bg-brand-900/30 rounded-full text-brand-600 dark:text-brand-400 mb-6">
           <Heart size={24} className="animate-pulse" />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
          {t.about.title}
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
          {t.about.subtitle}
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-24">
        {/* Feature 1 */}
        <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-8 rounded-2xl hover:border-brand-500 hover:shadow-lg transition-all duration-300 group">
          <div className="bg-brand-100 dark:bg-brand-900/50 p-4 rounded-xl w-fit mb-6 text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform">
            <Code2 size={32} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t.about.features.interactiveTitle}</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.about.features.interactiveDesc}
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-8 rounded-2xl hover:border-purple-500 hover:shadow-lg transition-all duration-300 group">
          <div className="bg-purple-100 dark:bg-purple-900/50 p-4 rounded-xl w-fit mb-6 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
            <Cpu size={32} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t.about.features.aiTitle}</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.about.features.aiDesc}
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-8 rounded-2xl hover:border-yellow-500 hover:shadow-lg transition-all duration-300 group">
          <div className="bg-yellow-100 dark:bg-yellow-900/50 p-4 rounded-xl w-fit mb-6 text-yellow-600 dark:text-yellow-400 group-hover:scale-110 transition-transform">
            <Zap size={32} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t.about.features.practicalTitle}</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.about.features.practicalDesc}
          </p>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="bg-gradient-to-br from-brand-50 to-purple-50 dark:from-brand-900/20 dark:to-purple-900/20 rounded-3xl p-8 md:p-16 border border-slate-200 dark:border-slate-800 relative overflow-hidden mb-20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-200 dark:bg-brand-500/10 rounded-full blur-3xl -mr-32 -mt-32 opacity-50 dark:opacity-100"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-200 dark:bg-purple-500/10 rounded-full blur-3xl -ml-32 -mb-32 opacity-50 dark:opacity-100"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
           <div className="flex-1">
             <div className="flex items-center mb-6 text-brand-600 dark:text-brand-300 font-bold uppercase tracking-widest text-sm">
                <Lightbulb size={18} className="mr-2 rtl:mr-0 rtl:ml-2" />
                CodeFix Vision
             </div>
             <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
               {t.about.philosophyTitle}
             </h2>
             <p className="text-lg text-slate-700 dark:text-slate-300 leading-loose">
               {t.about.philosophyContent}
             </p>
           </div>
           <div className="flex-1 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-500 blur-2xl opacity-20 animate-pulse"></div>
                <Code2 size={200} className="relative text-slate-900/10 dark:text-white/10 rotate-12" />
              </div>
           </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <button 
            onClick={() => setView('curriculum')}
            className="group px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold text-lg hover:bg-slate-800 dark:hover:bg-brand-50 transition-all hover:scale-105 shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
        >
            <span className="flex items-center">
                {t.about.cta}
                <ArrowRight className="ml-2 rtl:ml-0 rtl:mr-2 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </span>
        </button>
      </div>

    </div>
  );
};

export default About;