
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Curriculum from './components/Curriculum';
import ModuleView from './components/ModuleView';
import LessonView from './components/LessonView';
import About from './components/About';
import ProfileModal from './components/ProfileModal';
import ChallengeView from './components/ChallengeView';
import LoginModal from './components/LoginModal';
import { en, he } from './locales';
import { Language, User, Theme } from './types';
import { getCourseData } from './data';
import { AlertTriangle } from 'lucide-react';

// Firebase Imports
import { auth, googleProvider, githubProvider, saveUserData, getUserData } from './services/firebase';
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

  // Theme State with Lazy Initialization - Default to LIGHT
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('codefix_theme') as Theme;
        if (savedTheme) {
            document.documentElement.classList.toggle('dark', savedTheme === 'dark');
            return savedTheme;
        }
    }
    // Default to light
    document.documentElement.classList.remove('dark');
    return 'light';
  });

  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [showGuestWarning, setShowGuestWarning] = useState(true);

  // Initialize Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User logged in
        const myAdminEmails = ['y0527148273@gmail.com'];

        const newUser: User = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || 'User',
          email: firebaseUser.email || '',
          avatar: firebaseUser.photoURL || '',
          // Check if user email is in the admin list
          isAdmin: firebaseUser.email ? myAdminEmails.includes(firebaseUser.email) : false
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
      if (theme === 'dark') {
          document.documentElement.classList.add('dark');
      } else {
          document.documentElement.classList.remove('dark');
      }
  }, [theme]);

  const toggleTheme = () => {
      setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const t = lang === 'he' ? he : en;
  const courseData = getCourseData(t, lang);

  const handleOpenLogin = () => {
    setIsLoginModalOpen(true);
  };

  const handleGoogleLogin = async () => {
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (error) {
        console.error("Login failed:", error);
      }
  };

  const handleGithubLogin = async () => {
      try {
        await signInWithPopup(auth, githubProvider);
      } catch (error) {
        console.error("GitHub Login failed:", error);
      }
  };

  const handleLogout = async () => {
      try {
        await signOut(auth);
        setIsProfileOpen(false);
      } catch (error) {
        console.error("Logout failed:", error);
      }
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

  return (
    <HashRouter>
        <div className={`min-h-screen bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-slate-50 selection:bg-brand-500 selection:text-white ${lang === 'he' ? 'rtl' : 'ltr'} transition-colors duration-300`}>
        
        {/* Warning for Guests - Hide on lesson/challenge views done via css or location check in future, but keeping simple here */}
        {!user && showGuestWarning && (
            <div className="fixed bottom-0 left-0 w-full z-40 bg-amber-600/90 backdrop-blur-md text-white p-3 flex items-center justify-center shadow-[0_-4px_20px_rgba(0,0,0,0.3)] animate-fade-in-up">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-3 text-center md:text-start px-4">
                    <AlertTriangle className="animate-pulse flex-shrink-0" />
                    <div className="flex-1">
                        <p className="font-bold text-sm md:text-base">{t.auth.guestWarningTitle}</p>
                        <p className="text-xs md:text-sm opacity-90">{t.auth.guestWarningDesc}</p>
                    </div>
                    <button 
                        onClick={handleOpenLogin}
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

        {/* Login Modal */}
        {isLoginModalOpen && (
            <LoginModal 
                t={t}
                onClose={() => setIsLoginModalOpen(false)}
                onGoogleLogin={handleGoogleLogin}
                onGithubLogin={handleGithubLogin}
            />
        )}

        {/* Navbar */}
        <Navbar 
            lang={lang} 
            setLang={setLang}
            theme={theme}
            toggleTheme={toggleTheme} 
            t={t} 
            user={user}
            onLogin={handleOpenLogin}
            onOpenProfile={() => setIsProfileOpen(true)}
        />

        <main className="relative">
            <Routes>
                <Route path="/" element={<Hero t={t} lang={lang} />} />
                <Route path="/curriculum" element={<Curriculum t={t} completedLessons={completedLessons} courseData={courseData} user={user} />} />
                <Route path="/about" element={<About t={t} />} />
                
                <Route 
                    path="/course/:courseId" 
                    element={
                        <ModuleView 
                            t={t}
                            courseData={courseData}
                            completedLessons={completedLessons}
                            user={user}
                        />
                    } 
                />

                <Route 
                    path="/lesson/:lessonId" 
                    element={
                        <LessonView 
                            t={t} 
                            lang={lang}
                            onComplete={handleLessonComplete}
                            completedLessons={completedLessons}
                            courseData={courseData}
                        />
                    } 
                />

                <Route 
                    path="/challenge/:courseId" 
                    element={
                         <ChallengeView
                            t={t}
                            courseData={courseData}
                            onComplete={() => {}} // Could add logic to mark module complete
                        />
                    }
                />

                {/* Catch all */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </main>

        <footer className={`py-8 text-center text-slate-600 dark:text-slate-400 text-sm border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0f172a] ${!user && showGuestWarning ? 'mb-20' : ''}`}>
            <p>&copy; {new Date().getFullYear()} CodeFix. Built with React & Tailwind.</p>
        </footer>
        </div>
    </HashRouter>
  );
}

export default App;