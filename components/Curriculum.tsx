import React from 'react';
import { Module, TranslationStructure, User } from '../types';
import { Lock, ArrowRight, Globe, Palette, FileCode, Database, Cpu, Unlock } from 'lucide-react';

interface CurriculumProps {
  t: TranslationStructure;
  onSelectModule: (module: Module) => void;
  completedLessons: string[];
  courseData: Module[];
  user: User | null;
}

const Curriculum: React.FC<CurriculumProps> = ({ t, onSelectModule, completedLessons, courseData, user }) => {
  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'globe': return <Globe size={28} />;
      case 'palette': return <Palette size={28} />;
      case 'code': return <FileCode size={28} />;
      case 'database': return <Database size={28} />;
      case 'cpu': return <Cpu size={28} />;
      default: return <Globe size={28} />;
    }
  };

  const isAdmin = user?.isAdmin || false;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16 animate-fade-in-up">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">{t.curriculum.title}</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">{t.curriculum.subtitle}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {courseData.map((mod, index) => {
          const totalLessons = mod.lessons.length;
          const completedCount = mod.lessons.filter(l => completedLessons.includes(l.id)).length;
          const progressPercent = totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);
          const isStarted = completedCount > 0;
          
          // Override lock if admin
          const isLocked = mod.locked && !isAdmin;

          return (
            <div 
              key={mod.id} 
              onClick={() => !isLocked && onSelectModule(mod)}
              style={{ animationDelay: `${index * 100}ms` }}
              className={`
                relative group rounded-2xl p-8 border transition-all duration-300 flex flex-col h-full animate-fade-in-up
                ${isLocked 
                  ? 'bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800 opacity-60 cursor-not-allowed' 
                  : 'bg-white dark:bg-dark-card border-slate-200 dark:border-slate-700 hover:border-brand-500 hover:shadow-[0_10px_40px_-10px_rgba(14,165,233,0.1)] dark:hover:shadow-[0_10px_40px_-10px_rgba(14,165,233,0.2)] hover:-translate-y-2 cursor-pointer'}
              `}
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`
                  p-4 rounded-xl shadow-lg
                  ${isLocked 
                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-500' 
                    : 'bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 text-brand-600 dark:text-brand-400 group-hover:from-brand-500 group-hover:to-brand-700 group-hover:text-white group-hover:border-brand-400 transition-all duration-300'}
                `}>
                  {getIcon(mod.icon)}
                </div>
                <div className="flex flex-col items-end gap-1">
                    <span className={`
                    text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full border
                    ${mod.levelKey === 'beginner' ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-900/50' : ''}
                    ${mod.levelKey === 'intermediate' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-900/50' : ''}
                    ${mod.levelKey === 'advanced' ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/50' : ''}
                    `}>
                    {t.curriculum.levels[mod.levelKey]}
                    </span>
                    {isAdmin && mod.locked && (
                         <span className="text-[10px] font-bold uppercase tracking-wider text-brand-500 dark:text-brand-400 flex items-center">
                             <Unlock size={10} className="mr-1" /> Admin Open
                         </span>
                    )}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-200 transition-colors">
                {t.curriculum.modules[mod.titleKey]}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-base mb-8 line-clamp-3 leading-relaxed flex-grow">
                {mod.description}
              </p>

              {/* Progress Bar for Module Card */}
              {!isLocked && (
                <div className="mb-6">
                   <div className="flex justify-between text-xs text-slate-500 mb-1.5 font-medium">
                      <span>{t.module.progress}</span>
                      <span>{progressPercent}%</span>
                   </div>
                   <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-brand-500 h-2 rounded-full transition-all duration-500 group-hover:bg-brand-400" 
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                   </div>
                </div>
              )}

              {/* Action */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-700/50 mt-auto flex items-center justify-between">
                {!isLocked ? (
                  <>
                    <span className="text-sm font-bold text-slate-700 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
                      {isStarted ? t.curriculum.continueModule : t.curriculum.startModule}
                    </span>
                    <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full text-slate-400 group-hover:bg-brand-600 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-brand-600 transition-all duration-300 transform group-hover:rotate-0 rtl:rotate-180">
                         <ArrowRight size={18} />
                    </div>
                  </>
                ) : (
                  <div className="flex items-center text-slate-400 dark:text-slate-500 w-full justify-center">
                    <Lock size={16} className="mr-2 rtl:ml-2 rtl:mr-0" />
                    <span className="text-sm">{t.curriculum.locked}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Curriculum;