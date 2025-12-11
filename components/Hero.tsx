
import React, { useEffect, useState } from 'react';
import { ArrowRight, Code, Users, ThumbsUp } from 'lucide-react';
import { TranslationStructure, Language, Module } from '../types';
import { useNavigate } from 'react-router-dom';
import { getGlobalStats, GlobalStats } from '../services/firebase';

interface HeroProps {
  t: TranslationStructure;
  lang: Language;
  courseData: Module[];
}

const Hero: React.FC<HeroProps> = ({ t, lang, courseData }) => {
  const isRTL = lang === 'he';
  const navigate = useNavigate();
  const [stats, setStats] = useState<GlobalStats>({ totalScore: 0, totalStudents: 0 });

  useEffect(() => {
      const fetchStats = async () => {
          const data = await getGlobalStats();
          setStats(data);
      };
      fetchStats();
  }, []);

  const formatScore = (num: number) => {
      if (num >= 1000) {
          return (num / 1000).toFixed(1) + 'k';
      }
      return num;
  };

  const totalLessons = courseData.reduce((acc, curr) => acc + curr.lessons.length, 0);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      
      {/* Background Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-brand-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
          {t.hero.titlePrefix} <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-600 dark:from-brand-400 dark:to-purple-500">
            {t.hero.titleHighlight}
          </span>
        </h1>

        <p className="mt-4 max-w-2xl text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
          {t.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button 
            onClick={() => navigate('/curriculum')}
            className="group relative px-8 py-4 bg-brand-600 rounded-full text-white font-bold text-lg shadow-lg shadow-brand-500/30 hover:bg-brand-500 transition-all transform hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></div>
            <span className="flex items-center justify-center">
              {t.hero.ctaPrimary}
              {isRTL ? <ArrowRight className="mr-2 rotate-180" /> : <ArrowRight className="ml-2" />}
            </span>
          </button>
          
          <button 
            onClick={() => navigate('/about')}
            className="px-8 py-4 bg-white dark:bg-slate-800 rounded-full text-slate-700 dark:text-slate-200 font-bold text-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all hover:-translate-y-1"
          >
            {t.hero.ctaSecondary}
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-4xl border-t border-slate-200 dark:border-slate-800 pt-8">
          <div className="flex flex-col items-center">
            <div className="p-3 bg-brand-100 dark:bg-brand-900/30 rounded-full mb-3 text-brand-600 dark:text-brand-400">
              <Users size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">+{formatScore(stats.totalStudents)}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">{t.hero.stats_students}</p>
          </div>
          <div className="flex flex-col items-center">
             <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-3 text-purple-600 dark:text-purple-400">
              <Code size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{totalLessons}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">{t.hero.stats_lessons}</p>
          </div>
          <div className="flex flex-col items-center">
             <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mb-3 text-yellow-600 dark:text-yellow-400">
              <ThumbsUp size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">+{formatScore(stats.totalScore)}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">{t.hero.stats_rating}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
