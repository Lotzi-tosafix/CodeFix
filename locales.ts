
import { TranslationStructure } from './types';

export const en: TranslationStructure = {
  nav: {
    home: "Home",
    curriculum: "Courses",
    about: "About",
    contact: "Contact",
    getStarted: "Start Coding",
    language: "English",
    login: "Login",
    logout: "Logout",
    profile: "My Profile",
    admin: "Admin Dashboard"
  },
  admin: {
    title: "Admin Dashboard",
    tabs: {
        messages: "Contact Messages",
        feedback: "Lesson Feedback"
    },
    table: {
        date: "Date",
        name: "Name",
        email: "Email",
        subject: "Subject",
        message: "Message",
        lessonId: "Lesson ID",
        feedback: "Reason"
    },
    empty: "No records found.",
    accessDenied: "Access Denied. Admins only."
  },
  auth: {
    guestWarningTitle: "You are in Guest Mode",
    guestWarningDesc: "Your progress is NOT saved. Login to sync your journey across devices and keep your achievements.",
    loginWithGoogle: "Login",
    loginSuccess: "Welcome back!",
    logoutSuccess: "Logged out successfully",
    loginTitle: "Join CodeFix",
    loginSubtitle: "Sign in to save your progress and access all features"
  },
  profile: {
    title: "User Profile",
    progressTitle: "My Progress",
    deleteLesson: "Remove",
    resetAll: "Reset All Courses",
    resetConfirm: "Are you sure? This cannot be undone.",
    noProgress: "You haven't completed any lessons yet.",
    hello: "Hello",
    adminMode: "Developer Mode",
    adminModeDesc: "Unlock all content for testing"
  },
  hero: {
    titlePrefix: "Master Web Dev",
    titleHighlight: "From Zero to Hero",
    subtitle: "The most friendly, engaging, and modern way to learn coding. No scary jargon, just pure skills. Your journey starts here.",
    ctaPrimary: "Start Learning Now",
    ctaSecondary: "What will I learn?",
    stats_students: "Active Learners",
    stats_lessons: "Interactive Lessons",
    stats_rating: "Community Likes"
  },
  about: {
    title: "Reinventing How You Learn Code",
    subtitle: "CodeFix isn't just another tutorial site. It's a complete ecosystem designed to make you a developer, not just a reader.",
    features: {
      interactiveTitle: "100% Interactive",
      interactiveDesc: "No more boring videos. You write code, break things, and fix them in real-time within our advanced browser editor.",
      aiTitle: "AI Powered Tutor",
      aiDesc: "Stuck? Our Gemini-powered AI tutor is available 24/7 inside every lesson to explain concepts and debug your code instantly.",
      practicalTitle: "Project Based",
      practicalDesc: "Theory is good, but practice is better. Every course ends with real-world scenarios and code challenges."
    },
    topicsTitle: "What You Will Learn",
    topics: {
      htmlTitle: "HTML5 Structure",
      htmlDesc: "The skeleton of the web. Learn tags, semantic structure, and SEO basics.",
      cssTitle: "CSS3 Styling",
      cssDesc: "Make it beautiful. Master Flexbox, Grid, animations, and responsive design.",
      jsTitle: "JavaScript Logic",
      jsDesc: "The brain of your site. Variables, functions, DOM manipulation, and logic.",
      reactTitle: "Modern React",
      reactDesc: "Build powerful single-page applications with Components, Hooks, and State."
    },
    philosophyTitle: "Our Method",
    philosophyContent: "We believe that coding should be accessible to everyone. The traditional way of learning—watching hours of video lectures—is outdated. At CodeFix, we focus on 'Learning by Doing'. We strip away the complex academic jargon and focus on the skills that actually get you hired.",
    cta: "Ready to start your journey?"
  },
  contact: {
    title: "Get in Touch",
    subtitle: "Have a question, suggestion, or just want to say hi? We'd love to hear from you.",
    form: {
      name: "Your Name",
      email: "Email Address",
      subject: "Subject",
      message: "Message",
      send: "Send Message",
      sending: "Sending...",
      successTitle: "Message Sent!",
      successDesc: "Thanks for reaching out. We'll get back to you as soon as possible.",
      errorTitle: "Oops!",
      errorDesc: "Something went wrong. Please try again later.",
      sendAnother: "Send Another Message"
    }
  },
  curriculum: {
    title: "Our Courses",
    subtitle: "A step-by-step journey from your first line of HTML to a full-stack application.",
    modules: {
      basics: "HTML & Internet Basics",
      css: "CSS & Styling Mastery",
      js: "JavaScript Logic",
      react: "Modern React UI",
      backend: "Node.js & Databases"
    },
    levels: {
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced"
    },
    startModule: "Start Course",
    continueModule: "Continue Course",
    locked: "Complete Previous Course"
  },
  module: {
    backToRoadmap: "Back to Courses",
    progress: "Course Progress",
    lessons: "Lessons",
    startLesson: "Start Lesson",
    completed: "Completed",
    locked: "Locked"
  },
  lesson: {
    aiTutorTitle: "CodeFix AI Tutor",
    aiTutorPlaceholder: "Ask me anything about the lesson (e.g., 'Explain this tag', 'Why use that?')",
    aiTutorButton: "Ask AI",
    backToCurriculum: "Back to Course",
    nextLesson: "Next Lesson",
    finalChallenge: "Final Challenge 🏆",
    completed: "Lesson Completed!",
    markComplete: "Read carefully and complete tasks",
    markCompleteAction: "Mark Complete",
    requirementsNotMet: "Please complete the quizzes to finish.",
    loading: "Loading intelligent content...",
    openAi: "Open AI Tutor",
    readAloud: "Read Lesson",
    stopReading: "Stop Reading",
    voteTitle: "Was this lesson helpful?",
    voteUp: "Yes",
    voteDown: "No",
    feedbackTitle: "Help us improve",
    feedbackPlaceholder: "Tell us why you didn't like this lesson...",
    feedbackSend: "Send Feedback",
    feedbackCancel: "Cancel",
    feedbackThanks: "Thanks for your feedback!"
  },
  challenge: {
    title: "Final Challenge",
    description: "Prove your skills! Build the following using everything you've learned.",
    task: "Mission Brief",
    runTests: "Submit & Verify",
    success: "Mission Accomplished! You are amazing! 🎉",
    failure: "Not quite there. Check the requirements and try again.",
    backToModule: "Finish Course"
  },
  practice: {
    title: "Practice Zone",
    runCode: "Run Code",
    runAll: "Run All Code",
    showSolution: "Show Solution",
    hideSolution: "Hide Solution",
    quizCorrect: "Correct! 🎉",
    quizIncorrect: "Try Again 😕",
    check: "Check Answer",
    yourCode: "Your Code",
    preview: "Live Preview"
  }
};

