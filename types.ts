export type Language = 'en' | 'he';
export type Theme = 'dark' | 'light';

export type ViewState = 'home' | 'curriculum' | 'module' | 'lesson' | 'challenge' | 'about';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isAdmin?: boolean; // God mode
}

export interface TranslationStructure {
  nav: {
    home: string;
    curriculum: string;
    about: string;
    getStarted: string;
    language: string;
    login: string;
    logout: string;
    profile: string;
  };
  auth: {
    guestWarningTitle: string;
    guestWarningDesc: string;
    loginWithGoogle: string;
    loginSuccess: string;
    logoutSuccess: string;
  };
  profile: {
    title: string;
    progressTitle: string;
    deleteLesson: string;
    resetAll: string;
    resetConfirm: string;
    noProgress: string;
    hello: string;
    adminMode: string;
    adminModeDesc: string;
  };
  hero: {
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats_students: string;
    stats_lessons: string;
    stats_rating: string;
  };
  about: {
    title: string;
    subtitle: string;
    features: {
      interactiveTitle: string;
      interactiveDesc: string;
      aiTitle: string;
      aiDesc: string;
      practicalTitle: string;
      practicalDesc: string;
    };
    philosophyTitle: string;
    philosophyContent: string;
    cta: string;
  };
  curriculum: {
    title: string;
    subtitle: string;
    modules: {
      basics: string;
      css: string;
      js: string;
      react: string;
      backend: string;
    };
    levels: {
      beginner: string;
      intermediate: string;
      advanced: string;
    };
    startModule: string;
    continueModule: string;
    locked: string;
  };
  module: {
    backToRoadmap: string;
    progress: string;
    lessons: string;
    startLesson: string;
    completed: string;
    locked: string;
  };
  lesson: {
    aiTutorTitle: string;
    aiTutorPlaceholder: string;
    aiTutorButton: string;
    backToCurriculum: string; // Actually back to module
    nextLesson: string;
    finalChallenge: string;
    completed: string;
    markComplete: string;
    markCompleteAction: string;
    requirementsNotMet: string;
    loading: string;
    openAi: string;
    readAloud: string;
    stopReading: string;
  };
  challenge: {
    title: string;
    description: string;
    task: string;
    runTests: string;
    success: string;
    failure: string;
    backToModule: string;
  };
  practice: {
    title: string;
    runCode: string;
    runAll: string;
    showSolution: string;
    hideSolution: string;
    quizCorrect: string;
    quizIncorrect: string;
    check: string;
    yourCode: string;
    preview: string;
  };
}

export interface QuizPractice {
  type: 'quiz';
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option
  explanation?: string;
}

export interface CodePractice {
  type: 'code';
  id: string;
  title: string;
  description: string;
  initialCode: string;
  solution: string;
  language: 'html' | 'css' | 'javascript';
}

export type PracticeItem = QuizPractice | CodePractice;

export interface Challenge {
  id: string;
  title: string;
  description: string;
  initialCode: string;
  solutionCode: string; // Simple check
  language: 'html' | 'css' | 'javascript';
  validation: (code: string) => boolean;
}

export interface Module {
  id: string;
  titleKey: keyof TranslationStructure['curriculum']['modules'];
  levelKey: keyof TranslationStructure['curriculum']['levels'];
  icon: string;
  description: string; // Fallback description
  lessons: Lesson[];
  locked: boolean;
  finalChallenge?: Challenge;
}

export interface Lesson {
  id: string;
  title: string;
  description: string; // Short description for the card
  content: string; // Markdown supported
  practice?: PracticeItem[];
}