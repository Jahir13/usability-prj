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
