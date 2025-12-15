
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

כל אתר אינטרנט מודרני מורכב משלוש שxxx xxxxxxx. xxxxx x"xxx xxx xxxx" xxx xxxxx xxxx:

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

## 3. השווה: \`=\` (ההגדרה)

לפעמים הפקודה הבסיסית (כמו "צור כפתור") לא מספיקה. אנחנו רוצים לתת לה **הגדרות נוספות** (תכונות).
תחשבו על זה כמו הזמנת פיצה. להגיד "פיצה" זה לא מספיק. צריך להגיד:
**תוספת = זיתים**

ב-HTML זה עובד בדיוק אותו דבר. הסימן \`=\` מחבר בין **שם התכונה** לבין **הערך** שלה.

**דוגמה:**
\`\`\`html
<html dir="rtl">
\`\`\`
כאן אמרנו לדפדפן: לגבי האלמנט \`html\`, התכונה \`dir\` (כיוון טקסט) שווה ל-\`rtl\` (ימין לשמאל).
אל תדאגו לגבי שמות התכונות כרגע, נלמד עליהן בהמשך. רק תזכרו את המבנה: \`שם="ערך"\`.

## 4. הגרשיים: \`"..."\` (האריזה)

מתי צריך לשים גרשיים ומתי לא? זה הכלל:

### מתי כן? בתוך התגית (הגדרות טכניות)
כשאנחנו נותנים ערך לתכונה (כמו בדוגמה למעלה עם \`rtl\`), אנחנו חייבים לעטוף אותו בגרשיים.
למה? כדי שהדפדפן יידע בדיוק איפה הערך מתחיל ואיפה הוא נגמר. זה כמו "לארוז" את המידע בקופסה כדי שלא יתפזר.

### מתי לא? בתוכן (מה שרואים במסך)
הטקסט שהמשתמש רואה על המסך (למשל, המילה "שלח" על כפתור) נמצא **בין** תגית הפתיחה לתגית הסגירה.
שם **לא צריך גרשיים**, כי התגיות עצמן (\`>\` ו-\`<\`) כבר מסמנות את הגבולות.

**השוואה ברורה:**

\`\`\`html
<!-- נכון: הגדרה טכנית עם גרשיים, תוכן בלי גרשיים -->
<button dir="rtl">לחץ כאן</button>

<!-- לא נכון: אל תשימו גרשיים על התוכן! -->
<button>"לחץ כאן"</button> 
\`\`\`

בדוגמה השנייה, המשתמש יראה כפתור שכתוב עליו **"לחץ כאן"** (עם הגרשיים), וזה בדרך כלל לא מה שאנחנו רוצים.
    `,
    practice: [
      {
        type: 'quiz',
        id: 'q_syn_1',
        question: 'מה תפקיד הסימן "=" (שווה) בתוך תגית?',
        options: ['לבצע חישוב מתמטי', 'לחבר בין שם של תכונה לערך שלה (הגדרה)', 'לסיים את התגית'],
        correctAnswer: 1,
        explanation: 'הסימן שווה משייך ערך לתכונה. למשל: dir="rtl" (הכיוון הוא ימין-לשמאל).'
      },
      {
        type: 'quiz',
        id: 'q_syn_2',
        question: 'היכן **לא** צריך להשתמש בגרשיים ("...")?',
        options: ['כאשר כותבים את התוכן שיופיע על המסך (בין התגיות)', 'כאשר מגדירים ערך לתכונה בתוך תגית הפתיחה', 'תמיד חייבים להשתמש בגרשיים'],
        correctAnswer: 0,
        explanation: 'התוכן שנמצא בין התגיות (למשל המילה "שלום" ב-<h1>שלום</h1>) הוא טקסט חופשי ולא דורש גרשיים.'
      }
    ]
  },
  'html-structure': {
    title: 'קינון והזחה (Nesting)',
    content: `
# הורים וילדים: עץ האלמנטים

אחד העקרונות הכי חשובים ב-HTML הוא היכולת לשים אלמנטים **בתוך** אלמנטים אחרים.
לזה אנחנו קוראים **קינון** (Nesting), כמו בובת בבושקה.

## אבא, אמא ובן

כאשר אלמנט נמצא בתוך אלמנט אחר, נוצר ביניהם קשר משפחתי:
*   האלמנט החיצוני נקרא **הורה** (Parent).
*   האלמנט הפנימי נקרא **ילד** (Child).

**דוגמה:**
\`\`\`html
<div>
  <button>לחץ עליי</button>
</div>
\`\`\`
כאן, ה-\`div\` הוא ההורה, וה-\`button\` הוא הילד שלו.

## הזחה (Indentation): הסוד לקוד קריא

שימו לב שבדוגמה למעלה, הכפתור לא מתחיל באותה שורה כמו ה-div, אלא זז קצת שמאלה (או ימינה, באנגלית).
לרווח הזה קוראים **הזחה** (Indentation).
אנחנו יוצרים אותו באמצעות מקש ה-\`Tab\` במקלדת.

**למה זה טוב?**
המחשב לא צריך את הרווחים האלה. הוא יבין את הקוד גם אם הכל יהיה בשורה אחת ארוכה.
אבל **בני אדם** צריכים את זה! ההזחה עוזרת לנו לראות בעיניים מי נמצא בתוך מי.

### חוקי ההזחה:
1.  כל פעם שפותחים תגית חדשה שיש לה תוכן מורכב, יורדים שורה ולוחצים \`Tab\`.
2.  כשסוגרים את התגית, חוזרים אחורה (מוחקים את ה-\`Tab\`).

**קוד לא מסודר (קשה לקריאה):**
\`\`\`html
<html><body><h1>כותרת</h1><p>פסקה</p></body></html>
\`\`\`

**אותו קוד בדיוק - מסודר (קל לקריאה):**
\`\`\`html
<html>
  <body>
    <h1>כותרת</h1>
    <p>פסקה</p>
  </body>
</html>
\`\`\`
    `,
    practice: [
      {
        type: 'quiz',
        id: 'q_struct_1',
        question: 'מהו המקש במקלדת שיוצר הזחה (רווח פנימה)?',
        options: ['Enter', 'Space', 'Tab'],
        correctAnswer: 2,
        explanation: 'מקש ה-Tab נועד ליצור הזחות ולסדר את הקוד במבנה היררכי.'
      },
      {
        type: 'code',
        id: 'c_struct_1',
        title: 'תקן את הקינון',
        language: 'html',
        description: 'הקוד הבא מבולגן. כתוב אותו מחדש עם הזחות נכונות: div בחוץ, ובתוכו button.',
        initialCode: '<div><button>לחץ</button></div>',
        solution: '<div>\n  <button>לחץ</button>\n</div>'
      }
    ]
  },
  'html-comments': {
    title: 'הערות בקוד (Comments)',
    content: `
# לדבר עם עצמנו (ועם מתכנתים אחרים)

לפעמים אנחנו רוצים לכתוב משהו בקובץ הקוד, אבל אנחנו **לא** רוצים שהמשתמש יראה את זה באתר.
למשל:
*   הסבר לעצמנו מה הקוד הזה עושה (כדי שלא נשכח בעוד חודש).
*   הודעה למתכנת אחר שעובד איתנו.
*   "ניטרול" זמני של שורת קוד בלי למחוק אותה.

לדבר הזה קוראים **הערה** (Comment).

## איך כותבים הערה?

הערה ב-HTML נראית קצת מוזר. היא מתחילה ב-\`<!--\` ומסתיימת ב-\`-->\`.

\`\`\`html
<!-- זוהי הערה. הדפדפן מתעלם ממנה לחלוטין -->
<h1>זה כן יופיע באתר</h1>
\`\`\`

כל מה שנמצא בין הסימנים האלו פשוט הופך ל"אוויר" מבחינת הדפדפן. הוא מדלג עליו וממשיך הלאה.

### שימוש נפוץ: ארגון הקוד

באתרים גדולים, נהוג להשתמש בהערות כדי לסמן אזורים שונים בדף:

\`\`\`html
<!-- תפריט ראשי -->
<nav>...</nav>

<!-- תוכן מרכזי -->
<main>...</main>

<!-- חלק תחתון -->
<footer>...</footer>
\`\`\`
    `,
    practice: [
      {
        type: 'quiz',
        id: 'q_comm_1',
        question: 'מה קורה לטקסט שנכתב בתוך הערה?',
        options: ['הוא מופיע באתר בצבע אפור', 'הוא מופיע רק למנהלי האתר', 'הדפדפן מתעלם ממנו והוא לא מופיע למשתמש'],
        correctAnswer: 2,
        explanation: 'הערות נועדו למתכנתים בלבד (תיעוד) והדפדפן לא מציג אותן.'
      },
      {
        type: 'code',
        id: 'c_comm_1',
        title: 'הסתר את הסוד',
        language: 'html',
        description: 'יש כאן כותרת ופסקה עם סיסמה סודית. הפוך את הפסקה להערה כדי שלא יראו אותה.',
        initialCode: '<h1>ברוכים הבאים</h1>\n<p>הסיסמה היא: 123456</p>',
        solution: '<h1>ברוכים הבאים</h1>\n<!-- <p>הסיסמה היא: 123456</p> -->'
      }
    ]
  },
  'html-text': {
    title: 'עיצוב טקסט וכותרות',
    content: `
# המלך של התוכן: הטקסט

רוב האינטרנט הוא טקסט. לכן, ל-HTML יש המון תגיות שנועדו לטפל בטקסט.
בואו נכיר את החשובות שבהן.

## כותרות (Headings): מ-H1 ועד H6

ישנן 6 רמות של כותרות ב-HTML.
*   \`<h1>\`: הכותרת הראשית והחשובה ביותר בדף (כמו שם הספר). צריכה להופיע רק פעם אחת בדף!
*   \`<h2>\`: כותרות משנה (כמו שמות של פרקים).
*   \`<h3>\`: תתי-כותרות.
*   ... וכך הלאה עד \`<h6>\` (הכי קטנה).

**חשוב:** אל תבחרו כותרת רק בגלל הגודל שלה! בחרו אותה בגלל ה**חשיבות** שלה. (את הגודל נשנה אחר כך עם CSS). מנועי חיפוש כמו גוגל מסתמכים על זה כדי להבין על מה האתר מדבר.

## פסקה (Paragraph): התגית P

רוב הטקסט הרגיל באתר (כמו מה שאתם קוראים עכשיו) נמצא בתוך תגית \`<p>\`.
היא יוצרת רווח אוטומטי לפני ואחרי הטקסט, כדי שיהיה נוח לקריאה.

## הדגשות: Strong ו-EM

איך גורמים למילה מסוימת לבלוט?

*   \`<strong>\`: הופך את הטקסט ל**מודגש** (Bold). המשמעות הסמנטית היא: "זה טקסט חשוב!".
*   \`<em>\`: הופך את הטקסט ל*נטוי* (Italic). המשמעות היא: "הדגשה בדיבור".

\`\`\`html
<p>שימו לב: <strong>אסור</strong> לרוץ במסדרון!</p>
\`\`\`
    `,
    practice: [
      {
        type: 'quiz',
        id: 'q_text_1',
        question: 'כמה פעמים מומלץ להשתמש בתגית h1 בעמוד אחד?',
        options: ['כמה שרוצים', 'פעם אחת בלבד (לכותרת הראשית)', 'לפחות 3 פעמים'],
        correctAnswer: 1,
        explanation: 'תגית h1 מסמלת את נושא הדף המרכזי. לטובת קידום אתרים (SEO) ונגישות, נהוג להשתמש בה רק פעם אחת.'
      },
      {
        type: 'code',
        id: 'c_text_1',
        title: 'צור כותרת ופסקה',
        language: 'html',
        description: 'כתוב כותרת משנה (h2) עם השם שלך, ומתחתיה פסקה (p) עם תיאור קצר.',
        initialCode: '<!-- כתוב כאן -->\n',
        solution: '<h2>ישראל ישראלי</h2>\n<p>אני לומד תכנות באתר CodeFix.</p>'
      }
    ]
  },
  'html-links': {
    title: 'קישורים (Links)',
    content: `
# האינטרנט הוא רשת של קישורים

מה שהופך את האינטרנט ל"רשת" (Web) הוא היכולת לקפוץ מדף לדף.
אנחנו עושים את זה בעזרת תגית ה**עוגן** (Anchor), או בקיצור: \`<a>\`.

## התכונה החשובה ביותר: href

תגית \`<a>\` לבד לא עושה כלום. אנחנו חייבים להגיד לה **לאן** לקחת אותנו.
כאן נכנסת לתמונה התכונה (Attribute) שנקראת \`href\` (הפניית היפר-טקסט).

\`\`\`html
<a href="https://www.google.com">לך לגוגל</a>
\`\`\`

שימו לב למבנה:
1.  שם התגית: \`a\`.
2.  תכונה: \`href\`.
3.  סימן שווה: \`=\`.
4.  הכתובת בתוך גרשיים: \`"..."\`.
5.  הטקסט שהמשתמש רואה: "לך לגוגל".

## פתיחה בחלון חדש

אם אנחנו רוצים שהקישור ייפתח בלשונית (Tab) חדשה ולא יחליף את האתר שלנו, נוסיף תכונה נוספת בשם \`target\`:

\`\`\`html
<a href="https://google.com" target="_blank">פתח בחלון חדש</a>
\`\`\`

הערך \`_blank\` הוא קוד מיוחד שאומר לדפדפן "פתח דף נקי".
    `,
    practice: [
      {
        type: 'code',
        id: 'c_link_1',
        title: 'צור קישור',
        language: 'html',
        description: 'צור קישור (a) שמוביל לאתר "https://example.com" והטקסט שלו הוא "לחץ עליי".',
        initialCode: '<!-- קוד -->\n',
        solution: '<a href="https://example.com">לחץ עליי</a>'
      },
      {
        type: 'quiz',
        id: 'q_link_1',
        question: 'איזו תכונה מגדירה את יעד הקישור (הכתובת)?',
        options: ['src', 'link', 'href'],
        correctAnswer: 2,
        explanation: 'href (Hypertext REFerence) היא התכונה הקובעת לאן הקישור מוביל.'
      }
    ]
  },
  'html-images': {
    title: 'תמונות ומדיה',
    content: `
# תמונה שווה אלף מילים

כדי להוסיף תמונה לאתר, נשתמש בתגית \`<img>\`.
זוהי תגית מיוחדת: אין לה תגית סגירה! (אנחנו לא שמים טקסט בתוך תמונה).

## התכונות של תמונה

לתמונה יש שתי תכונות שחייבים להכיר:

### 1. המקור (Source) - \`src\`
איפה התמונה נמצאת? זה יכול להיות שם של קובץ במחשב שלנו, או כתובת אינטרנט מלאה של תמונה.

### 2. טקסט חלופי (Alternative Text) - \`alt\`
זהו טקסט שמתאר את התמונה במילים.
למה צריך את זה?
*   **נגישות:** עיוורים משתמשים ב"קורא מסך" שמקריא להם את התיאור.
*   **גיבוי:** אם התמונה לא נטענת (לינק שבור), הטקסט יופיע במקומה.
*   **גוגל:** מנועי חיפוש לא "רואים" תמונות, הם קוראים את התיאור כדי להבין מה יש שם.

**דוגמה:**
\`\`\`html
<img src="cat.jpg" alt="חתול ג'ינג'י חמוד יושב על ספה">
\`\`\`
    `,
    practice: [
      {
        type: 'quiz',
        id: 'q_img_1',
        question: 'מדוע חשוב להוסיף תכונת alt לתמונה?',
        options: ['כדי שהתמונה תיטען מהר יותר', 'עבור נגישות (עיוורים) ומנועי חיפוש', 'כדי לקבוע את גודל התמונה'],
        correctAnswer: 1,
        explanation: 'הטקסט החלופי (alt) קריטי לנגישות ולהבנת תוכן התמונה ע"י מחשבים.'
      },
      {
        type: 'code',
        id: 'c_img_1',
        title: 'הוסף תמונה',
        language: 'html',
        description: 'הוסף תמונה עם הכתובת "logo.png" ותיאור "לוגו החברה".',
        initialCode: '<!-- קוד -->\n',
        solution: '<img src="logo.png" alt="לוגו החברה">'
      }
    ]
  },
  'html-lists': {
    title: 'רשימות (Lists)',
    content: `
# לעשות סדר: רשימות

ישנם שני סוגים עיקריים של רשימות ב-HTML:

## 1. רשימה לא מסודרת (Unordered List) - \`<ul>\`
זו רשימה עם "בולטים" (עיגולים שחורים). הסדר לא משנה (כמו רשימת קניות).
*   חלב
*   לחם
*   ביצים

## 2. רשימה מסודרת (Ordered List) - \`<ol>\`
זו רשימה עם מספרים. הסדר כן משנה (כמו מתכון או הוראות).
1.  חמם תנור
2.  ערבב את הבלילה
3.  אפה 30 דקות

## פריט ברשימה - \`<li>\`
לא משנה באיזו רשימה בחרנו (\`ul\` או \`ol\`), כל פריט בתוך הרשימה חייב להיות בתוך תגית \`<li>\` (List Item).

**דוגמה לרשימת קניות:**
\`\`\`html
<ul>
  <li>חלב</li>
  <li>לחם</li>
  <li>ביצים</li>
</ul>
\`\`\`
    `,
    practice: [
      {
        type: 'code',
        id: 'c_list_1',
        title: 'רשימת מטלות',
        language: 'html',
        description: 'צור רשימה מסודרת (ol) עם 3 דברים שאתה צריך לעשות היום.',
        initialCode: '<!-- קוד -->\n',
        solution: '<ol>\n  <li>לקום בבוקר</li>\n  <li>לצחצח שיניים</li>\n  <li>ללמוד קוד</li>\n</ol>'
      }
    ]
  },
  'html-forms': {
    title: 'טפסים וקלט',
    content: `
# אינטראקציה עם המשתמש

עד עכשיו בנינו דפים שרק "מציגים" מידע. אבל מה אם נרצה שהמשתמש יקליד משהו? (כמו טופס הרשמה).
לשם כך יש לנו את התגית \`<input>\`.

גם ל-\`input\` אין תגית סגירה. הסוג שלו נקבע לפי התכונה \`type\`.

## סוגי קלט נפוצים:

*   \`type="text"\`: שדה טקסט רגיל (למשל לשם פרטי).
*   \`type="password"\`: שדה סיסמה (האותיות הופכות לכוכביות).
*   \`type="email"\`: שדה שבודק שיש בו כתובת אימייל חוקית.
*   \`type="date"\`: בוחר תאריכים (לוח שנה).
*   \`type="checkbox"\`: תיבת סימון (כן/לא).

**דוגמה לטופס התחברות קטן:**
\`\`\`html
<input type="text" placeholder="שם משתמש">
<input type="password" placeholder="סיסמה">
<button>התחבר</button>
\`\`\`

(התכונה \`placeholder\` היא הטקסט האפור שמופיע בשדה לפני שמקלידים בו).
    `,
    practice: [
      {
        type: 'quiz',
        id: 'q_form_1',
        question: 'איזה סוג input מתאים לסיסמה?',
        options: ['type="secure"', 'type="text"', 'type="password"'],
        correctAnswer: 2,
        explanation: 'type="password" מסתיר את התווים שהמשתמש מקליד.'
      },
      {
        type: 'code',
        id: 'c_form_1',
        title: 'שדה אימייל',
        language: 'html',
        description: 'צור שדה קלט מסוג email עם טקסט מקדים (placeholder) שאומר "הכנס אימייל".',
        initialCode: '',
        solution: '<input type="email" placeholder="הכנס אימייל">'
      }
    ]
  },

  // CSS Lessons (Hebrew)
  'css-intro': {
    title: 'תחביר CSS ובחירת אלמנטים',
    content: `
# ברוכים הבאים לעולם העיצוב!

CSS (Cascading Style Sheets) היא השפה שבה אנחנו אומרים לדפדפן **איך** להציג את האלמנטים של ה-HTML.
בלי CSS, כל האתרים היו נראים אותו דבר.

## איך זה נראה?

קוד CSS בנוי מ"חוקים". כל חוק מורכב משני חלקים:
1.  **הבוחר (Selector):** למי אנחנו רוצים לשנות את העיצוב?
2.  **הבלוק (Declaration Block):** מה אנחנו רוצים לשנות? (בתוך סוגריים מסולסלים \`{}\`).

\`\`\`css
/* הבוחר: כל תגיות h1 */
h1 {
  color: red;        /* תכונה: ערך */
  font-size: 50px;   /* תכונה: ערך */
}
\`\`\`

בדוגמה הזו:
*   בחרנו את כל ה-\`h1\` באתר.
*   שינינו להם את הצבע לאדום.
*   שינינו את גודל הפונט ל-50 פיקסלים.

## איפה כותבים את זה?

יש כמה דרכים, אבל הדרך הכי נפוצה בשיעורים שלנו תהיה בתוך תגית \`<style>\` שנמצאת בראש המסמך, או בקובץ נפרד.
    `,
    practice: [
      {
        type: 'code',
        id: 'c_css_1',
        title: 'צבע כחול',
        language: 'css',
        description: 'כתוב קוד CSS שמשנה את הצבע (color) של כל ה-p ל-blue.',
        initialCode: '/* כתוב כאן */\n',
        solution: 'p {\n  color: blue;\n}'
      }
    ]
  },
  'css-colors': {
    title: 'עולם הצבעים והרקעים',
    content: `
# צבעים ב-Web

ישנן שלוש דרכים עיקריות להגדיר צבעים ב-CSS:

1.  **שמות (Names):** מילים באנגלית כמו \`red\`, \`blue\`, \`gold\`, \`tomato\`. (יש כ-140 שמות כאלו).
2.  **קוד הקסדצימלי (HEX):** סולמית ואחריה 6 תווים. למשל \`#ff0000\` זה אדום, \`#000000\` זה שחור, \`#ffffff\` זה לבן. זו הדרך הכי נפוצה אצל מעצבים.
3.  **RGB:** פונקציה שמערבבת אדום, ירוק וכחול. \`rgb(255, 0, 0)\`.

## שינוי רקע

כדי לשנות את צבע הרקע של אלמנט, משתמשים בתכונה \`background-color\`.

\`\`\`css
body {
  background-color: #f0f0f0; /* אפור בהיר */
}

button {
  background-color: blue;
  color: white; /* צבע הטקסט */
}
\`\`\`
    `,
    practice: [
      {
        type: 'code',
        id: 'c_color_1',
        title: 'רקע וצבע',
        language: 'css',
        description: 'תן ל-h2 רקע בצבע black וצבע טקסט yellow.',
        initialCode: 'h2 {\n  \n}',
        solution: 'h2 {\n  background-color: black;\n  color: yellow;\n}'
      }
    ]
  },
  'css-boxmodel': {
    title: 'מודל הקופסה (Box Model)',
    content: `
# הכל זה קופסאות

זה אולי הסוד הכי גדול של עיצוב אתרים:
**כל אלמנט ב-HTML הוא בעצם מלבן (קופסה).** גם אם הוא נראה עגול, או שזה רק אות אחת - לדפדפן זה מלבן.

לכל "קופסה" כזו יש 4 שכבות, כמו בצל:

1.  **התוכן (Content):** הטקסט או התמונה עצמם.
2.  **הריפוד (Padding):** המרווח *הפנימי* בין התוכן לבין המסגרת. (כמו אוויר בתוך קופסת נעליים סביב הנעל).
3.  **המסגרת (Border):** הקו שמקיף את האלמנט.
4.  **השוליים (Margin):** המרווח *החיצוני* שדוחף אלמנטים אחרים ומרחיק אותם.

## המחשה בקוד

\`\`\`css
div {
  /* תוכן: נקבע ע"י רוחב וגובה */
  width: 100px;
  
  /* ריפוד: מנפח את הקופסה מבפנים */
  padding: 20px;
  
  /* מסגרת */
  border: 5px solid black;
  
  /* שוליים: מרחיק שכנים מבחוץ */
  margin: 50px;
}
\`\`\`

אם אתם רוצים להזיז משהו, אתם כנראה צריכים לשנות את ה-Margin או ה-Padding שלו.
    `,
    practice: [
      {
        type: 'quiz',
        id: 'q_box_1',
        question: 'מה ההבדל בין Padding ל-Margin?',
        options: ['Padding הוא חיצוני, Margin הוא פנימי', 'Margin הוא רווח חיצוני (דוחף שכנים), Padding הוא רווח פנימי (בין התוכן למסגרת)', 'אין הבדל, שניהם עושים אותו דבר'],
        correctAnswer: 1,
        explanation: 'Margin דוחף אלמנטים אחרים המרוחקים מהאלמנט. Padding יוצר מרווח בתוך האלמנט עצמו סביב התוכן.'
      }
    ]
  },
  'css-flexbox': {
    title: 'סידור עם Flexbox',
    content: `
# לסדר את הבלגן

עד לפני כמה שנים, לסדר אלמנטים אחד ליד השני (למשל תפריט ניווט) היה סיוט.
ואז הגיע **Flexbox**.

Flexbox הוא מצב תצוגה מיוחד שנותן לנו שליטה קלה על הסידור.
כדי להשתמש בו, אנחנו צריכים להגדיר להורה:
\`\`\`css
.container {
  display: flex;
}
\`\`\`
ברגע שעשינו את זה, כל הילדים הישירים שלו יסתדרו אוטומטית **בשורה אחת**.

## תכונות נפוצות של Flexbox

אנחנו יכולים לשלוט בסידור באמצעות פקודות נוס