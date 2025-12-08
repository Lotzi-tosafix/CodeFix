import React from 'react';
import { Globe, Menu, X, Code2, LogIn, User as UserIcon } from 'lucide-react';
import { Language, TranslationStructure, ViewState, User } from '../types';

interface NavbarProps {
  lang: Language;
  setLang: (l: Language) => void;
  t: TranslationStructure;
  setView: (v: ViewState) => void;
  currentView: ViewState;
  user: User | null;
  onLogin: () => void;
  onOpenProfile: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang, t, setView, currentView, user, onLogin, onOpenProfile }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleLang = () => {
    setLang(lang === 'en' ? 'he' : 'en');
  };

  const navLinkClass = (view: ViewState) => `
    cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition-colors
    ${currentView === view 
      ? 'text-brand-400 bg-brand-900/20' 
      : 'text-slate-300 hover:text-white hover:bg-slate-800'}
  `;

  return (
    <nav className="fixed w-full z-50 top-0 start-0 border-b border-slate-800 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 cursor-pointer" onClick={() => setView('home')}>
            <div className="bg-gradient-to-tr from-brand-500 to-purple-600 p-2 rounded-lg mr-2 rtl:mr-0 rtl:ml-2">
              <Code2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              CodeFix
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span onClick={() => setView('home')} className={navLinkClass('home')}>
                {t.nav.home}
              </span>
              <span onClick={() => setView('curriculum')} className={navLinkClass('curriculum')}>
                {t.nav.curriculum}
              </span>
              <span onClick={() => setView('about')} className={navLinkClass('about')}>
                {t.nav.about}
              </span>
              
              <div className="h-6 w-px bg-slate-700 mx-2"></div>

              <button 
                onClick={toggleLang}
                className="flex items-center space-x-1 rtl:space-x-reverse text-slate-400 hover:text-white transition-colors px-2"
              >
                <Globe size={18} />
                <span className="uppercase text-xs font-bold">{lang}</span>
              </button>

              {user ? (
                 <button 
                    onClick={onOpenProfile}
                    className="flex items-center gap-2 ml-4 rtl:mr-4 pl-2 pr-4 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all group"
                 >
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-slate-600 group-hover:border-brand-400" />
                    <span className="text-sm font-medium text-slate-200">{user.name.split(' ')[0]}</span>
                 </button>
              ) : (
                <button 
                  onClick={onLogin}
                  className="flex items-center gap-2 ml-4 rtl:mr-4 bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-brand-500/20"
                >
                  <LogIn size={16} />
                  <span className="hidden lg:inline">{t.auth.loginWithGoogle}</span>
                  <span className="lg:hidden">{t.nav.login}</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white p-2"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             {user && (
                 <div className="flex items-center p-3 mb-2 bg-slate-800/50 rounded-lg">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-3 rtl:mr-0 rtl:ml-3" />
                    <div>
                        <p className="text-white font-bold">{user.name}</p>
                        <p className="text-xs text-slate-400">{user.email}</p>
                    </div>
                 </div>
             )}

            <button onClick={() => {setView('home'); setIsOpen(false)}} className="block w-full text-start text-slate-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">
              {t.nav.home}
            </button>
            <button onClick={() => {setView('curriculum'); setIsOpen(false)}} className="block w-full text-start text-slate-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">
              {t.nav.curriculum}
            </button>
             <button onClick={() => {setView('about'); setIsOpen(false)}} className="block w-full text-start text-slate-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">
              {t.nav.about}
            </button>
            <button onClick={() => {toggleLang(); setIsOpen(false)}} className="flex w-full items-center text-start text-slate-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">
              <Globe size={16} className="mr-2 rtl:ml-2 rtl:mr-0" />
              {t.nav.language} ({lang.toUpperCase()})
            </button>

            <div className="border-t border-slate-700 my-2 pt-2">
                {user ? (
                    <button onClick={() => {onOpenProfile(); setIsOpen(false)}} className="flex w-full items-center text-start text-slate-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">
                        <UserIcon size={16} className="mr-2 rtl:ml-2 rtl:mr-0" />
                        {t.nav.profile}
                    </button>
                ) : (
                    <button onClick={() => {onLogin(); setIsOpen(false)}} className="flex w-full items-center text-start text-brand-400 hover:text-brand-300 px-3 py-2 rounded-md text-base font-medium font-bold">
                        <LogIn size={16} className="mr-2 rtl:ml-2 rtl:mr-0" />
                        {t.auth.loginWithGoogle}
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