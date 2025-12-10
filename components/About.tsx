
import React from 'react';
import { TranslationStructure } from '../types';
import { Code2, Zap, Heart, ArrowRight, Lightbulb, FileCode, Palette, Terminal, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AboutProps {
  t: TranslationStructure;
}

const About: React.FC<AboutProps> = ({ t }) => {
  const navigate = useNavigate();

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

      {/* Features Grid - Philosophy */}
      <div className="grid md:grid-cols-2 gap-8 mb-24 max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-8 rounded-2xl hover:border-brand-500 hover:shadow-lg transition-all duration-300 group">
          <div className="bg-brand-100 dark:bg-brand-900/50 p-4 rounded-xl w-fit mb-6 text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform">
            <Code2 size={32} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t.about.features.interactiveTitle}</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.about.features.interactiveDesc}
          </p>
        </div>

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

      {/* What You Learn Section */}
      <div className="mb-24 animate-fade-in-up">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">{t.about.topicsTitle}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 p-6 rounded-2xl hover:bg-orange-100 dark:hover:bg-orange-900/20 transition-all">
                <FileCode size={40} className="text-orange-500 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.about.topics.htmlTitle}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{t.about.topics.htmlDesc}</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 p-6 rounded-2xl hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-all">
                <Palette size={40} className="text-blue-500 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.about.topics.cssTitle}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{t.about.topics.cssDesc}</p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/30 p-6 rounded-2xl hover:bg-yellow-100 dark:hover:bg-yellow-900/20 transition-all">
                <Terminal size={40} className="text-yellow-500 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.about.topics.jsTitle}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{t.about.topics.jsDesc}</p>
            </div>
            <div className="bg-cyan-50 dark:bg-cyan-900/10 border border-cyan-100 dark:border-cyan-900/30 p-6 rounded-2xl hover:bg-cyan-100 dark:hover:bg-cyan-900/20 transition-all">
                <Cpu size={40} className="text-cyan-500 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.about.topics.reactTitle}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{t.about.topics.reactDesc}</p>
            </div>
        </div>
      </div>

      {/* Methodology Section */}
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
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              navigate('/curriculum');
            }}
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
