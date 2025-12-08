import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Curriculum from './components/Curriculum';
import ModuleView from './components/ModuleView';
import LessonView from './components/LessonView';
import About from './components/About';
import ProfileModal from './components/ProfileModal';
import { en, he } from './locales';
import { Language, ViewState, Module, User } from './types';
import { getCourseData } from './data';
import { AlertTriangle } from 'lucide-react';

function App() {
  const [lang, setLang] = useState<Language>('en');
  const [view, setView] = useState<ViewState>('home');
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [currentLesson, setCurrentLesson] = useState<{id: string, moduleTitle: string} | null>(null);
  
  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [showGuestWarning, setShowGuestWarning] = useState(true);

  // Initialize language from browser or localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('codefix_lang') as Language;
    if (savedLang) {
      setLang(savedLang);
    } else {
      const browserLang = navigator.language.startsWith('he') ? 'he' : 'en';
      setLang(browserLang);
    }
    
    // Check if there is a previously logged in user (Mock Session)
    const storedUser = localStorage.getItem('codefix_current_user');
    if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        loadUserProgress(parsedUser.email);
        setShowGuestWarning(false);
    } else {
        // Guest mode: Reset progress (don't load from local storage persistence unless it's session)
        setCompletedLessons([]);
    }
  }, []);

  // Save language preference
  useEffect(() => {
    localStorage.setItem('codefix_lang', lang);
    document.dir = lang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const t = lang === 'he' ? he : en;
  const courseData = getCourseData(t, lang);

  // --- Auth & Data Simulation Logic ---

  const loadUserProgress = (email: string) => {
      // Simulate fetching from DB
      const dbData = localStorage.getItem(`codefix_db_progress_${email}`);
      if (dbData) {
          try {
              setCompletedLessons(JSON.parse(dbData));
          } catch (e) { console.error(e); }
      } else {
          setCompletedLessons([]);
      }
  };

  const saveUserProgress = (email: string, progress: string[]) => {
      // Simulate saving to DB
      localStorage.setItem(`codefix_db_progress_${email}`, JSON.stringify(progress));
  };

  const handleLogin = () => {
      // MOCK Google Login
      const mockUser: User = {
          id: 'u_' + Date.now(),
          name: 'Israel Israeli',
          email: 'israel@gmail.com',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
      };
      
      setUser(mockUser);
      localStorage.setItem('codefix_current_user', JSON.stringify(mockUser));
      
      // Load progress from "DB"
      loadUserProgress(mockUser.email);
      setShowGuestWarning(false);
      
      // Merge guest progress if needed? For now, we'll just switch context.
      // Ideally, we might ask to merge, but let's stick to switching.
  };

  const handleLogout = () => {
      setUser(null);
      localStorage.removeItem('codefix_current_user');
      // Clear local state (Guest mode starts empty)
      setCompletedLessons([]); 
      setShowGuestWarning(true);
      setIsProfileOpen(false);
      setView('home');
  };

  // Navigation Handlers

  const handleSelectModule = (module: Module) => {
    setActiveModule(module);
    setView('module');
  };

  const handleLessonSelect = (id: string) => {
    if (!activeModule) return;
    setCurrentLesson({ id, moduleTitle: t.curriculum.modules[activeModule.titleKey] });
    setView('lesson');
  };

  const handleBackToRoadmap = () => {
    setView('curriculum');
    setActiveModule(null);
  };

  const handleBackToModule = () => {
    setView('module');
    setCurrentLesson(null);
  };

  const handleLessonComplete = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      const newCompleted = [...completedLessons, lessonId];
      setCompletedLessons(newCompleted);
      
      // If User: Save to persistent DB simulation
      if (user) {
          saveUserProgress(user.email, newCompleted);
      }
      // If Guest: It stays in memory (state) only.
    }
  };

  // Profile Management

  const handleDeleteLesson = (lessonId: string) => {
      const newCompleted = completedLessons.filter(id => id !== lessonId);
      setCompletedLessons(newCompleted);
      if (user) {
          saveUserProgress(user.email, newCompleted);
      }
  };

  const handleResetProgress = () => {
      setCompletedLessons([]);
      if (user) {
          saveUserProgress(user.email, []);
      }
  };

  const getNextLessonId = (currentId: string): string | null => {
    if (!activeModule) return null;
    const currentIndex = activeModule.lessons.findIndex(l => l.id === currentId);
    if (currentIndex >= 0 && currentIndex < activeModule.lessons.length - 1) {
      return activeModule.lessons[currentIndex + 1].id;
    }
    return null;
  };

  const nextLessonId = currentLesson ? getNextLessonId(currentLesson.id) : null;

  return (
    <div className={`min-h-screen bg-dark-bg text-slate-50 selection:bg-brand-500 selection:text-white ${lang === 'he' ? 'rtl' : 'ltr'}`}>
      
      {/* Warning for Guests */}
      {!user && showGuestWarning && view !== 'lesson' && (
          <div className="fixed bottom-0 left-0 w-full z-40 bg-amber-600/90 backdrop-blur-md text-white p-3 flex items-center justify-center shadow-[0_-4px_20px_rgba(0,0,0,0.3)] animate-fade-in-up">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-3 text-center md:text-start px-4">
                  <AlertTriangle className="animate-pulse flex-shrink-0" />
                  <div className="flex-1">
                      <p className="font-bold text-sm md:text-base">{t.auth.guestWarningTitle}</p>
                      <p className="text-xs md:text-sm opacity-90">{t.auth.guestWarningDesc}</p>
                  </div>
                  <button 
                    onClick={handleLogin}
                    className="bg-white text-amber-700 px-4 py-1.5 rounded-full text-sm font-bold hover:bg-amber-50 transition-colors whitespace-nowrap"
                  >
                    {t.auth.loginWithGoogle}
                  </button>
                  <button onClick={() => setShowGuestWarning(false)} className="md:ml-4 opacity-70 hover:opacity-100">
                      <span className="sr-only">Dismiss</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
              </div>
          </div>
      )}

      {/* Profile Modal */}
      {user && isProfileOpen && (
          <ProfileModal 
              user={user}
              t={t}
              lang={lang}
              onClose={() => setIsProfileOpen(false)}
              onLogout={handleLogout}
              completedLessons={completedLessons}
              onDeleteLesson={handleDeleteLesson}
              onResetProgress={handleResetProgress}
          />
      )}

      {view !== 'lesson' && (
        <Navbar 
            lang={lang} 
            setLang={setLang} 
            t={t} 
            setView={setView} 
            currentView={view}
            user={user}
            onLogin={handleLogin}
            onOpenProfile={() => setIsProfileOpen(true)}
        />
      )}

      <main className="relative">
        {view === 'home' && <Hero t={t} setView={setView} lang={lang} />}
        
        {view === 'curriculum' && (
            <Curriculum 
              t={t} 
              onSelectModule={handleSelectModule} 
              completedLessons={completedLessons}
              courseData={courseData}
            />
        )}
        
        {view === 'about' && (
            <About t={t} setView={setView} />
        )}

        {view === 'module' && activeModule && (
            <ModuleView 
              t={t}
              module={activeModule}
              completedLessons={completedLessons}
              onBack={handleBackToRoadmap}
              onSelectLesson={handleLessonSelect}
            />
        )}

        {view === 'lesson' && currentLesson && (
            <LessonView 
                t={t} 
                lessonId={currentLesson.id} 
                moduleTitle={currentLesson.moduleTitle} 
                onBack={handleBackToModule}
                lang={lang}
                onComplete={() => handleLessonComplete(currentLesson.id)}
                isCompleted={completedLessons.includes(currentLesson.id)}
                nextLessonId={nextLessonId}
                onNextLesson={handleLessonSelect}
            />
        )}
      </main>

      {view !== 'lesson' && (
        <footer className={`py-8 text-center text-slate-600 text-sm border-t border-slate-800 bg-dark-bg ${!user && showGuestWarning ? 'mb-20' : ''}`}>
            <p>&copy; {new Date().getFullYear()} CodeFix. Built with React & Tailwind.</p>
        </footer>
      )}
    </div>
  );
}

export default App;