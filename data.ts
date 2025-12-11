
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

תלמידים רבים מתבלבלים בתחילת הדרך מהסימנים המיוחדים. למה יש שווה (\`=\`)? למה יש גרשיים (\`""\`)? ומתי משתמשים בלוכסן (\`/\`)?
השיעור הזה הוא המילון שלכם. נפרק כל סימן ונסביר את תפקידו המדויק.

## 1. הסוגריים המשולשים: \`< >\` (המעטפה)

כל פקודה ב-HTML עטופה בסימנים האלו.
*   **המשמעות:** "דפדפן יקר, שיב לב! זוהי פקודת קוד, לא סתם טקסט".
*   \`<\` (קטן מ-) מסמן את **התחלת** הפקודה.
*   \`>\` (גדול מ-) מסמן את **סיום** הפקודה.

**דוגמה:**
\`<button>\`
הדפדפן קורא משמאל לימין. הוא רואה \`<\`, נכנס לכוננות קוד, קורא את המילה \`button\`, וברגע שהוא רואה \`>\` הוא מבין: "סיימתי לקרוא את שם הפקודה, עכשיו אני מבצע".

## 2. הלוכסן: \`/\` (התמרור "עצור")

הסימן הזה אומר לדפדפן שמשהו **נגמר**.
אנחנו משתמשים בו בתגית סגירה.

*   **המיקום:** הוא תמיד מגיע *מיד אחרי* הסוגר הפותח \`<\`.
*   **המשמעות:** "כאן מסתיים האלמנט שהתחלנו קודם".

**דוגמה:**
\`</h1>\`
הדפדפן רואה את זה ומבין: "אוקיי, הכותרת הגדולה שהתחלתי קודם? זהו, נגמרה. לחזור לטקסט רגיל".

## 3. השווה: \`=\` (המחבר)

הסימן הזה משמש אותנו כשאנחנו רוצים לתת **תכונות** (Attributes) לאלמנט.
תחשבו עליו כמו המילה "הוא" או "שווה ל-".

**דוגמה:**
\`class="big"\`
אנחנו אומרים לדפדפן: המזהה (class) של האלמנט הזה **שווה ל-** "big".

## 4. הגרשיים: \`"..."\` (המכולה)

כשאנחנו נותנים ערך לתכונה (כמו בדוגמה למעלה), אנחנו חייבים לעטוף את הערך בגרשיים.
למה? כדי שהדפדפן ידע איפה הערך מתחיל ואיפה הוא נגמר.

**תראו מה קורה בלי גרשיים:**
\`<input placeholder=הכנס שם כאן>\`
הדפדפן יתבלבל! הוא יחשוב שה-placeholder הוא רק המילה "הכנס", ולא יבין מה לעשות עם המילים "שם כאן".

**עם גרשיים זה ברור:**
\`<input placeholder="הכנס שם כאן">\`
הדפדפן מבין: "כל מה שנמצא בין הגרשיים שייך ל-placeholder".

---

### סיכום ויזואלי

\`\`\`html
  <h1   class  =  "title"  >   שלום   </h1>
  ^       ^    ^     ^     ^     ^      ^
  1       2    3     4     5     6      7
\`\`\`

1.  **פתיחת פקודה:** "שים לב דפדפן!"
2.  **שם התכונה:** "אני רוצה להגדיר את ה-class..."
3.  **המחבר:** "...שהערך שלו שווה ל..."
4.  **הערך:** "...title (בתוך גרשיים כדי לשמור עליו מאוחד)"
5.  **סגירת פקודה:** "סיימתי את ההגדרות, אפשר להתחיל את התוכן."
6.  **התוכן:** מה שרואים במסך.
7.  **תגית סגירה:** "זהו, נגמרה הכותרת."
    `,
    practice: [
      {
        type: 'quiz',
        id: 'q_syntax_1',
        question: 'מה תפקידם של הגרשיים (" ") ב-HTML?',
        options: ['הם נועדו רק ליופי', 'הם מגדירים לדפדפן היכן מתחיל והיכן מסתיים הערך של התכונה', 'הם הופכים את הטקסט למודגש'],
        correctAnswer: 1,
        explanation: 'הגרשיים "אורזים" את המידע כדי שהדפדפן ידע שכל מה שבפנים הוא ערך אחד רציף, גם אם יש בו רווחים.'
      },
      {
        type: 'quiz',
        id: 'q_syntax_2',
        question: 'היכן ממוקם הלוכסן (/) בתגית סגירה?',
        options: ['בסוף התגית (למשל `<h1/>`)', 'מייד אחרי הסוגר הפותח (למשל `</h1>`)', 'לא משתמשים בלוכסן ב-HTML'],
        correctAnswer: 1,
        explanation: 'בתגית סגירה, הלוכסן תמיד מופיע בהתחלה, ליד ה-<. למשל: `</div>`.'
      }
    ]
  },
  'html-structure': {
    title: 'מבנה, קינון והזחה',
    content: `
# בובות מטריושקה: קינון (Nesting)

בחיים האמיתיים, אנחנו שמים דברים בתוך דברים. בגדים בתוך מזוודה, מזוודה בתוך תא מטען, תא מטען בתוך מכונית.
ב-HTML, העיקרון הזה נקרא **קינון** (Nesting), והוא קריטי.

כמעט כל תגית יכולה להכיל בתוכה תגיות אחרות. זה יוצר מבנה של "עץ משפחה":

*   התגית העוטפת נקראת **הורה** (Parent).
*   התגית שבפנים נקראת **ילד** (Child).

**דוגמה:**
נניח שאנחנו רוצים ליצור "קופסה" (\`<div>\`) ובתוכה לשים כותרת ופסקה.

\`\`\`html
<div>
    <h1>אני הכותרת, אני הילד של ה-div</h1>
    <p>אני הפסקה, אני גם הילד של ה-div</p>
</div>
\`\`\`

במקרה הזה, ה-\`div\` הוא האבא. ה-\`h1\` וה-\`p\` הם הילדים שלו (והם גם אחים אחד של השני).

## למה זה חשוב?
1.  **ארגון:** זה מאפשר לנו לקבץ חלקים שונים באתר (למשל: "אזור התפריט", "אזור התוכן").
2.  **עיצוב:** אם ניתן ל"אבא" רקע כחול ב-CSS, כל הילדים שלו יהיו על הרקע הזה.

# סודות הכתיבה הנקייה: הזחה (Indentation)

תסתכלו שוב על הדוגמה למעלה. שמתם לב שהשורות הפנימיות "זזו" קצת שמאלה (או ימינה באנגלית)?
קוראים לזה **הזחה**.

## למה עושים את זה?
הדפדפן **לא צריך** את זה. מבחינת המחשב, אפשר לכתוב את כל האתר בשורה אחת ענקית ומבולגנת. הוא יבין.
אבל **אנחנו** בני אדם. אם לא נעשה הזחות, הקוד ייראה כמו גוש טקסט מפחיד ולא נבין מי האבא ומי הילד.

> **חוק אצבע:** בכל פעם שאתם פותחים תגית חדשה שאתם לא סוגרים באותה שורה – לחצו על **Tab**. זה יזיז את הסמן פנימה. כשאתם סוגרים את התגית (סוגרים את האבא), חיזרו אחורה.

זה כמו תוכן עניינים של ספר:
* פרק 1
  * תת-פרק א'
  * תת-פרק ב'
* פרק 2
    `,
    practice: [
      {
        type: 'quiz',
        id: 'q2',
        question: 'האם הדפדפן יציג שגיאה אם לא אבצע הזחה (Indentation) לקוד?',
        options: ['לא, הדפדפן מתעלם מרווחים (Whitespace), זה נועד רק לנוחות הקריאה שלנו', 'כן, הקוד לא יעבוד והאתר יקרוס', 'כן, אבל רק אם מדובר בתגיות מסוימות'],
        correctAnswer: 0, // Changed order
        explanation: 'הדפדפן "עיוור" לרווחים מיותרים. ההזחה היא נטו בשביל הסדר והארגון של המתכנת.'
      },
      {
        type: 'code',
        id: 'c2',
        title: 'תרגול קינון (Nesting)',
        language: 'html',
        description: 'צור תגית `<div>`. בתוכה (כילדים), צור תגית `<h1>` עם המילה "אבא" ותגית `<p>` עם המילה "ילד". נסה לשמור על הזחה יפה.',
        initialCode: `<!-- נסה לכתוב את הקוד בצורה מדורגת -->
`,
        solution: `<div>
    <h1>אבא</h1>
    <p>ילד</p>
</div>`
      }
    ]
  },
  'html-comments': {
    title: 'הערות בקוד (Comments)',
    content: `
# לדבר עם עצמך (ועם אחרים)

לפעמים אנחנו רוצים לכתוב משהו בקוד, אבל **לא** רוצים שהדפדפן יציג אותו למשתמש.
בשביל זה יש **הערות** (Comments).

הערות הן טקסט שהדפדפן מתעלם ממנו לחלוטין. הוא לא רואה אותו. זה נועד אך ורק בשביל בני אדם שקוראים את הקוד.

## איך כותבים הערה?

ב-HTML, הערה מתחילה ב-\`<!--\` ומסתיימת ב-\`-->\`.

\`\`\`html
<!-- זוהי הערה. אף אחד לא יראה אותה באתר -->
<p>את זה כולם יראו</p>
<!--
אפשר גם לכתוב
הערה על פני
כמה שורות
-->
\`\`\`

## למה זה טוב?
1.  **הסברים:** אם כתבתם קוד מסובך, אפשר לכתוב הערה שמסבירה מה הוא עושה.
    \`\`\`html
    <!-- האזור הזה אחראי על התפריט העליון -->
    <nav>...</nav>
    \`\`\`
2.  **נטרול זמני:** אם יש לכם קוד שאתם לא רוצים למחוק אבל לא רוצים שיעבוד כרגע (למשל, כפתור שעדיין לא מוכן), אפשר "להעיר" אותו (Comment Out). פשוט עוטפים אותו בהערה, והדפדפן ידלג עליו.
    `,
    practice: [
       {
        type: 'quiz',
        id: 'q_comments_1',
        question: 'מי יכול לראות את ההערות שכתבת בקוד ה-HTML?',
        options: ['רק מי שצופה בקוד המקור (מתכנתים)', 'כל גולש שנכנס לאתר רואה אותן מופיעות על המסך', 'רק השרת שמאחסן את האתר'],
        correctAnswer: 0,
        explanation: 'הדפדפן מתעלם מהערות ולא מציג אותן ויזואלית למשתמש הרגיל.'
      },
      {
        type: 'code',
        id: 'c_comments',
        title: 'נטרול קוד',
        language: 'html',
        description: 'יש לך כפתור שגורם לשגיאה. נטרל אותו על ידי הפיכתו להערה, כך שהוא לא יופיע באתר, אבל הקוד שלו יישמר.',
        initialCode: `<button>לחץ עליי וקבל 1000 שקל</button>`,
        solution: `<!-- <button>לחץ עליי וקבל 1000 שקל</button> -->`
      }
    ]
  },
  'html-text': {
    title: 'עיצוב טקסט וכותרות',
    content: `
# היררכיה של כותרות

כמו בעיתון, גם באתר אינטרנט יש חשיבות לגודל הכותרת.
ב-HTML יש לנו 6 רמות של כותרות, מ-\`<h1>\` (הכי חשובה) ועד \`<h6>\` (הכי פחות חשובה).

\`\`\`html
<h1>כותרת ראשית של הדף (למשל: שם הכתבה)</h1>
<h2>כותרת משנית (למשל: כותרת ביניים)</h2>
<h3>כותרת תת-משנית</h3>
\`\`\`

למה זה חשוב? זה לא רק עניין של גודל פונט (את זה אפשר לשנות בעיצוב).
1.  **נגישות:** עיוורים משתמשים ב"קורא מסך" שמקריא להם את האתר. הם יכולים לקפוץ מכותרת לכותרת כדי להבין על מה הדף מדבר.
2.  **גוגל (SEO):** גוגל סורק את האתר שלכם. כשהוא רואה \`h1\`, הוא מבין: "אהה! זה הנושא המרכזי של הדף!".

## פסקאות ועיצוב בסיסי
כדי לכתוב סתם טקסט (כמו שאתם קוראים עכשיו), משתמשים בתגית \`<p>\` (קיצור של Paragraph - פסקה).

בתוך הפסקה, לפעמים נרצה להדגיש מילה מסוימת. נשתמש בתגיות בתוך תגיות:

*   \`<strong>\` - הופך את הטקסט ל**מודגש** (Bold). המשמעות היא "זה חשוב!".
*   \`<em>\` - הופך את הטקסט ל*נטוי* (Italic). המשמעות היא הדגשה בדיבור.

\`\`\`html
<p>זה משפט רגיל, אבל <strong>המילה הזו חשובה</strong> מאוד.</p>
\`\`\`
    `,
    practice: [
       {
        type: 'quiz',
        id: 'q_text_1',
        question: 'איזו תגית כותרת נחשבת לחשובה ביותר עבור SEO ונגישות?',
        options: ['<h6>', '<h3>', '<h1>'],
        correctAnswer: 2,
        explanation: 'h1 היא הכותרת הראשית וחשובה ביותר לתיאור נושא הדף.'
      },
      {
        type: 'code',
        id: 'c_text',
        title: 'יצירת מאמר קטן',
        language: 'html',
        description: 'צור כותרת ראשית (h1) עם נושא כלשהו, מתחתיה כותרת משנית (h2), ופסקה (p) שמסבירה על הנושא, עם מילה אחת מודגשת (strong) בתוכה.',
        initialCode: '',
        solution: `<h1>החדשות היומיות</h1>
<h2>מזג האוויר</h2>
<p>היום יהיה <strong>חם</strong> מהרגיל.</p>`
      }
    ]
  },
  'html-links': {
    title: 'קישורים (Links)',
    content: `
# תגית ה-Anchor (עוגן)

מה הופך את ה"אינטרנט" ל"רשת"? היכולת לקפוץ מדף לדף.
אנחנו עושים את זה בעזרת **קישורים**.

התגית של קישור היא \`<a>\` (קיצור של Anchor - עוגן).
אבל רגע, תגית \`<a>\` לבד לא מספיקה. אנחנו צריכים להגיד לה **לאן** הקישור מוביל.

## תכונות (Attributes)
כאן אנחנו פוגשים מושג חדש: **תכונה** (Attribute).
תכונה היא מידע נוסף שאנחנו מוסיפים לתגית הפתיחה.

\`\`\`html
<a href="https://google.com">גוגל</a>
\`\`\`

בואו נפרק את זה:
*   \`href\`: זהו שם התכונה (Hypertext Reference). זה בעצם אומר "לאן הולכים?".
*   \`"..."\`: בתוך המרכאות אנחנו כותבים את הכתובת (URL).
*   \`גוגל\`: זה הטקסט שהמשתמש יראה על המסך בצבע כחול ועם קו תחתון.

אם נרצה שהקישור ייפתח בלשונית חדשה (ולא יחליף את הדף הנוכחי), נוסיף תכונה נוספת בשם \`target\`:
\`\`\`html
<a href="https://google.com" target="_blank">גוגל</a>
\`\`\`
    `,
    practice: [
      {
        type: 'quiz',
        id: 'q_links_1',
        question: 'איזו תכונה (Attribute) חובה להוסיף כדי שהקישור ידע לאן להוביל?',
        options: ['link', 'src', 'href'],
        correctAnswer: 2,
        explanation: 'href (Hypertext Reference) היא התכונה שמחזיקה את כתובת היעד.'
      },
      {
        type: 'code',
        id: 'c_links',
        title: 'יצירת קישור לגוגל',
        language: 'html',
        description: 'צור קישור שמוביל ל-`https://google.com` עם הטקסט "Google". הקישור צריך להיפתח בטאב חדש (הוסף target="_blank").',
        initialCode: '<a href="">...</a>',
        solution: '<a href="https://google.com" target="_blank">Google</a>'
      }
    ]
  },
  'html-images': {
    title: 'תמונות ומדיה',
    content: `
# תמונה שווה אלף מילים

עד עכשיו עבדנו רק עם טקסט. בואו נוסיף קצת צבע.
כדי להוסיף תמונה, משתמשים בתגית \`<img>\`.

## תגית ללא סגירה (Void Element)
שימו לב למשהו מיוחד: לתגית \`img\` **אין תגית סגירה**.
למה? כי לתמונה אין "תוכן טקסטואלי" שנמצא בתוכה. התמונה היא האלמנט עצמו.

\`\`\`html
<img src="cat.jpg" alt="חתול חמוד">
\`\`\`

## התכונות החשובות:
1.  \`src\` (Source): המקור. איפה הקובץ של התמונה נמצא? זה יכול להיות שם קובץ או כתובת אינטרנט מלאה.
2.  \`alt\` (Alternative Text): טקסט חלופי. זה הטקסט שיופיע אם התמונה לא תיטען (למשל, אם יש בעיית אינטרנט). זה גם קריטי עבור עיוורים – קורא המסך יקריא להם את התיאור הזה.

> **טיפ:** תמיד תוסיפו \`alt\` לתמונות שלכם! זה חשוב לנגישות ולגוגל.
    `,
    practice: [
      {
        type: 'quiz',
        id: 'q_img_1',
        question: 'מדוע לתגית img אין תגית סגירה?',
        options: ['כי היא לא יכולה להכיל טקסט או אלמנטים אחרים בתוכה', 'זה באג ב-HTML', 'כי היא תמיד מגיעה בזוגות'],
        correctAnswer: 0,
        explanation: 'תגית img היא Void Element, היא עומדת בפני עצמה.'
      },
       {
        type: 'code',
        id: 'c_img',
        title: 'הוספת תמונה',
        language: 'html',
        description: 'הוסף תמונה עם הכתובת `https://via.placeholder.com/150` והטקסט החלופי (alt) "תמונה לדוגמה".',
        initialCode: '<!-- הוסף תגית img כאן -->',
        solution: '<img src="https://via.placeholder.com/150" alt="תמונה לדוגמה">'
      }
    ]
  },
  'html-lists': {
    title: 'רשימות (Lists)',
    content: `
# עושים סדר: רשימות

הרבה פעמים אנחנו רוצים להציג רשימה של פריטים (למשל: תפריט ניווט, רשימת מכולת, שלבים במתכון).
ב-HTML יש שני סוגים עיקריים של רשימות:

## 1. רשימה לא מסודרת (Unordered List) - \`<ul>\`
זו רשימה עם נקודות (Bulleted List). הסדר לא משנה.

\`\`\`html
<ul>
  <li>חלב</li>
  <li>ביצים</li>
  <li>לחם</li>
</ul>
\`\`\`

## 2. רשימה מסודרת (Ordered List) - \`<ol>\`
זו רשימה ממוספרת (1, 2, 3...). הסדר משנה.

\`\`\`html
<ol>
  <li>מחממים תנור</li>
  <li>מערבבים מצרכים</li>
  <li>אופים 20 דקות</li>
</ol>
\`\`\`

שימו לב למבנה:
*   הרשימה עצמה עטופה ב-\`<ul>\` או \`<ol>\` (האבא).
*   כל פריט בתוך הרשימה **חייב** להיות עטוף בתגית \`<li>\` (List Item). אי אפשר סתם לזרוק טקסט בתוך ה-\`ul\`.
    `,
    practice: [
      {
        type: 'quiz',
        id: 'q_list_1',
        question: 'מהי התגית הנכונה ליצירת רשימה ממוספרת (1, 2, 3)?',
        options: ['<ul>', '<ol>', '<dl>'],
        correctAnswer: 1,
        explanation: 'ol קיצור של Ordered List (רשימה מסודרת/ממוספרת).'
      },
      {
        type: 'code',
        id: 'c_lists',
        title: 'רשימת קניות',
        language: 'html',
        description: 'צור רשימה לא מסודרת (ul) עם 3 פריטים (li): תפוח, בננה, תפוז.',
        initialCode: '',
        solution: `<ul>
  <li>תפוח</li>
  <li>בננה</li>
  <li>תפוז</li>
</ul>`
      }
    ]
  },
  'html-forms': {
    title: 'טפסים וקלט',
    content: `
# מדברים עם האתר: טפסים (Forms)

עד עכשיו השיחה הייתה חד-צדדית. השרת דיבר, הדפדפן הציג, ואנחנו הקשבנו.
הגיע הזמן שאנחנו נדבר בחזרה!

טפסים (Forms) הם הדרך שלנו לשלוח מידע לאתר:
*   התחברות (שם משתמש וסיסמה).
*   הרשמה לניוזלטר.
*   חיפוש בגוגל.
*   העלאת תמונה לאינסטגרם.

## המעטפת: תגית \`<form>\`
כל טופס מתחיל בתגית \`<form>\`. היא המכולה של כל השדות.

\`\`\`html
<form>
  <!-- כאן יהיו השדות -->
</form>
\`\`\`

## הכוכב הראשי: \`<input>\`
איך יוצרים שדה לכתיבה? משתמשים בתגית \`<input>\`.
זוהי **תגית ללא סגירה** (כמו \`img\`), והיא מקבלת תכונה סופר-חשובה בשם \`type\`. התכונה הזו קובעת איך השדה יתנהג.

### 1. טקסט רגיל (\`type="text"\`)
זהו ברירת המחדל. שדה פשוט לכתיבת שם, כתובת וכו'.
\`\`\`html
<input type="text">
\`\`\`

### 2. סיסמה (\`type="password"\`)
כמו טקסט, אבל מסתיר את מה שכותבים בכוכביות או עיגולים.
\`\`\`html
<input type="password">
\`\`\`

### 3. אימייל (\`type="email"\`)
נראה כמו טקסט, אבל הדפדפן יודע לבדוק אם כתבתם שטרודל (@) וסיומת הגיונית לפני השליחה!
\`\`\`html
<input type="email">
\`\`\`

## עזרים למשתמש: Placeholder ו-Label

כדי שהמשתמש ידע מה לכתוב, יש לנו שני כלים:

### Placeholder (טקסט דמה)
טקסט אפור שמופיע בתוך השדה ונעלם כשמתחילים להקליד.
\`\`\`html
<input type="text" placeholder="הקלד את שמך כאן...">
\`\`\`

### Label (תווית)
זה הטקסט שמופיע *ליד* או *מעל* השדה (כמו "שם פרטי:").
למה לא סתם לכתוב פסקה \`p\`? כי \`label\` משפר את הנגישות, וכשלוחצים עליו - הסמן קופץ אוטומטית לתוך השדה!

\`\`\`html
<label>
  שם משתמש:
  <input type="text">
</label>
\`\`\`

## כפתור השליחה
בסוף כל טופס חייב להיות כפתור שיגיד "סיימתי, שלח את המידע!".
אנחנו משתמשים בתגית \`button\` עם סוג מיוחד:

\`\`\`html
<button type="submit">התחבר</button>
\`\`\`
    `,
    practice: [
      {
        type: 'quiz',
        id: 'q_forms_1',
        question: 'מדוע חשוב להשתמש ב-type="password" עבור שדה סיסמה?',
        options: ['כדי להסתיר את התווים שהמשתמש מקליד (פרטיות)', 'כדי שהסיסמה תישלח מהר יותר לשרת', 'כדי לשנות את צבע הרקע של השדה'],
        correctAnswer: 0, // Changed order
        explanation: 'סוג password גורם לדפדפן להציג עיגולים או כוכביות במקום הטקסט האמיתי, כדי שמי שעומד מאחוריך לא יראה את הסיסמה.'
      },
      {
        type: 'code',
        id: 'c_forms_login',
        title: 'בניית טופס התחברות',
        language: 'html',
        description: 'צור טופס (<form>) המכיל: שדה אימייל (type="email") עם placeholder "הכנס אימייל", שדה סיסמה (type="password") וכפתור שליחה (button type="submit") עם הטקסט "כניסה".',
        initialCode: `<!-- בנה את הטופס כאן -->
`,
        solution: `<form>
  <input type="email" placeholder="הכנס אימייל">
  <input type="password" placeholder="סיסמה">
  <button type="submit">כניסה</button>
</form>`
      }
    ]
  },
  'css-intro': {
      title: 'תחביר CSS',
      content: `# CSS Basics\n\nבקרוב: תוכן על סלקטורים ועיצוב.`,
      practice: []
  },
  'css-colors': {
    title: 'צבעים ורקעים',
    content: `
# עבודה עם צבעים

ב-CSS אפשר להגדיר צבעים בכמה דרכים: שמות, Hex Code, ו-RGB.
    `,
    practice: [
      {
        type: 'code',
        id: 'c_css_colors',
        title: 'צביעת כותרת',
        language: 'html',
        description: 'יש לך כותרת h1. השתמש ב-CSS (בתוך תגית style) כדי לשנות את צבע הטקסט שלה לכחול (`blue`) ואת הרקע שלה לצהוב (`yellow`).',
        initialCode: `<h1>כותרת צבעונית</h1>

<style>
  h1 {
    /* כתוב את ה-CSS כאן */
  }
</style>`,
        solution: `<h1>כותרת צבעונית</h1>

<style>
  h1 {
    color: blue;
    background-color: yellow;
  }
</style>`
      }
    ]
  },
  'css-boxmodel': {
      title: 'מודל הקופסה',
      content: `# Box Model\n\nבקרוב: margin, padding, border.`,
      practice: []
  },
  'css-flexbox': {
      title: 'Flexbox',
      content: `# Flexbox\n\nבקרוב: סידור אלמנטים.`,
      practice: []
  },
  'css-grid': {
      title: 'CSS Grid',
      content: `# Grid\n\nבקרוב: רשתות.`,
      practice: []
  },
  'js-intro': {
      title: 'JavaScript Intro',
      content: `# JS Intro\n\nבקרוב.`,
      practice: []
  },
  'js-variables': {
    title: 'משתנים (Variables)',
    content: `
# משתנים

משתנה הוא כמו קופסה שאפשר לשמור בה מידע.
    `,
    practice: [
      {
        type: 'quiz',
        id: 'q_js_var',
        question: 'איזו מילת מפתח משמשת להגדרת משתנה שערכו לא ישתנה לעולם?',
        options: ['var', 'let', 'const', 'fixed'],
        correctAnswer: 2,
        explanation: 'const (constant) משמש להגדרת קבועים.'
      }
    ]
  },
  'js-operators': {
      title: 'Operators',
      content: `# Operators\n\nבקרוב.`,
      practice: []
  },
  'js-conditions': {
      title: 'Conditions',
      content: `# Conditions\n\nבקרוב.`,
      practice: []
  },
  'js-loops': {
      title: 'Loops',
      content: `# Loops\n\nבקרוב.`,
      practice: []
  },
  'js-functions': {
      title: 'Functions',
      content: `# Functions\n\nבקרוב.`,
      practice: []
  },
  'js-dom': {
      title: 'DOM',
      content: `# DOM\n\nבקרוב.`,
      practice: []
  }
};

