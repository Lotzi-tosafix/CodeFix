import { TranslationStructure, Module, Lesson, Language, PracticeItem } from './types';

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
          id: 'html-structure', 
          title: isHe ? '3. קינון והזחה (Nesting)' : '3. Nesting & Indentation', 
          description: isHe ? 'הסוד לקוד נקי: למה עושים רווחים (Tab)? ומה זה "אבא ובן"?' : 'Clean code secrets: Why indent? Parent/Child relationships explained.', 
          content: '' 
        },
        { 
          id: 'html-text', 
          title: isHe ? '4. עיצוב טקסט וכותרות' : '4. Text Formatting Tags', 
          description: isHe ? 'היררכיה נכונה של כותרות (H1-H6) ועיצוב סמנטי.' : 'Correct hierarchy (H1-H6) and semantic styling.', 
          content: '' 
        },
        { 
          id: 'html-links', 
          title: isHe ? '5. קישורים (Links)' : '5. Links & Anchors', 
          description: isHe ? 'הסוד של האינטרנט: לחבר דפים אחד לשני באמצעות לינקים.' : 'Connect webpages together using hyperlinks and attributes.', 
          content: '' 
        },
        { 
          id: 'html-images', 
          title: isHe ? '6. תמונות ומדיה' : '6. Images & Attributes', 
          description: isHe ? 'מוסיפים צבע לחיים: איך מטמיעים תמונות ומגדירים להן תכונות.' : 'Embed images and learn about the src and alt attributes.', 
          content: '' 
        },
        { 
          id: 'html-lists', 
          title: isHe ? '7. רשימות (Lists)' : '7. Lists (Ordered & Unordered)', 
          description: isHe ? 'מסדרים את התוכן בצורה נקייה עם רשימות מסודרות ולא מסודרות.' : 'Organize content with bullet points and numbered lists.', 
          content: '' 
        },
        { 
          id: 'html-forms', 
          title: isHe ? '8. טפסים וקלט' : '8. Forms & Inputs', 
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

// Content Dictionary with Practice Items
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

כל אתר אינטרנט מודרני מורכב משלוש שפות עיקריות. כל אחת מהן אחראית על משהו אחר לגמרי. נשתמש ב"משל גוף האדם" כדי להבין אותן:

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
        options: ['לכתוב את הקוד של האתר באופן אוטומטי', 'לקבל קוד מהשרת ולתרגם אותו לתצוגה ויזואלית עבור המשתמש', 'לאחסן את כל המידע של האינטרנט כדי שלא יאבד'],
        correctAnswer: 1,
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
        options: ['אין הבדל, הן נראות אותו דבר', 'בתגית סגירה יש לוכסן (/) לפני שם התגית', 'תגית פתיחה נכתבת באותיות גדולות (CAPS)'],
        correctAnswer: 1,
        explanation: 'תגית סגירה תמיד מכילה לוכסן. למשל: </button>. זה הסימן לדפדפן שהאלמנט נגמר.'
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
        options: ['כן, הקוד לא יעבוד והאתר יקרוס', 'לא, הדפדפן מתעלם מרווחים (Whitespace), זה נועד רק לנוחות הקריאה שלנו', 'כן, אבל רק אם מדובר בתגיות מסוימות'],
        correctAnswer: 1,
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
  }
};

