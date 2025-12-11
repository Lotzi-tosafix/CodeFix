
import React, { useEffect, useState } from 'react';
import { ContactMessage, LessonFeedback, TranslationStructure, User } from '../types';
import { getAdminMessages, getAdminFeedback } from '../services/firebase';
import { Loader2, Mail, MessageSquare, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AdminDashboardProps {
  t: TranslationStructure;
  user: User | null;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ t, user }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'messages' | 'feedback'>('messages');
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [feedbacks, setFeedbacks] = useState<LessonFeedback[]>([]);
  const [loading, setLoading] = useState(true);

  // Security check redundant as Route should handle it, but double safety
  useEffect(() => {
      if (!user?.isAdmin) {
          navigate('/');
      }
  }, [user, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [msgs, fbs] = await Promise.all([
          getAdminMessages(),
          getAdminFeedback()
        ]);
        
        // Convert Firestore timestamps if needed or handle simple display
        // The helper in firebase.ts returns raw data, we assume proper typing here.
        setMessages(msgs as any); 
        setFeedbacks(fbs as any);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.isAdmin) {
        fetchData();
    }
  }, [user]);

  if (!user?.isAdmin) {
      return (
          <div className="min-h-screen flex items-center justify-center pt-20">
              <div className="text-center p-10 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                  <ShieldAlert size={48} className="text-red-500 mx-auto mb-4" />
                  <h1 className="text-2xl font-bold text-red-700 dark:text-red-400">{t.admin.accessDenied}</h1>
              </div>
          </div>
      );
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '-';
    // Firestore timestamp to JS Date
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 md:mb-0">
            {t.admin.title}
        </h1>
        
        <div className="flex bg-white dark:bg-slate-800 p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <button
                onClick={() => setActiveTab('messages')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'messages' ? 'bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
            >
                <Mail size={16} />
                {t.admin.tabs.messages} ({messages.length})
            </button>
            <button
                onClick={() => setActiveTab('feedback')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'feedback' ? 'bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
            >
                <MessageSquare size={16} />
                {t.admin.tabs.feedback} ({feedbacks.length})
            </button>
        </div>
      </div>

      {loading ? (
          <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-brand-500" size={40} />
          </div>
      ) : (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700 animate-fade-in-up">
              <div className="overflow-x-auto">
                <table className="w-full text-start border-collapse">
                    <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                        <tr>
                            <th className="p-4 text-start font-semibold text-slate-600 dark:text-slate-400 text-sm">{t.admin.table.date}</th>
                            {activeTab === 'messages' ? (
                                <>
                                    <th className="p-4 text-start font-semibold text-slate-600 dark:text-slate-400 text-sm">{t.admin.table.name}</th>
                                    <th className="p-4 text-start font-semibold text-slate-600 dark:text-slate-400 text-sm">{t.admin.table.email}</th>
                                    <th className="p-4 text-start font-semibold text-slate-600 dark:text-slate-400 text-sm">{t.admin.table.subject}</th>
                                    <th className="p-4 text-start font-semibold text-slate-600 dark:text-slate-400 text-sm">{t.admin.table.message}</th>
                                </>
                            ) : (
                                <>
                                    <th className="p-4 text-start font-semibold text-slate-600 dark:text-slate-400 text-sm">{t.admin.table.lessonId}</th>
                                    <th className="p-4 text-start font-semibold text-slate-600 dark:text-slate-400 text-sm">{t.admin.table.email}</th>
                                    <th className="p-4 text-start font-semibold text-slate-600 dark:text-slate-400 text-sm">{t.admin.table.feedback}</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                        {activeTab === 'messages' ? (
                            messages.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-slate-500 dark:text-slate-400">{t.admin.empty}</td>
                                </tr>
                            ) : (
                                messages.map(msg => (
                                    <tr key={msg.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                        <td className="p-4 text-sm whitespace-nowrap text-slate-500 dark:text-slate-400">{formatDate(msg.timestamp)}</td>
                                        <td className="p-4 text-sm font-medium text-slate-900 dark:text-white">{msg.name}</td>
                                        <td className="p-4 text-sm text-slate-600 dark:text-slate-300">{msg.email}</td>
                                        <td className="p-4 text-sm text-slate-900 dark:text-white font-medium">{msg.subject}</td>
                                        <td className="p-4 text-sm text-slate-600 dark:text-slate-300 max-w-xs truncate" title={msg.message}>{msg.message}</td>
                                    </tr>
                                ))
                            )
                        ) : (
                            feedbacks.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-slate-500 dark:text-slate-400">{t.admin.empty}</td>
                                </tr>
                            ) : (
                                feedbacks.map(fb => (
                                    <tr key={fb.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                        <td className="p-4 text-sm whitespace-nowrap text-slate-500 dark:text-slate-400">{formatDate(fb.timestamp)}</td>
                                        <td className="p-4 text-sm font-bold text-brand-600 dark:text-brand-400">{fb.lessonId}</td>
                                        <td className="p-4 text-sm text-slate-600 dark:text-slate-300">{fb.userEmail}</td>
                                        <td className="p-4 text-sm text-slate-600 dark:text-slate-300 italic">"{fb.feedback}"</td>
                                    </tr>
                                ))
                            )
                        )}
                    </tbody>
                </table>
              </div>
          </div>
      )}
    </div>
  );
};

export default AdminDashboard;
