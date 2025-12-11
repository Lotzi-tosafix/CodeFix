
import React from 'react';
import { Globe, Menu, X, Code2, LogIn, User as UserIcon, Sun, Moon } from 'lucide-react';
import { Language, TranslationStructure, User, Theme } from '../types';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface NavbarProps {
  lang: Language;
  setLang: (l: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: TranslationStructure;
  user: User | null;
  onLogin: () => void;
  onOpenProfile: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang, theme, toggleTheme, t, user, onLogin, onOpenProfile }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleLang = () => {
    setLang(lang === 'en' ? 'he' : 'en');
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinkClass = (path: string) => `
    cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition-colors
    ${isActive(path) 
      ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20' 
      : 'text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'}
  `;

  // Hide Navbar on specific routes if needed, but usually good to keep it or use a minimalist version
  const isImmersiveView = location.pathname.includes('/lesson/') || location.pathname.includes('/challenge/');
  if (isImmersiveView) return null;

  return (
    <nav className="fixed w-full z-50 top-0 start-0 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-[#0f172a]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0 cursor-pointer">
            <div className="bg-gradient-to-tr from-brand-500 to-purple-600 p-2 rounded-lg mr-2 rtl:mr-0 rtl:ml-2">
              <Code2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
              CodeFix
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Link to="/" className={navLinkClass('/')}>
                {t.nav.home}
              </Link>
              <Link to="/curriculum" className={navLinkClass('/curriculum')}>
                {t.nav.curriculum}
              </Link>
              <Link to="/about" className={navLinkClass('/about')}>
                {t.nav.about}
              </Link>
              
              <div className="h-6 w-px bg-slate-300 dark:bg-slate-700 mx-2"></div>

              <button 
                onClick={toggleTheme}
                className="p-2 text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-white transition-colors"
                title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <button 
                onClick={toggleLang}
                className="flex items-center space-x-1 rtl:space-x-reverse text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-white transition-colors px-2"
              >
                <Globe size={18} />
                <span className="uppercase text-xs font-bold">{lang}</span>
              </button>

              {user ? (
                 <button 
                    onClick={onOpenProfile}
                    className="flex items-center gap-2 ml-4 rtl:mr-4 pl-2 pr-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all group"
                 >
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-600 group-hover:border-brand-400" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{user.name.split(' ')[0]}</span>
                 </button>
              ) : (
                <button 
                  onClick={onLogin}
                  className="flex items-center gap-2 ml-4 rtl:mr-4 bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-brand-500/20"
                >
                  <LogIn size={16} />
                  <span>{t.nav.login}</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white p-2"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             {user && (
                 <div className="flex items-center p-3 mb-2 bg-slate-100 dark:bg-slate-800/50 rounded-lg">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-3 rtl:mr-0 rtl:ml-3" />
                    <div>
                        <p className="text-slate-900 dark:text-white font-bold">{user.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                    </div>
                 </div>
             )}

            <button onClick={() => {navigate('/'); setIsOpen(false)}} className="block w-full text-start text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white px-3 py-2 rounded-md text-base font-medium">
              {t.nav.home}
            </button>
            <button onClick={() => {navigate('/curriculum'); setIsOpen(false)}} className="block w-full text-start text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white px-3 py-2 rounded-md text-base font-medium">
              {t.nav.curriculum}
            </button>
             <button onClick={() => {navigate('/about'); setIsOpen(false)}} className="block w-full text-start text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white px-3 py-2 rounded-md text-base font-medium">
              {t.nav.about}
            </button>
            
            <div className="flex gap-2 px-3 py-2">
                 <button onClick={() => {toggleTheme(); setIsOpen(false)}} className="flex-1 flex items-center justify-center p-2 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {theme === 'dark' ? <Sun size={18} className="mr-2" /> : <Moon size={18} className="mr-2" />}
                    {theme === 'dark' ? 'Light' : 'Dark'}
                 </button>
                 <button onClick={() => {toggleLang(); setIsOpen(false)}} className="flex-1 flex items-center justify-center p-2 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
                    <Globe size={18} className="mr-2" />
                    {lang.toUpperCase()}
                 </button>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-700 my-2 pt-2">
                {user ? (
                    <button onClick={() => {onOpenProfile(); setIsOpen(false)}} className="flex w-full items-center text-start text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white px-3 py-2 rounded-md text-base font-medium">
                        <UserIcon size={16} className="mr-2 rtl:ml-2 rtl:mr-0" />
                        {t.nav.profile}
                    </button>
                ) : (
                    <button onClick={() => {onLogin(); setIsOpen(false)}} className="flex w-full items-center text-start text-brand-600 dark:text-brand-400 hover:text-brand-500 dark:hover:text-brand-300 px-3 py-2 rounded-md text-base font-medium font-bold">
                        <LogIn size={16} className="mr-2 rtl:ml-2 rtl:mr-0" />
                        {t.nav.login}
                    </button>
                )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