const lessonContentEn: Record<string, {title: string, content: string, practice?: PracticeItem[]}> = {
  'web-intro': {
    title: '1. How the Web Works',
    content: `
# Before writing a single line of code...

We are used to visiting sites like Google or YouTube, but what actually happens when we hit \`Enter\`? To be great developers, we must understand what happens "behind the scenes".

## Browser, Server, and Everything in Between

Let's use a restaurant analogy:
1.  **You (Client):** You sit at the table (your computer) and order a dish (e.g., "I want to see google.com").
2.  **The Waiter (Browser):** The browser (Chrome, Safari) takes your request to the kitchen. It speaks a special language called HTTP.
3.  **The Kitchen (Server):** A powerful computer somewhere in the world called a "Server" stores all the website files. When the waiter asks, it prepares the dish (web pages, images) and sends it back.

When the waiter brings the food, they don't give you a grocery list (flour, eggs). They serve a **ready-made pizza**.
Similarly, the browser receives **text code** (ingredients) from the server and "paints" a visual website with buttons and images for you.

## The Three Pillars of Web Dev

Every modern website consists of three main languages. Each has a distinct role. Let's use the **Human Body Metaphor**:

### 1. HTML - The Skeleton 🦴
This is the structure. Just as a building has foundations and walls, HTML defines **what is on the page**.
*   "Here is a title"
*   "Here is an image"
HTML doesn't decide how things look (colors, size), only that they **exist**.

### 2. CSS - The Skin & Clothing 🎨
This is the style. CSS is responsible for **presentation**.
*   "The title is blue"
*   "The background is pink"
Without CSS, the web would look like boring black-and-white Word documents.

### 3. JavaScript - The Brain & Muscles 🧠
This is the functionality. JS makes things **interactive**.
*   "What happens when I click?"
*   "How do I log in?"
*   "Show a popup!"

> **In this course, we will learn them in order: Build the skeleton (HTML), dress it up (CSS), and bring it to life (JS).**
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
  'html-intro': {
    title: '2. HTML Structure & Tags',
    content: `
# What is HTML anyway?

So we know HTML is the skeleton. But how do we build it?
HTML isn't a "programming language" (no math). It's a **Markup Language**.

## What is a Tag?

A tag is a **command** we give to the browser.
Think about it: The browser reads text normally. But when it sees **Angle Brackets** \`<\` and \`>\`, it knows: "Oops! This is an instruction for me!".

The structure of a tag is always:
1.  Less-than sign (\`<\`)
2.  Tag name (e.g., \`button\`)
3.  Greater-than sign (\`>\`)

Together: \`<button>\`. This is an **Opening Tag**. It tells the browser: "Start drawing a button here".

## The Element - The Whole Package

To create a full component (like a button with text), we need an **Element**.
An element is a "sandwich" of 3 parts:

1.  **Opening Tag:** \`<button>\`
    Where it starts.
2.  **Content:** \`Click Me\`
    The text or data *inside*. This is what the user sees.
3.  **Closing Tag:** \`</button>\`
    Where it ends.
    **Crucial:** Note the forward slash \`/\`. This distinguishes it from the opening tag. Without it, the browser thinks the button never ends!

### More Examples:

**Heading:**
\`\`\`html
<h1>I am a main title</h1>
\`\`\`
Browser sees \`h1\`, understands it's a huge title, and renders it big and bold.

**Paragraph:**
\`\`\`html
<p>Just some normal text.</p>
\`\`\`
Browser sees \`p\`, and renders a standard text paragraph.

## The Boilerplate

Every webpage in the world starts with the same fixed structure. The "Skeleton of the Skeleton".

\`\`\`html
<!DOCTYPE html>        <!-- Declaration: This is modern HTML -->
<html>                 <!-- Root: Everything lives here -->
  <head>
    <!-- Head: Settings and invisible info (like tab title) -->
  </head>
  <body>
    <!-- Body: Everything visible! Titles, images, buttons -->
    <h1>Hello World!</h1>
  </body>
</html>
\`\`\`

Note the separation between \`head\` and \`body\`. Like a human: Thoughts are in the head, appearance is in the body.
    `,
    practice: [
      {
        type: 'quiz',
        id: 'q1_en',
        question: 'What is the visual difference between an opening and a closing tag?',
        options: ['No difference', 'Closing tag has a / (slash)', 'Opening tag is uppercase'],
        correctAnswer: 1,
        explanation: 'A closing tag always includes a forward slash before the tag name. Example: </h1>'
      },
      {
        type: 'code',
        id: 'c1_en',
        title: 'Your First Element',
        language: 'html',
        description: 'Write a full `button` element. Start with an opening tag, write "Start" inside, and end with a closing tag.',
        initialCode: '<!-- Write your code here -->\n',
        solution: '<button>Start</button>'
      }
    ]
  },
  'html-structure': {
    title: '3. Nesting & Indentation',
    content: `
# Matryoshka Dolls: Nesting

In real life, we put things inside things. Clothes in a suitcase, suitcase in a car.
In HTML, this is called **Nesting**, and it's crucial.

Almost any tag can contain other tags. This creates a "Family Tree":

*   The wrapping tag is the **Parent**.
*   The inner tag is the **Child**.

**Example:**
Let's make a "Box" (\`<div>\`) and put a title and paragraph inside.

\`\`\`html
<div>
    <h1>I am the title, child of div</h1>
    <p>I am the text, child of div</p>
</div>
\`\`\`

Here, \`div\` is the Dad. \`h1\` and \`p\` are his children (and siblings to each other).

## Why is this important?
1.  **Organization:** Grouping related parts (e.g., "Menu Area", "Content Area").
2.  **Styling:** If we give the "Dad" a blue background in CSS, all his children will sit on that background.

# Clean Code Secrets: Indentation

Look at the example above again. Did you notice the inner lines moved to the right?
This is **Indentation**.

## Why do we do it?
The browser **doesn't need it**. The computer can read the whole site in one messy line.
But **we** are humans. Without indentation, code looks like a scary block of text and we can't tell who is the parent and who is the child.

> **Rule of Thumb:** Every time you open a tag that you don't close on the same line - press **Tab**. When you close the tag (close the parent), go back.

It's like a Table of Contents:
* Chapter 1
  * Section A
  * Section B
* Chapter 2
    `,
    practice: [
      {
        type: 'quiz',
        id: 'q2_en',
        question: 'Does indentation affect how the site looks in the browser?',
        options: ['Yes, it moves things on screen', 'No, it is just for code readability', 'Yes, but only colors'],
        correctAnswer: 1,
        explanation: 'Browsers ignore whitespace. Indentation is purely for human readability.'
      },
      {
        type: 'code',
        id: 'c2_en',
        title: 'Practice Nesting',
        language: 'html',
        description: 'Create a `<div>`. Inside it, put an `<h1>` with "Parent" and a `<p>` with "Child". Try to indent nicely.',
        initialCode: `<!-- Try to nest your code -->
`,
        solution: `<div>
    <h1>Parent</h1>
    <p>Child</p>
</div>`
      }
    ]
  },
  'html-text': {
    title: '4. Text & Headings',
    content: `
# Heading Hierarchy

Just like in a newspaper, size matters.
HTML offers 6 levels of headings, from \`<h1>\` (Most important) to \`<h6>\` (Least).

\`\`\`html
<h1>Main Page Title</h1>
<h2>Section Title</h2>
<h3>Sub-section</h3>
\`\`\`

Why does this matter? It's not just font size.
1.  **Accessibility:** Screen readers use headings to navigate. Blind users jump from title to title.
2.  **SEO:** Google scans your site. When it sees \`h1\`, it knows: "Aha! This is the main topic!".

## Paragraphs & Basic Styles
To write regular text (like you are reading now), use \`<p>\` (Paragraph).
Inside, you can emphasize words:

*   \`<strong>\` - **Bold**. Means "This is important!".
*   \`<em>\` - *Italic*. Means emphasis in speech.

\`\`\`html
<p>This is normal, but <strong>this is strong</strong>.</p>
\`\`\`
    `,
    practice: [
      {
        type: 'code',
        id: 'c_text_en',
        title: 'Mini Article',
        language: 'html',
        description: 'Create an h1, an h2 below it, and a paragraph with one word in **bold** (strong).',
        initialCode: '',
        solution: `<h1>News</h1>
<h2>Weather</h2>
<p>It is <strong>hot</strong> today.</p>`
      }
    ]
  },
  'html-links': {
    title: '5. Links & Anchors',
    content: `
# The Anchor Tag

What makes the "Web" a "Web"? The ability to jump between pages.
We use the \`<a>\` tag (Anchor).
But \`<a>\` alone isn't enough. We need to tell it **where** to go.

## Attributes
Here we meet a new concept: **Attribute**.
An attribute is extra info we add to the opening tag.

\`\`\`html
<a href="https://google.com">Google</a>
\`\`\`

Let's break it down:
*   \`href\`: The attribute name (Hypertext Reference).
*   \`"..."\`: The URL goes inside quotes.
*   \`Google\`: The text the user sees.

To open in a new tab, add the \`target\` attribute:
\`\`\`html
<a href="https://google.com" target="_blank">Google</a>
\`\`\`
    `,
    practice: [
      {
        type: 'code',
        id: 'c_links_en',
        title: 'Link to Google',
        language: 'html',
        description: 'Create a link to `https://google.com` with the text "Google". It should open in a new tab.',
        initialCode: '<a href="">...</a>',
        solution: '<a href="https://google.com" target="_blank">Google</a>'
      }
    ]
  },
  'html-images': {
    title: '6. Images & Attributes',
    content: `
# A Picture is Worth 1000 Words

Let's add some color using the \`<img>\` tag.

## Void Element
Notice something special: \`img\` has **no closing tag**.
Why? Because it doesn't hold text content inside.

\`\`\`html
<img src="cat.jpg" alt="Cute Cat">
\`\`\`

## Important Attributes:
1.  \`src\` (Source): Where is the file?
2.  \`alt\` (Alternative Text): Text to show if the image fails to load, or for screen readers.

> **Tip:** Always add \`alt\`!
    `,
     practice: [
       {
        type: 'code',
        id: 'c_img_en',
        title: 'Add an Image',
        language: 'html',
        description: 'Add an image with src `https://via.placeholder.com/150` and alt text "Sample".',
        initialCode: '<!-- Add img tag here -->',
        solution: '<img src="https://via.placeholder.com/150" alt="Sample">'
      }
    ]
  },
  'html-lists': {
    title: '7. Lists',
    content: `
# Lists

HTML has two main list types:

## 1. Unordered List - \`<ul>\`
Bulleted list.

\`\`\`html
<ul>
  <li>Milk</li>
  <li>Eggs</li>
</ul>
\`\`\`

## 2. Ordered List - \`<ol>\`
Numbered list (1, 2, 3...).

\`\`\`html
<ol>
  <li>Mix</li>
  <li>Bake</li>
</ol>
\`\`\`

Structure:
*   The wrapper is \`<ul>\` or \`<ol>\`.
*   Each item **must** be inside \`<li>\` (List Item).
    `,
    practice: [
      {
        type: 'code',
        id: 'c_lists_en',
        title: 'Shopping List',
        language: 'html',
        description: 'Create a ul with 3 items (li): Apple, Banana, Orange.',
        initialCode: '',
        solution: `<ul>
  <li>Apple</li>
  <li>Banana</li>
  <li>Orange</li>
</ul>`
      }
    ]
  },
  'css-colors': {
    title: '2. Colors & Backgrounds',
    content: `
# Colors

We can style elements using colors, hex codes, or RGB.
    `,
    practice: [
      {
        type: 'code',
        id: 'c_css_colors_en',
        title: 'Styling a Heading',
        language: 'html',
        description: 'You have an h1. Use CSS (inside the style tag) to change its text color to `blue` and background color to `yellow`.',
        initialCode: `<h1>Colorful Heading</h1>

<style>
  h1 {
    /* Write CSS here */
  }
</style>`,
        solution: `<h1>Colorful Heading</h1>

<style>
  h1 {
    color: blue;
    background-color: yellow;
  }
</style>`
      }
    ]
  },
   'js-variables': {
    title: '2. Variables',
    content: `
# Variables

Variables are containers for storing data values.
    `,
    practice: [
      {
        type: 'quiz',
        id: 'q_js_var_en',
        question: 'Which keyword defines a variable that cannot be reassigned?',
        options: ['var', 'let', 'const', 'fixed'],
        correctAnswer: 2,
        explanation: 'const stands for constant.'
      }
    ]
  }
};

export const getLessonContent = (id: string, lang: Language): { title: string; content: string; practice?: PracticeItem[] } => {
  const isHe = lang === 'he';
  const repo = isHe ? lessonContentHe : lessonContentEn;

  if (repo[id]) {
    return repo[id];
  }

  // Fallback
  return {
    title: isHe ? 'שיעור בפיתוח' : 'Lesson Under Construction',
    content: isHe 
      ? `# התוכן בבנייה
      
השיעור הזה עדיין נכתב על ידי צוות המומחים שלנו. אנא חזור מאוחר יותר!
      `
      : `# Content Coming Soon
      
This lesson is currently being written. Please check back later!
      `
  };
};