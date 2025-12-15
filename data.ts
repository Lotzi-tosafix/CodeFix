
import { TranslationStructure, Module, Lesson, Language, PracticeItem, Challenge } from './types';

// Curriculum structure based on Full Stack Web Development flow
export const getCourseData = (t: TranslationStructure, lang: Language): Module[] => {
  const isHe = lang === 'he';

  return [
    {
      id: 'm1',
      titleKey: 'basics',
      levelKey: 'beginner',
      icon: 'globe',
      description: isHe 
        ? "מתחילים כאן! מבינים איך האינטרנט עובד ולומדים את שפת הבסיס של כל אתר: HTML. נלמד על תגיות, מבנה נכון וסמנטיקה."
        : "Start here! Learn the building blocks of the web: HTML tags, structure, and semantic elements.",
      locked: false,
      finalChallenge: {
        id: 'ch_html',
        title: isHe ? 'בניית דף פרופיל אישי' : 'Build a Personal Profile Page',
        description: isHe 
           ? `המשימה שלך היא לבנות דף פרופיל אישי ('כרטיס ביקור' דיגיטלי). 
           
הדף צריך לכלול את המרכיבים הבאים לפי הסדר:
1. כותרת ראשית (h1) עם השם שלך.
2. תמונה שלך (או תמונה לדוגמה מהאינטרנט) עם טקסט חלופי (alt) מתאים.
3. כותרת משנית (h2) עם הטקסט "קצת עליי".
4. פסקה (p) עם תיאור קצר, כאשר מילה אחת לפחות בתוכה חייבת להיות מודגשת (strong).
5. רשימה (ul או ol) של לפחות 3 תחביבים או דברים שאת/ה אוהב/ת.
6. בתחתית, קישור (a) לאתר חיצוני (כמו גוגל או גיטהאב) שנפתח בלשונית חדשה.`
           : `Your mission is to build a personal profile page (Digital Business Card).

The page must include the following elements in order:
1. A main heading (h1) with your name.
2. An image (img) with proper alt text.
3. A sub-heading (h2) saying "About Me".
4. A paragraph (p) with a short bio, where at least one word is bold (strong).
5. A list (ul or ol) of at least 3 hobbies.
6. A link (a) to an external site that opens in a new tab.`,
        initialCode: isHe ? '<!-- כתוב את הקוד שלך כאן -->\n' : '<!-- Write your code here -->\n',
        solutionCode: '',
        language: 'html',
        validation: (code: string) => {
           // Basic validation checks
           const hasH1 = /<h1[^>]*>/.test(code);
           const hasH2 = /<h2[^>]*>/.test(code);
           const hasImg = /<img[^>]+src=["'][^"']*["'][^>]*>/.test(code);
           const hasPara = /<p[^>]*>/.test(code);
           const hasStrong = /<strong[^>]*>/.test(code);
           const hasList = /(<ul[^>]*>|<ol[^>]*>)/.test(code) && /<li[^>]*>/.test(code);
           const hasLink = /<a[^>]+href=["'][^"']*["']/.test(code);
           
           return hasH1 && hasH2 && hasImg && hasPara && hasStrong && hasList && hasLink;
        }
      },
      lessons: [
        { 
          id: 'web-intro', 
          title: isHe ? '1. איך האינטרנט עובד?' : '1. How the Web Works', 
          description: isHe ? 'לפני שכותבים קוד: מהו שרת? מה תפקיד הדפדפן? וההבדל בין HTML, CSS ו-JS.' : 'The Big Picture: Browsers, Servers, and the three pillars of Web Development.', 
          content: '' 
        },
        { 
          id: 'html-intro', 
          title: isHe ? '2. המבנה הבסיסי והתגיות' : '2. HTML Structure & Tags', 
          description: isHe ? 'יורדים לפרטים: מה זה "תגית"? ממה היא מורכבת? ואיך בונים את השלד של הדף.' : 'Deep dive: What is a "Tag"? Anatomy of an element and the page skeleton.', 
          content: '' 
        },
        { 
          id: 'html-syntax', 
          title: isHe ? '3. המילון: סימנים ותחביר' : '3. Syntax & Symbols Dictionary', 
          description: isHe ? 'מה אומר כל סימן במקלדת? הסבר מעמיק על <, >, /, = וגרשיים.' : 'Decoding the symbols: What do <, >, /, =, and quotes actually mean?', 
          content: '' 
        },
        { 
          id: 'html-structure', 
          title: isHe ? '4. קינון והזחה (Nesting)' : '4. Nesting & Indentation', 
          description: isHe ? 'הסוד לקוד נקי: למה עושים רווחים (Tab)? ומה זה "אבא ובן"?' : 'Clean code secrets: Why indent? Parent/Child relationships explained.', 
          content: '' 
        },
        { 
          id: 'html-comments', 
          title: isHe ? '5. הערות בקוד (Comments)' : '5. HTML Comments', 
          description: isHe ? 'איך לכתוב טקסט שהדפדפן מתעלם ממנו? הודעות למתכנתים.' : 'Writing notes that the browser ignores.', 
          content: '' 
        },
        { 
          id: 'html-text', 
          title: isHe ? '6. עיצוב טקסט וכותרות' : '6. Text Formatting Tags', 
          description: isHe ? 'היררכיה נכונה של כותרות (H1-H6) ועיצוב סמנטי.' : 'Correct hierarchy (H1-H6) and semantic styling.', 
          content: '' 
        },
        { 
          id: 'html-links', 
          title: isHe ? '7. קישורים (Links)' : '7. Links & Anchors', 
          description: isHe ? 'הסוד של האינטרנט: לחבר דפים אחד לשני באמצעות לינקים.' : 'Connect webpages together using hyperlinks and attributes.', 
          content: '' 
        },
        { 
          id: 'html-images', 
          title: isHe ? '8. תמונות ומדיה' : '8. Images & Attributes', 
          description: isHe ? 'מוסיפים צבע לחיים: איך מטמיעים תמונות ומגדירים להן תכונות.' : 'Embed images and learn about the src and alt attributes.', 
          content: '' 
        },
        { 
          id: 'html-lists', 
          title: isHe ? '9. רשימות (Lists)' : '9. Lists (Ordered & Unordered)', 
          description: isHe ? 'מסדרים את התוכן בצורה נקייה עם רשימות מסודרות ולא מסודרות.' : 'Organize content with bullet points and numbered lists.', 
          content: '' 
        },
        { 
          id: 'html-forms', 
          title: isHe ? '10. טפסים וקלט' : '10. Forms & Inputs', 
          description: isHe ? 'יוצרים אינטראקציה: איך בונים טופס הרשמה ואוספים מידע מהמשתמש.' : 'Create interactive forms to collect user data.', 
          content: '' 
        },
      ]
    },
    {
      id: 'm2',
      titleKey: 'css',
      levelKey: 'beginner',
      icon: 'palette',
      description: isHe
        ? "הופכים את האתר ליפהפה. לומדים לעצב, להוסיף צבעים, מרווחים, ולבנות לייאאוט מודרני."
        : "Make it beautiful. Master styling, colors, the box model, and modern layouts like Flexbox.",
      locked: false,
      lessons: [
        { 
          id: 'css-intro', 
          title: isHe ? '1. תחביר CSS ובחירת אלמנטים' : '1. CSS Syntax & Selectors', 
          description: isHe ? 'איך בוחרים אלמנטים בדף ומשנים להם את העיצוב.' : 'Learn how to target HTML elements and apply styles.', 
          content: '' 
        },
        { 
          id: 'css-colors', 
          title: isHe ? '2. עולם הצבעים והרקעים' : '2. Colors & Backgrounds', 
          description: isHe ? 'עבודה עם קודי צבע (HEX/RGB) ועיצוב רקעים מרשימים.' : 'Work with HEX, RGB, and named colors to style backgrounds and text.', 
          content: '' 
        },
        { 
          id: 'css-boxmodel', 
          title: isHe ? '3. מודל הקופסה (Box Model)' : '3. The Box Model', 
          description: isHe ? 'הבסיס של העיצוב: שוליים פנימיים (Padding), חיצוניים (Margin) ומסגרות.' : 'Understand padding, margin, border, and content flow.', 
          content: '' 
        },
        { 
          id: 'css-flexbox', 
          title: isHe ? '4. סידור עם Flexbox' : '4. Flexbox Layout', 
          description: isHe ? 'השיטה המודרנית והקלה לסידור אלמנטים בשורות ועמודות.' : 'The modern way to align elements in rows and columns.', 
          content: '' 
        },
        { 
          id: 'css-grid', 
          title: isHe ? '5. רשתות עם CSS Grid' : '5. CSS Grid Basics', 
          description: isHe ? 'בניית מבנים מורכבים ורספונסיביים בקלות.' : 'Create complex 2-dimensional layouts with ease.', 
          content: '' 
        }
      ]
    },
    {
      id: 'm3',
      titleKey: 'js',
      levelKey: 'intermediate',
      icon: 'code',
      description: isHe
        ? "המוח של האתר. לומדים לתכנת באמת: משתנים, לוגיקה, לולאות ואיך להפוך את האתר לדינמי וחי."
        : "The brain of the website. Learn variables, loops, functions, and DOM manipulation.",
      locked: false,
      lessons: [
        { 
          id: 'js-intro', 
          title: isHe ? '1. מבוא ל-JavaScript' : '1. JavaScript Basics', 
          description: isHe ? 'כותבים את הסקריפט הראשון ומדפיסים הודעות לקונסול.' : 'Write your first script and output to the console.', 
          content: '' 
        },
        { 
          id: 'js-variables', 
          title: isHe ? '2. משתנים וסוגי מידע' : '2. Variables & Data Types', 
          description: isHe ? 'איך שומרים מידע בזיכרון המחשב ועובדים איתו.' : 'Store and manipulate data using let, const, and var.', 
          content: '' 
        },
        { 
          id: 'js-operators', 
          title: isHe ? '3. אופרטורים ולוגיקה' : '3. Operators & Logic', 
          description: isHe ? 'חישובים מתמטיים והשוואות לוגיות בקוד.' : 'Perform math and logical operations in code.', 
          content: '' 
        },
        { 
          id: 'js-conditions', 
          title: isHe ? '4. תנאים (If/Else)' : '4. Conditional Statements', 
          description: isHe ? 'מלמדים את המחשב לקבל החלטות על סמך מידע.' : 'Control the flow of your program with If/Else logic.', 
          content: '' 
        },
        { 
          id: 'js-loops', 
          title: isHe ? '5. לולאות (Loops)' : '5. Loops (For, While)', 
          description: isHe ? 'איך לגרום למחשב לחזור על פעולות שוב ושוב ביעילות.' : 'Repeat actions efficiently using loops.', 
          content: '' 
        },
        { 
          id: 'js-functions', 
          title: isHe ? '6. פונקציות' : '6. Functions', 
          description: isHe ? 'שימוש חוזר בקוד וארגון נכון של התוכנית.' : 'Create reusable blocks of code.', 
          content: '' 
        },
        { 
          id: 'js-dom', 
          title: isHe ? '7. שינוי האתר (DOM)' : '7. DOM Manipulation', 
          description: isHe ? 'הקסם האמיתי: שינוי האלמנטים במסך בזמן אמת באמצעות קוד.' : 'Change HTML and CSS dynamically using JavaScript.', 
          content: '' 
        }
      ]
    },
    {
      id: 'm4',
      titleKey: 'react',
      levelKey: 'intermediate',
      icon: 'cpu',
      description: isHe 
        ? "פיתוח מודרני מתקדם. קומפוננטות, ניהול מצב (State), ושימוש בספרייה הפופולרית בעולם."
        : "Modern UI development. Components, State, Hooks and the Virtual DOM.",
      locked: true,
      lessons: []
    },
    {
      id: 'm5',
      titleKey: 'backend',
      levelKey: 'advanced',
      icon: 'database',
      description: isHe 
        ? "מה קורה מאחורי הקלעים? שרתים, מסדי נתונים וחיבור האתר לעולם האמיתי."
        : "Server-side programming. Node.js, Express, Databases and API integration.",
      locked: true,
      lessons: []
    }
  ];
};