export const he: TranslationStructure = {
  nav: {
    home: "ראשי",
    curriculum: "הקורסים",
    about: "אודות",
    contact: "צור קשר",
    getStarted: "בואו נתחיל",
    language: "עברית",
    login: "התחבר",
    logout: "התנתק",
    profile: "הפרופיל שלי",
    admin: "אזור ניהול"
  },
  admin: {
    title: "דשבורד ניהול",
    tabs: {
        messages: "הודעות צור קשר",
        feedback: "משובי דיסלייק"
    },
    table: {
        date: "תאריך",
        name: "שם",
        email: "אימייל",
        subject: "נושא",
        message: "הודעה",
        lessonId: "מס' שיעור",
        feedback: "סיבת המשוב"
    },
    empty: "לא נמצאו רשומות.",
    accessDenied: "הגישה למנהלים בלבד."
  },
  auth: {
    guestWarningTitle: "אתה גולש במצב אורח",
    guestWarningDesc: "ההתקדמות שלך לא נשמרת! כדי לסנכרן את הלמידה ולשמור על ההישגים, מומלץ להתחבר.",
    loginWithGoogle: "התחברות",
    loginSuccess: "איזה כיף שחזרת!",
    logoutSuccess: "התנתקת בהצלחה",
    loginTitle: "התחברות ל-CodeFix",
    loginSubtitle: "התחבר כדי לשמור את ההתקדמות שלך ולקבל גישה לכל הפיצ'רים"
  },
  profile: {
    title: "פרופיל משתמש",
    progressTitle: "ההתקדמות שלי",
    deleteLesson: "מחק התקדמות",
    resetAll: "אפס את כל הקורסים",
    resetConfirm: "האם אתה בטוח? פעולה זו לא ניתנת לביטול.",
    noProgress: "טרם השלמת שיעורים. זה הזמן להתחיל!",
    hello: "שלום",
    adminMode: "מצב מפתח (God Mode)",
    adminModeDesc: "פתח את כל התוכן לבדיקה"
  },
  hero: {
    titlePrefix: "הופכים למאסטרים ב-Web",
    titleHighlight: "מאפס למאה",
    subtitle: "הדרך הכי כיפית, מודרנית ופשוטה ללמוד תכנות. בלי מילים מסובכות, רק תכל'ס ידע ופרקטיקה. הקריירה החדשה שלכם מתחילה כאן.",
    ctaPrimary: "יאללה, מתחילים ללמוד",
    ctaSecondary: "מה תלמדו באתר?",
    stats_students: "תלמידים רשומים",
    stats_lessons: "שיעורים",
    stats_rating: "לייקים מהקהילה"
  },
  about: {
    title: "ממציאים מחדש את לימוד התכנות",
    subtitle: "CodeFix הוא לא סתם עוד אתר מדריכים. זו פלטפורמה שנבנתה כדי להפוך אתכם למתכנתים אמיתיים, לא רק לקוראים פסיביים.",
    features: {
      interactiveTitle: "100% אינטראקטיבי",
      interactiveDesc: "די לסרטונים משעממים. כאן אתם כותבים קוד, שוברים דברים ומתקנים אותם בזמן אמת בתוך הדפדפן.",
      aiTitle: "חונך אישי מבוסס AI",
      aiDesc: "נתקעתם? הבינה המלאכותית שלנו (מבוססת Gemini) זמינה 24/7 בתוך כל שיעור כדי להסביר מושגים ולעזור לכם לדבג.",
      practicalTitle: "מבוסס פרויקטים",
      practicalDesc: "תיאוריה זה נחמד, אבל פרקטיקה זה החיים. כל קורס מסתיים באתגרים מהעולם האמיתי."
    },
    topicsTitle: "מה לומדים באתר?",
    topics: {
      htmlTitle: "מבנה עם HTML5",
      htmlDesc: "השלד של האינטרנט. נלמד תגיות, סמנטיקה, נגישות ומבנה נכון של עמודים.",
      cssTitle: "עיצוב עם CSS3",
      cssDesc: "הופכים את האתר ליפהפה. שליטה ב-Flexbox, Grid, אנימציות ועיצוב רספונסיבי.",
      jsTitle: "לוגיקה עם JavaScript",
      jsDesc: "המוח של האתר. משתנים, פונקציות, לולאות ושינוי התוכן בזמן אמת.",
      reactTitle: "אפליקציות עם React",
      reactDesc: "פיתוח אפליקציות מודרניות ומורכבות באמצעות קומפוננטות, Hooks וניהול State."
    },
    philosophyTitle: "השיטה שלנו",
    philosophyContent: "אנחנו מאמינים שתכנות צריך להיות נגיש לכולם. הדרך המסורתית - צפייה בשעות של הרצאות וידאו - מיושנת. ב-CodeFix אנחנו מתמקדים ב'למידה דרך עשייה'. הסרנו את המילים האקדמיות המפחידות ואנחנו מתמקדים בכישורים שבאמת יעזרו לכם למצוא עבודה.",
    cta: "מוכנים להתחיל את המסע?"
  },
  contact: {
    title: "דברו איתנו",
    subtitle: "יש לכם שאלה, הצעה או סתם רוצים להגיד היי? אנחנו כאן כדי להקשיב.",
    form: {
      name: "שם מלא",
      email: "כתובת אימייל",
      subject: "נושא הפנייה",
      message: "תוכן ההודעה",
      send: "שלח הודעה",
      sending: "שולח...",
      successTitle: "ההודעה נשלחה!",
      successDesc: "תודה שפנית אלינו. נחזור אליך בהקדם האפשרי.",
      errorTitle: "אופס!",
      errorDesc: "משהו השתבש בשליחת ההודעה. נסה שוב מאוחר יותר.",
      sendAnother: "שלח הודעה נוספת"
    }
  },
  curriculum: {
    title: "הקורסים שלנו",
    subtitle: "מסלול צעד-אחר-צעד: משורת הקוד הראשונה ב-HTML ועד בניית אפליקציות מלאות ומתקדמות.",
    modules: {
      basics: "יסודות האינטרנט ו-HTML",
      css: "עיצוב וסטייל עם CSS",
      js: "תכנות ולוגיקה עם JavaScript",
      react: "בניית ממשקים עם React",
      backend: "צד שרת ו-Node.js"
    },
    levels: {
      beginner: "מתחילים",
      intermediate: "בינוני",
      advanced: "מתקדמים"
    },
    startModule: "התחל קורס",
    continueModule: "המשך קורס",
    locked: "יש לסיים את הקורס הקודם"
  },
  module: {
    backToRoadmap: "חזרה לרשימת הקורסים",
    progress: "התקדמות בקורס",
    lessons: "שיעורי הקורס",
    startLesson: "התחל שיעור",
    completed: "הושלם בהצלחה",
    locked: "טרם נפתח"
  },
  lesson: {
    aiTutorTitle: "החונך האישי (AI)",
    aiTutorPlaceholder: "אני כאן לכל שאלה על השיעור (למשל: 'מה זה תגית?', 'הסבר לי שוב')",
    aiTutorButton: "שלח שאלה",
    backToCurriculum: "חזרה לקורס",
    nextLesson: "לשיעור הבא",
    finalChallenge: "אתגר הסיום 🏆",
    completed: "סיימתי את השיעור!",
    markComplete: "קרא בעיון וסיים את המטלות",
    markCompleteAction: "סמן כהושלם",
    requirementsNotMet: "עליך לענות נכונה על החידון כדי לסיים.",
    loading: "מכין תשובה חכמה...",
    openAi: "פתח צ'אט AI",
    readAloud: "הקרא שיעור",
    stopReading: "עצור הקראה",
    voteTitle: "השיעור עזר לך?",
    voteUp: "לייק",
    voteDown: "דיסלייק",
    feedbackTitle: "איך נוכל להשתפר?",
    feedbackPlaceholder: "ספר לנו מה לא אהבת בשיעור...",
    feedbackSend: "שלח משוב",
    feedbackCancel: "ביטול",
    feedbackThanks: "תודה על המשוב!"
  },
  challenge: {
    title: "אתגר הסיום",
    description: "זה הזמן להוכיח שלמדתם! בנו את המבנה הבא באמצעות כל התגיות שלמדתם.",
    task: "משימה לביצוע",
    runTests: "הגש ובדוק",
    success: "משימה הושלמה! אתה פשוט אלוף! 🎉",
    failure: "עדיין לא שם. בדוק את הדרישות ונסה שוב.",
    backToModule: "סיים קורס בהצלחה"
  },
  practice: {
    title: "המעבדה - אזור תרגול",
    runCode: "הרץ קוד",
    runAll: "הרץ הכל",
    showSolution: "גלה לי את התשובה",
    hideSolution: "הסתר פתרון",
    quizCorrect: "בול! כל הכבוד 🎉",
    quizIncorrect: "לא בדיוק, נסה שוב 😕",
    check: "בדוק תשובה",
    yourCode: "הקוד שלך",
    preview: "תוצאה חיה"
  }
};