const lessonContentEn: Record<string, {title: string, content: string, practice?: PracticeItem[]}> = {
  'web-intro': {
    title: '1. How the Web Works',
    content: `
# Before writing a single line of code...

We are used to visiting websites like Facebook, Google, or YouTube, but what really happens the moment we press \`Enter\`? To become good developers, we must understand the "behind the scenes".

## Browser, Server, and everything in between

To understand this, let's use a restaurant analogy:

1.  **The Client:** This is you, or more precisely – your computer. You sit at the table and order a dish from the menu (e.g., "I want to see the home page of ynet").
2.  **The Waiter (The Browser):** The browser (Chrome, Safari, Edge) is the intermediary. It takes your request and runs to the kitchen to get it. It knows how to speak to the kitchen in a special language (HTTP).
3.  **The Kitchen (The Server):** In a remote place in the world sits a powerful computer that runs 24/7 called a "Server". It stores all the website's files. When the waiter asks, it prepares the dish (web pages, images, data) and sends it back.

When the waiter (browser) comes to your table, he doesn't throw a sack of flour and a carton of eggs at you (the raw code). He serves you a **ready-made, beautiful pizza** (the visual website).
This is exactly how the browser works: it receives **textual code** from the server, reads it at enormous speed, and "paints" buttons, images, and colors on your screen.

## The Three Pillars of Web Development

Every modern website consists of three main languages. We will use the "Human Body Analogy" to understand them:

### 1. HTML - The Skeleton 🦴
This is the structural base.
Without a skeleton, the body would fall to the floor like a jelly bag. HTML defines **what is on the page**:
*   "Here will be a heading"
*   "Here will be a paragraph"
*   "Here will be an image"
HTML does not determine how things will look (color, size), but only that they **exist**.

### 2. CSS - The Skin & Style 🎨
This is the design.
After we have a skeleton, we want it to look good. CSS is responsible for the visibility:
*   "The heading will be blue"
*   "The background will be pink"
*   "The image will be round"
Without CSS, all websites would look like boring black-and-white Word documents.

### 3. JavaScript - The Brain 🧠
This is the behavior and interaction.
A beautiful body and strong skeleton are nice, but we want to move! JS makes things happen:
*   "What happens when the button is clicked?"
*   "How do we check if the entered password is correct?"
*   "How do we show a popup message?"

> **In this course, we will learn these three languages in order: first build a skeleton (HTML), then style it (CSS), and finally breathe life into it (JS).**
    `,
    practice: [
      {
        type: 'quiz',
        id: 'q_intro_1_en',
        question: 'If HTML is the skeleton, what is the role of CSS?',
        options: ['To be the brain / logic', 'To be the skin / styling', 'To be the server'],
        correctAnswer: 1,
        explanation: 'CSS handles the visual presentation.'
      },
      {
        type: 'quiz',
        id: 'q_intro_2_en',
        question: 'What is the main role of a Browser?',
        options: ['To create websites from scratch', 'To translate code (HTML) into visual graphics for the user', 'To store the internet'],
        correctAnswer: 1,
        explanation: 'The browser renders code into a visual interface.'
      }
    ]
  },
  'html-syntax': {
    title: '3. Dictionary: Symbols & Syntax',
    content: `# Decoding the Symbols\n\nLearn what <, >, /, and = actually mean in HTML code.`,
    practice: []
  }
  // Fallback for others to simple content
};

// ... existing export
export const getLessonContent = (id: string, lang: Language): { title: string; content: string; practice?: PracticeItem[] } => {
  const isHe = lang === 'he';
  // Corrected logic: Use English repo if not Hebrew
  const repo = isHe ? lessonContentHe : lessonContentEn; 

  if (repo[id]) {
    return repo[id];
  }

  // Fallback if specific lesson missing in EN, try HE or default
  if (!isHe && lessonContentHe[id]) {
      return {
          ...lessonContentHe[id],
          title: lessonContentHe[id].title + ' (Hebrew Only)',
          content: lessonContentHe[id].content + '\n\n> *Note: English translation coming soon.*'
      }
  }

  return {
    title: isHe ? 'שיעור בפיתוח' : 'Lesson Under Construction',
    content: isHe 
      ? `# התוכן בבנייה`
      : `# Content Coming Soon`
  };
};