// Content Dictionary with Practice Items (unchanged part)
const lessonContentHe: Record<string, {title: string, content: string, practice?: PracticeItem[]}> = {
  'web-intro': {
    title: 'איך האינטרנט עובד?',
    content: `
# לפני שכותבים שורת קוד אחת...

אנחנו רגילים להיכנס לאתרים כמו פייסבוק, גוגל או יוטיוב, אבל מה באמת קורה ברגע שאנחנו לוחצים \`Enter\`? כדי להיות מפתחים טובים, אנחנו חייבים להבין את "מאחורי הקלעים".

## דפדפן, שרת ומה שביניהם

כדי להבין את זה, נשתמש באנלוגיה של מסעדה:

1.  **הלקוח (Client):** זה אתם, או ליתר דיוק – המחשב שלכם. אתם יושבים ליד השולחן ומבקשים מנה מהתפריט (למשל: "אני רוצה לראות את דף הבית של ynet").
2.  **המלצר (הדפדפן / Browser):** הדפדפן (Chrome, Safari, Edge) הוא המתווך. הוא לוקח את הבקשה שלכם, ורץ למטבח להביא אותה. הוא יודע לדבר עם המטבח בשפה מיוחדת (HTTP).
3.  **המטבח (השרת / Server):** במקום מרוחק בעולם יושב מחשב חזק שפועל 24/7 ונקרא "שרת". הוא מאחסן את כל הקבצים של האתר. כשהמלצר מבקש, הוא מכין את המנה (דפי האינטרנט, התמונות, המידע) ושולח אותה חזרה.

כשהמלצר (הדפדפן) מגיע אליכם לשולחן, הוא לא זורק עליכם שק קמח וקרטון ביצים (הקוד הגולמי). הוא מגיש לכם **פיצה מוכנה ויפה** (האתר הוויזואלי).
בדיוק כך עובד הדפדפן: הוא מקבל מהשרת **קוד טקסטואלי**, קורא אותו במהירות עצומה, ו"מצייר" לכם על המסך כפתורים, תמונות וצבעים.

## שלושת עמודי התווך של בניית אתרים

כל אתר אינטרנט מודרני מורכב משלוש שפות עיקריות. נשתמש ב"משל גוף האדם" כדי להבין אותן:

### 1. HTML - השלד (The Skeleton) 🦴
זהו הבסיס המבני.
בלי שלד, הגוף היה נופל לרצפה כמו שקית ג'לי. ה-HTML מגדיר **מה יש בדף**:
*   "כאן תהיה כותרת"
*   "כאן תהיה פסקה"
*   "כאן תהיה תמונה"
ה-HTML לא קובע איך הדברים ייראו (צבע, גודל), אלא רק שהם **קיימים**.

### 2. CSS - העור והבגדים (The Skin & Style) 🎨
זהו העיצוב.
אחרי שיש לנו שלד, אנחנו רוצים שהוא ייראה טוב. ה-CSS אחראי על הניראות:
*   "הכותרת תהיה בצבע כחול"
*   "הרקע יהיה ורוד"
*   "התמונה תהיה עגולה"
בלי CSS, כל האתרים היו נראים כמו מסמכי וורד שחור-לבן משעממים.

### 3. JavaScript - המוח והשרירים (The Brain) 🧠
זוהי ההתנהגות והאינטראקציה.
גוף יפה ושלד חזק זה נחמד, אבל אנחנו רוצים לזוז! ה-JS גורם לדברים לקרות:
*   "מה קורה כשלוחצים על הכפתור?"
*   "איך בודקים אם הסיסמה שהוזנה נכונה?"
*   "איך מציגים הודעה קופצת?"

> **בקורס הזה נלמד את שלוש השפות הללו לפי הסדר: קודם נבנה שלד (HTML), אחר כך נעצב אותו (CSS), ובסוף נפיח בו חיים (JS).**
    `,
    practice: [
      {
        type: 'quiz',
        id: 'q_intro_1',
        question: 'אם ה-HTML הוא השלד של האתר, מהו תפקידו של ה-CSS?',
        options: ['להיות המוח וההיגיון של האתר', 'להיות העיצוב, הצבעים והנראות (העור/בגדים)', 'להיות השרת שמאחסן את הקבצים'],
        correctAnswer: 1,
        explanation: 'CSS (Cascading Style Sheets) אחראי אך ורק על העיצוב והנראות.'
      },
      {
        type: 'quiz',
        id: 'q_intro_2',
        question: 'מהו תפקידו העיקרי של הדפדפן (כמו Chrome)?',
        options: ['לאחסן את כל המידע של האינטרנט כדי שלא יאבד', 'לקבל קוד מהשרת ולתרגם אותו לתצוגה ויזואלית עבור המשתמש', 'לכתוב את הקוד של האתר באופן אוטומטי'],
        correctAnswer: 1, // Swapped options
        explanation: 'הדפדפן הוא "המנוע" שלוקח קוד טקסטואלי והופך אותו לאתר שאפשר לראות ולהשתמש בו.'
      }
    ]
  },
  'html-intro': {
    title: 'המבנה הבסיסי והתגיות',
    content: `
# מה זה בכלל HTML?

אז הבנו ש-HTML הוא השלד. אבל איך כותבים שלד?
HTML היא לא "שפת תכנות" במובן הקלאסי (אין בה חישובים מתמטיים). היא **שפת תגיות** (Markup Language).

## מהי תגית (Tag)?

תגית היא **פקודה** שאנחנו נותנים לדפדפן.
תחשבו על זה ככה: כשהדפדפן קורא את הטקסט, הוא קורא רגיל. אבל כשהוא רואה **סוגריים משולשים** \`<\` ו-\`>\`, הוא יודע: "אופס! פה יש הוראה בשבילי!".

המבנה של תגית נראה תמיד ככה:
1.  סימן "קטן מ" (\`<\`)
2.  שם התגית (למשל \`button\`)
3.  סימן "גדול מ" (\`>\`)

יחד זה נראה ככה: \`<button>\`. זוהי **תגית פתיחה**. היא אומרת לדפדפן: "מעכשיו, תתחיל לצייר כפתור".

## אלמנט (Element) - השלם הגדול מסך חלקיו

כדי ליצור רכיב שלם (למשל, כפתור עם טקסט בתוכו), אנחנו צריכים **אלמנט**.
אלמנט מורכב מ"סנדוויץ'" של שלושה חלקים:

1.  **תגית פתיחה (Opening Tag):** \`<button>\`
    זה הסימון איפה האלמנט מתחיל.
2.  **התוכן (Content):** \`לחץ עליי\`
    זה הטקסט או המידע שנמצא *בתוך* האלמנט. זה מה שהמשתמש יראה.
3.  **תגית סגירה (Closing Tag):** \`</button>\`
    זה הסימון איפה האלמנט נגמר.
    **חשוב מאוד:** שימו לב לסימן הלוכסן \`/\` (Slash) שיש בתגית הסגירה. זה מה שמבדיל אותה מתגית הפתיחה. בלי זה, הדפדפן יחשוב שהכפתור ממשיך לנצח!

### דוגמאות נוספות:

**כותרת (Heading):**
\`\`\`html
<h1>אני כותרת ראשית</h1>
\`\`\`
הדפדפן רואה \`h1\`, מבין שזו כותרת ענקית, ומציג את הטקסט "אני כותרת ראשית" בגדול ובמודגש.

**פסקה (Paragraph):**
\`\`\`html
<p>אני סתם טקסט רגיל באתר.</p>
\`\`\`
הדפדפן רואה \`p\`, ומציג את הטקסט כפסקה רגילה.

## מבנה מסמך תקני (Boilerplate)

כל דף אינטרנט בעולם, פשוט או מורכב, מתחיל באותו מבנה קבוע בדיוק. זהו "השלד של השלד".

\`\`\`html
<!DOCTYPE html>        <!-- הצהרה: זהו מסמך HTML מודרני -->
<html>                 <!-- השורש: הכל נמצא בתוך התגית הזו -->
  <head>
    <!-- הראש: כאן יש הגדרות שלא רואים על המסך (כמו שם האתר בלשונית למעלה) -->
  </head>
  <body>
    <!-- הגוף: כאן נמצא כל מה שרואים! כותרות, תמונות, כפתורים -->
    <h1>שלום עולם!</h1>
  </body>
</html>
\`\`\`

שימו לב להפרדה בין \`head\` ל-\`body\`. זה כמו אדם: בראש יש את המחשבות וההגדרות, ובגוף יש את מה שרואים כלפי חוץ.
    `,
    practice: [
      {
        type: 'quiz',
        id: 'q1',
        question: 'מהו ההבדל הוויזואלי בקוד בין תגית פתיחה לתגית סגירה?',
        options: ['תגית פתיחה נכתבת באותיות גדולות (CAPS)', 'אין הבדל, הן נראות אותו דבר', 'בתגית סגירה יש לוכסן (/) לפני שם התגית'],
        correctAnswer: 2, // Changed order
        explanation: 'תגית סגירה תמיד מכילה לוכסן. למשל: </button>. זה הסימן לדפדפן להבין שהאלמנט נגמר.'
      },
      {
        type: 'code',
        id: 'c1',
        title: 'כתוב את האלמנט הראשון שלך',
        language: 'html',
        description: 'כתוב אלמנט כפתור (`button`) שלם. התחל בתגית פתיחה, כתוב בפנים "התחל", וסיים בתגית סגירה.',
        initialCode: '<!-- כתוב את הקוד שלך כאן -->\n',
        solution: '<button>התחל</button>'
      }
    ]
  },
  'html-syntax': {
    title: 'המילון: סימנים ותחביר',
    content: `
# בואו נעשה סדר במקלדת

תלמידים רבים מתבלבלים בתחילת הדרך מהסימנים המיוחדים.
בשיעור הזה נלמד את "חוקי הדקדוק" של HTML בצורה פשוטה. המטרה היא להבין את **ההיגיון** מאחורי הסימנים.

## 1. הסוגריים המשולשים: \`< >\` (הפקודה)

כל פקודה ב-HTML ("תגית") עטופה בסימנים האלו. הם אומרים לדפדפן: "זה לא סתם טקסט לקריאה, זו הוראה לביצוע!".

*   \`<\` מסמן: **"תתחיל פקודה"**.
*   \`>\` מסמן: **"סיימתי את כתיבת הפקודה"**.

**דוגמה:** \`<button>\` (הדפדפן מבין שעליו ליצור כפתור).

## 2. הלוכסן: \`/\` (העצור)

הסימן הזה אומר לדפדפן שאלמנט מסוים **נגמר**.
הוא תמיד מופיע בתגית הסגירה, מיד אחרי ה-\`<\`.

**דוגמה:**
\`<button>\` (התחלה: צור כפתור)
\`</button>\` (סוף: כאן נגמר הכפתור)

## 3. השווה: \`=\` (הגדרות נוספות)

לפעמים הפקודה הבסיסית (כמו "צור כפתור") לא מספיקה. אנחנו רוצים לתת לה **הגדרות נוס