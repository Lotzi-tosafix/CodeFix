
import React, { useState } from 'react';
import { TranslationStructure } from '../types';
import { Mail, Send, CheckCircle, AlertCircle, User, MessageSquare } from 'lucide-react';
import { sendContactEmail } from '../services/email';
import { saveContactMessage } from '../services/firebase';

interface ContactProps {
  t: TranslationStructure;
}

const Contact: React.FC<ContactProps> = ({ t }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // 1. Save to database for Admin Dashboard
      await saveContactMessage(formData.name, formData.email, formData.subject, formData.message);
      
      // 2. Send email notification (Existing logic)
      await sendContactEmail(formData.name, formData.email, formData.subject, formData.message);
      
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error(error);
      // Even if email fails, if DB saved, we consider it a soft success or handle specific errors
      // For simplicity here, general error if both fail or sequence breaks
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center animate-fade-in-up">
        <div className="max-w-md w-full bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl text-center border border-slate-200 dark:border-slate-700">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t.contact.form.successTitle}</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">{t.contact.form.successDesc}</p>
          <button 
            onClick={() => setStatus('idle')}
            className="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-brand-500/30"
          >
            {t.contact.form.sendAnother}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
          {t.contact.title}
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {t.contact.subtitle}
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800/50 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 md:p-10 animate-fade-in-up">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 rtl:mr-1">
                {t.contact.form.name}
              </label>
              <div className="relative">
                <div className="absolute top-1/2 -translate-y-1/2 left-3 rtl:left-auto rtl:right-3 text-slate-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all dark:text-white"
                  placeholder={t.contact.form.name}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 rtl:mr-1">
                {t.contact.form.email}
              </label>
              <div className="relative">
                <div className="absolute top-1/2 -translate-y-1/2 left-3 rtl:left-auto rtl:right-3 text-slate-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all dark:text-white"
                  placeholder="you@example.com"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 rtl:mr-1">
              {t.contact.form.subject}
            </label>
            <div className="relative">
                <div className="absolute top-1/2 -translate-y-1/2 left-3 rtl:left-auto rtl:right-3 text-slate-400">
                  <MessageSquare size={18} />
                </div>
                <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all dark:text-white"
                placeholder={t.contact.form.subject}
                />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 rtl:mr-1">
              {t.contact.form.message}
            </label>
            <textarea
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all dark:text-white resize-none"
              placeholder={t.contact.form.message}
            />
          </div>

          {status === 'error' && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400">
              <AlertCircle size={20} />
              <div>
                <p className="font-bold">{t.contact.form.errorTitle}</p>
                <p className="text-sm">{t.contact.form.errorDesc}</p>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-brand-500/30 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? (
              <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                {t.contact.form.send}
                <Send className="ml-2 rtl:mr-2 rtl:ml-0" size={20} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;