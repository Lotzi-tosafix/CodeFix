import React from 'react';
import { Module, TranslationStructure } from '../types';
import { ArrowLeft, CheckCircle, Lock, PlayCircle, Globe, Palette, FileCode, Database, Cpu, Layout, Play } from 'lucide-react';

interface ModuleViewProps {
  t: TranslationStructure;
  module: Module;
  completedLessons: string[];
  onBack: () => void;
  onSelectLesson: (lessonId: string) => void;
}

const ModuleView: React.FC<ModuleViewProps> = ({ t, module, completedLessons, onBack, onSelectLesson }) => {
  const totalLessons = module.lessons.length;
  const completedCount = module.lessons.filter(l => completedLessons.includes(l.id)).length;
  const progressPercent = totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);

  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'globe': return <Globe size={40} />;
      case 'palette': return <Palette size={40} />;
      case 'code': return <FileCode size={40} />;
      case 'database': return <Database size={40} />;
      case 'cpu': return <Cpu size={40} />;
      default: return <Layout size={40} />;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in-up">
      {/* Header */}
      <div className="mb-12">
        <button 
            onClick={onBack}
            className="flex items-center text-slate-400 hover:text-white mb-8 transition-colors group"
        >
            <ArrowLeft size={20} className="mr-2 rtl:ml-2 rtl:mr-0 rtl:rotate-180 group-hover:-translate-x-1 transition-transform" />
            {t.module.backToRoadmap}
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center">
                <div className={`
                    p-4 rounded-2xl mr-6 rtl:mr-0 rtl:ml-6 shadow-2xl
                    ${module.levelKey === 'beginner' ? 'bg-gradient-to-br from-green-500 to-emerald-700 text-white' : ''}
                    ${module.levelKey === 'intermediate' ? 'bg-gradient-to-br from-yellow-500 to-orange-700 text-white' : ''}
                    ${module.levelKey === 'advanced' ? 'bg-gradient-to-br from-red-500 to-rose-700 text-white' : ''}
                `}>
                    {getIcon(module.icon)}
                </div>
                <div>
                    <div className="flex items-center gap-3 mb-1">
                         <span className={`
                            text-xs font-bold uppercase tracking-wider py-0.5 px-2 rounded-full
                            ${module.levelKey === 'beginner' ? 'bg-green-900/30 text-green-400 border border-green-500/20' : ''}
                            ${module.levelKey === 'intermediate' ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-500/20' : ''}
                            ${module.levelKey === 'advanced' ? 'bg-red-900/30 text-red-400 border border-red-500/20' : ''}
                        `}>
                            {t.curriculum.levels[module.levelKey]}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{t.curriculum.modules[module.titleKey]}</h1>
                    <p className="text-slate-400 max-w-xl">{module.description}</p>
                </div>
            </div>

            {/* Progress Card */}
            <div className="bg-slate-800/50 border border-slate-700 p-5 rounded-2xl min-w-[280px]">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-slate-400 text-sm font-medium">{t.module.progress}</span>
                    <span className="text-2xl font-bold text-white">{progressPercent}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                    <div 
                        className="bg-brand-500 h-3 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(14,165,233,0.5)]" 
                        style={{ width: `${progressPercent}%` }}
                    ></div>
                </div>
                <div className="mt-2 text-xs text-slate-500 text-end">
                    {completedCount} / {totalLessons} {t.module.completed}
                </div>
            </div>
        </div>
      </div>

      {/* Lesson Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {module.lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id);
            // Lock logic: Lock if it's not the first lesson AND previous lesson is not completed
            const isLocked = index > 0 && !completedLessons.includes(module.lessons[index - 1].id);
            
            // Allow clicking if not locked OR if already completed (ensures completed lessons are always accessible)
            const isClickable = !isLocked || isCompleted; 

            return (
                <div 
                    key={lesson.id}
                    onClick={() => isClickable && onSelectLesson(lesson.id)}
                    className={`
                        relative group rounded-xl p-6 border transition-all duration-300 flex flex-col h-full
                        ${isClickable 
                            ? 'bg-dark-card border-slate-700 hover:border-brand-500 hover:shadow-xl hover:-translate-y-1 cursor-pointer' 
                            : 'bg-slate-900/50 border-slate-800 opacity-60 cursor-not-allowed'}
                    `}
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg
                            ${isCompleted 
                                ? 'bg-green-500 text-white' 
                                : isClickable 
                                    ? 'bg-slate-700 text-brand-200 group-hover:bg-brand-600 group-hover:text-white transition-colors' 
                                    : 'bg-slate-800 text-slate-600'}
                        `}>
                            {isCompleted ? <CheckCircle size={20} /> : index + 1}
                        </div>
                        {isCompleted && (
                             <span className="text-xs font-bold text-green-400 bg-green-900/20 px-2 py-1 rounded-full border border-green-500/20">
                                {t.module.completed}
                             </span>
                        )}
                        {!isClickable && <Lock size={18} className="text-slate-600" />}
                    </div>

                    <h3 className={`text-xl font-bold mb-3 ${isClickable ? 'text-white group-hover:text-brand-300 transition-colors' : 'text-slate-500'}`}>
                        {lesson.title}
                    </h3>
                    
                    <p className="text-slate-400 text-sm mb-6 flex-grow">
                        {lesson.description}
                    </p>

                    <div className="pt-4 border-t border-slate-700/50 mt-auto flex items-center justify-between">
                         <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                            {isClickable ? (isCompleted ? t.module.startLesson : t.module.startLesson) : t.module.locked}
                         </span>
                         {isClickable && (
                            <div className="bg-slate-800 p-2 rounded-full text-slate-400 group-hover:bg-brand-500 group-hover:text-white transition-all">
                                <Play size={16} fill="currentColor" className="ml-0.5" />
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

export default ModuleView;