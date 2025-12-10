import React, { useState } from 'react';
import { User, TranslationStructure } from '../types';
import { X, Trash2, LogOut, AlertTriangle, CheckCircle, ShieldAlert, Lock, Unlock } from 'lucide-react';
import { getCourseData } from '../data';

interface ProfileModalProps {
  user: User;
  t: TranslationStructure;
  onClose: () => void;
  onLogout: () => void;
  completedLessons: string[];
  onDeleteLesson: (lessonId: string) => void;
  onResetProgress: () => void;
  onToggleAdmin: () => void;
  lang: 'en' | 'he';
}

const ProfileModal: React.FC<ProfileModalProps> = ({ 
  user, t, onClose, onLogout, completedLessons, onDeleteLesson, onResetProgress, onToggleAdmin, lang 
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const courseData = getCourseData(t, lang);

  // Flatten lessons to find titles easily
  const allLessons = courseData.flatMap(m => m.lessons);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-float text-slate-900 dark:text-slate-50">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-100 to-white dark:from-brand-900/50 dark:to-slate-900 p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <h2 className="text-2xl font-bold flex items-center">
                {t.profile.title}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <X size={24} />
            </button>
        </div>

        <div className="overflow-y-auto p-6 custom-scrollbar">
            
            {/* User Info */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-10 pb-8 border-b border-slate-200 dark:border-slate-800">
                <div className="relative">
                    <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full border-4 border-brand-500 shadow-lg shadow-brand-500/20" />
                    <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-white dark:border-slate-900"></div>
                </div>
                <div className="text-center md:text-start">
                    <h3 className="text-xl font-bold">{t.profile.hello}, {user.name}!</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-4">{user.email}</p>
                    <button 
                        onClick={onLogout}
                        className="inline-flex items-center px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/30 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 rounded-full text-sm font-medium transition-colors border border-slate-200 dark:border-slate-700 hover:border-red-500/30"
                    >
                        <LogOut size={16} className="mr-2 rtl:mr-0 rtl:ml-2" />
                        {t.nav.logout}
                    </button>
                </div>
            </div>

            {/* Admin Toggle */}
            <div className="mb-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                 <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                         <div className={`p-2 rounded-lg ${user.isAdmin ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400'}`}>
                             {user.isAdmin ? <Unlock size={20} /> : <Lock size={20} />}
                         </div>
                         <div>
                             <h4 className="font-bold text-sm">{t.profile.adminMode}</h4>
                             <p className="text-xs text-slate-500 dark:text-slate-400">{t.profile.adminModeDesc}</p>
                         </div>
                     </div>
                     <button 
                        onClick={onToggleAdmin}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${user.isAdmin ? 'bg-brand-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                     >
                         <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${user.isAdmin ? 'translate-x-6' : 'translate-x-1'}`} />
                     </button>
                 </div>
            </div>

            {/* Progress Management */}
            <div>
                <h3 className="text-lg font-bold mb-4 flex items-center">
                    <CheckCircle className="text-green-500 mr-2 rtl:mr-0 rtl:ml-2" size={20} />
                    {t.profile.progressTitle} ({completedLessons.length})
                </h3>

                {completedLessons.length === 0 ? (
                    <div className="text-center py-10 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                        <p className="text-slate-500 dark:text-slate-500">{t.profile.noProgress}</p>
                    </div>
                ) : (
                    <div className="space-y-3 mb-8">
                        {completedLessons.map(lessonId => {
                            const lessonDetails = allLessons.find(l => l.id === lessonId);
                            return (
                                <div key={lessonId} className="flex items-center justify-between p-3 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors group shadow-sm">
                                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                                        {lessonDetails ? lessonDetails.title : lessonId}
                                    </span>
                                    <button 
                                        onClick={() => onDeleteLesson(lessonId)}
                                        className="p-2 text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                        title={t.profile.deleteLesson}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Danger Zone */}
                {completedLessons.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
                        {!showResetConfirm ? (
                            <button 
                                onClick={() => setShowResetConfirm(true)}
                                className="w-full flex items-center justify-center p-3 text-red-500 dark:text-red-400 border border-red-200 dark:border-red-900/50 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                            >
                                <AlertTriangle size={18} className="mr-2 rtl:mr-0 rtl:ml-2" />
                                {t.profile.resetAll}
                            </button>
                        ) : (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl text-center animate-fade-in-up">
                                <ShieldAlert size={32} className="text-red-500 mx-auto mb-2" />
                                <p className="text-red-800 dark:text-red-200 mb-4 font-bold">{t.profile.resetConfirm}</p>
                                <div className="flex gap-4 justify-center">
                                    <button 
                                        onClick={() => setShowResetConfirm(false)}
                                        className="px-4 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        onClick={() => { onResetProgress(); setShowResetConfirm(false); }}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 font-bold"
                                    >
                                        Confirm Reset
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;