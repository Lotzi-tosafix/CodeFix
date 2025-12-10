import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Curriculum from './components/Curriculum';
import ModuleView from './components/ModuleView';
import LessonView from './components/LessonView';
import About from './components/About';
import ProfileModal from './components/ProfileModal';
import ChallengeView from './components/ChallengeView';
import { en, he } from './locales';
import { Language, ViewState, Module, User, Theme } from './types';
import { getCourseData } from './data';
import { AlertTriangle } from 'lucide-react';

// Firebase Imports
import { auth, googleProvider, saveUserData, getUserData } from './services/firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

function App() {
  // Language State with Lazy Initialization
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
        const savedLang = localStorage.getItem('codefix_lang') as Language;
        if (savedLang) return savedLang;
        return navigator.language.startsWith('he') ? 'he' : 'en';
    }
    return 'en';
  });

  const [view, setView] = useState<ViewState>('home');
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [currentLesson, setCurrentLesson] = useState<{id: string, moduleTitle: string} | null>(null);
  
  // Theme State with Lazy Initialization
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('codefix_theme') as Theme;
        if (savedTheme) {
            document.documentElement.classList.toggle('dark', savedTheme === 'dark');
            return savedTheme;
        }
    }
    // Default to dark
    document.documentElement.classList.add('dark');
    return 'dark';
  });

  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [showGuestWarning, setShowGuestWarning] = useState(true);

  // Initialize Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User logged in
        const newUser: User = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || 'User',
          email: firebaseUser.email || '',
          avatar: firebaseUser.photoURL || '',
          isAdmin: false // Keeps admin strictly local for this implementation
        };
        
        setUser(newUser);
        setShowGuestWarning(false);

        // Fetch progress from Firestore
        const cloudProgress = await getUserData(firebaseUser.uid);
        setCompletedLessons(cloudProgress);
        
      } else {
        // User logged out
        setUser(null);
        setCompletedLessons([]);
        setShowGuestWarning(true);
      }
    });

    return () => unsubscribe();
  }, []);

  // Sync language to DOM
  useEffect(() => {
    localStorage.setItem('codefix_lang', lang);
    document.dir = lang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang; 
  }, [lang]);

  // Save Theme preference
  useEffect(() => {
      localStorage.setItem('codefix_theme', theme);
      document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
      setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const t = lang === 'he' ? he : en;
  const courseData = getCourseData(t, lang);

  const handleLogin = async () => {
      try {
        await signInWithPopup(auth, googleProvider);
        // State updates via onAuthStateChanged hook
      } catch (error) {
        console.error("Login failed:", error);
      }
  };

  const handleLogout = async () => {
      try {
        await signOut(auth);
        setIsProfileOpen(false);
        setView('home');
      } catch (error) {
        console.error("Logout failed:", error);
      }
  };

  const handleToggleAdmin = () => {
      if (!user) return;
      // Admin state is kept local for now
      const updatedUser = { ...user, isAdmin: !user.isAdmin };
      setUser(updatedUser);
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

  const handleStartChallenge = () => {
      if (!activeModule) return;
      setView('challenge');
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
      
      // Save to Firestore if user is logged in
      if (user) {
          saveUserData(user.id, newCompleted);
      }
    }
  };

  const handleChallengeComplete = () => {
      // Mark module complete logic here (in future)
      setView('module');
  };

  // Profile Management

  const handleDeleteLesson = (lessonId: string) => {
      const newCompleted = completedLessons.filter(id => id !== lessonId);
      setCompletedLessons(newCompleted);
      if (user) {
          saveUserData(user.id, newCompleted);
      }
  };

  const handleResetProgress = () => {
      setCompletedLessons([]);
      if (user) {
          saveUserData(user.id, []);
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
    <div className={`min-h-screen bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-slate-50 selection:bg-brand-500 selection:text-white ${lang === 'he' ? 'rtl' : 'ltr'} transition-colors duration-300`}>
      
      {/* Warning for Guests */}
      {!user && showGuestWarning && view !== 'lesson' && view !== 'challenge' && (
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
              onToggleAdmin={handleToggleAdmin}
          />
      )}

      {view !== 'lesson' && view !== 'challenge' && (
        <Navbar 
            lang={lang} 
            setLang={setLang}
            theme={theme}
            toggleTheme={toggleTheme} 
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
              user={user}
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
              user={user}
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
                onStartChallenge={handleStartChallenge}
            />
        )}

        {view === 'challenge' && activeModule && activeModule.finalChallenge && (
            <ChallengeView
                t={t}
                challenge={activeModule.finalChallenge}
                onBack={handleBackToModule}
                onComplete={handleChallengeComplete}
            />
        )}
      </main>

      {view !== 'lesson' && view !== 'challenge' && (
        <footer className={`py-8 text-center text-slate-600 dark:text-slate-400 text-sm border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0f172a] ${!user && showGuestWarning ? 'mb-20' : ''}`}>
            <p>&copy; {new Date().getFullYear()} CodeFix. Built with React & Tailwind.</p>
        </footer>
      )}
    </div>
  );
}

export default App;