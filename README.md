# LingoGuru

Welcome to **LingoGuru**! This repository features a state-of-the-art interactive language learning application.

---

## 🌟 Project Structure

```
usability-prj/
├── src/                    # LingoGuru Frontend source code
│   ├── assets/             # Images and design assets
│   ├── components/         # Modular and reusable UI components
│   ├── config/             # Config files and constants
│   ├── context/            # React context for global state (LingoContext.tsx)
│   ├── data/               # Seed data and user initial progress maps
│   ├── pages/              # Main route pages (Auth, Exam, Grammar, Profile, etc.)
│   ├── styles/             # Modular CSS styling sheets
│   ├── types/              # TypeScript typings and interfaces
│   ├── utils/              # Helper utilities (hash router, etc.)
│   ├── App.tsx             # App shell and page routing controller
│   ├── main.tsx            # DOM root mounting script
│   └── index.css           # Global CSS variables and core theme definition
├── package.json            # Main frontend package manifest
├── vite.config.ts          # Vite compilation and bundler configuration
└── tsconfig.json           # Frontend TypeScript settings
```

---

## 🚀 LingoGuru Language Platform

**LingoGuru** is a highly interactive, responsive language learning application focusing on gamified progress across four core skills: **Grammar, Speaking, Listening, and Writing**. 

### Key Features
* 👤 **Onboarding & Authentication**: A 3-step dynamic wizard introduces the platform's key features, followed by a personalized profile creation phase (name, email, and native language setup).
* 🗺️ **Learning Path**: Track your unit-by-unit progress across different language skills. Unlock levels sequentially as you complete preceding lessons and quizzes.
* 📚 **Interactive Lessons**: Bite-sized study guides detailing specific rules, syntactic formulas, context examples, and translated phrases.
* 📝 **Gamified Quizzes (Exams)**: Challenge yourself with multiple exercise types, including:
  * **Multiple Choice**: Select correct semantic translations.
  * **Reorder Blocks**: Build sentences by organizing scrambled words.
  * **Input Exercises**: Freeform text input for spelling and grammar validation.
  * **Speaking / Listening simulations**: Practice pronunciation and comprehension.
* ⚡ **User Stats & Streaks**: Earn Experience Points (XP) per completed level, level up, and maintain daily learning streaks.
* ⚙️ **Settings & Customization**: Manage sound effects, streak reminders, desktop notifications, and easily reset user progress.
* 🌗 **Dark Mode Support**: Styled using CSS variables (`:root`) with automatic system preference detection.

### Installation & Run Commands
Ensure you are in the project root directory:

```bash
# 1. Install frontend dependencies
npm install

# 2. Run the application locally in development mode
npm run dev

# 3. Build for production (optimized output in dist/)
npm run build

# 4. Preview the production build locally
npm run preview

# 5. Run static lint checks
npm run lint
```

---

## 🎨 Technology Stack
* **Framework**: React 19 (features compiler integration enabled)
* **Build Tool**: Vite 8 (using Rolldown-based compiling optimizations)
* **Language**: TypeScript (v6.0+)
* **Icons**: Lucide React
* **Styling**: Vanilla CSS (CSS variables, nesting, container sizing, prefers-color-scheme queries)

---

## ♿ UX and Accessibility Standards
LingoGuru is designed around Level AA WCAG accessibility compliance and European Accessibility Act (EN 301 549) guidelines:
- **Semantic HTML**: Structural sections (`<header>`, `<main>`, `<section>`, `<aside>`) are declared correctly.
- **Accessible Text**: Explicit labels and descriptors are attached to interactive graphics and utility buttons.
- **Responsive Typography**: Uses fluid sizing relative to device viewport boundaries.

---

## ♻️ Iteration 3 — Corrections applied

### 1. Keyboard and screen reader navigation
- **Levels are real buttons.** `LevelNode` was a `<div onClick>`, so `Tab` skipped
  every level and only reached the header and skill buttons. It is now a `<button>`
  with an accessible name that includes the title, the number of lessons and the
  status ("locked, finish the previous level to unlock it"). Locked levels stay in
  the tab order with `aria-disabled` so they can still be discovered.
- **Skills and lessons are ARIA tab lists** (`role="tablist"` + `role="tabpanel"`)
  with a roving `tabindex`: the arrow keys move between Grammar/Speaking/Listening/
  Writing (or between the 3 lessons of a level) and `Tab` moves FORWARD into the
  content. Previously focus cycled inside the buttons and never reached the levels
  or the lesson text.
- **Explanatory text is reachable.** The new `ReadableRegion` component gives the
  description, objectives, main rule, examples and the exercise guidance a
  `role="group"`, an accessible name and one tab stop each, so a keyboard-only user
  reads the lesson instead of jumping straight to the buttons.
- **Skip links** on the learning path and the lesson page, visible on focus.
- **No more `alert()` for locked content**: the reason is announced in a polite live
  region (`role="status"`), which does not steal focus.
- **Focus management**: the route change moves focus to `<main>` and updates the
  document title; inside a practice session focus moves to the instruction of each
  new exercise.
- **Native form semantics**: multiple choice now uses real radio inputs inside a
  `<fieldset>` with the sentence as `<legend>`, so position ("2 of 3") and state are
  announced; unit titles are headings and level/lesson lists are real lists.

### 2. First level of every skill unlocked
Speaking, Listening and Writing had their level 1 gated behind the completion of
Grammar level 1. Now the first level of each of the four skills is available on the
first visit (`LingoContext.initialSkillUnits` and `data/defaultUserProgress.ts`).

### 3. Unambiguous exercises
Each exercise carries new fields (see `types/index.ts`):
`hint` (a "HOW TO ANSWER" block, focusable and wired to the field with
`aria-describedby`), `answerLabel`, `expectedFormat`, `placeholder`,
`acceptedAnswers`, `strictFormat` and `explanation` (the feedback now says WHY the
answer is correct). Typed exercises state exactly what to write ("write ONE word",
"digits only", "the same sentence as the prompt"), and `utils/answers.ts` centralizes
grading: case, punctuation and extra spaces are ignored, contractions are accepted,
and only the punctuation lessons grade capital letters and periods (`strictFormat`).

### 4. Three lessons per level in every skill
All 19 levels now follow the structure of the old Grammar level 4: **3 sub-lessons
with representative names** (for example "Third Person -s", "Negatives and
Questions", "Commas in Lists") and **3-5 own exercises each** — 57 lessons and 205
exercises in total. The XP of each level is split across its lessons, so the totals
per level did not change. Content lives in `src/config/content/` (one module per
skill) and `src/config/lessonsData.ts` only composes and queries it.

### 5. Reorder exercises fixed
Word selection is tracked by index instead of by text, so a sentence can repeat a
word ("is", "the") without breaking, each word button says what it does
("Add \"the\" to the sentence") and the sentence being built is announced in a live
region.
