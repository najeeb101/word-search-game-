# CLAUDE.md — Project Memory for AI Assistants

## Project Overview

**Silatha Word Search Game** is a browser-based word search puzzle game themed around women's empowerment, health awareness, and workplace equality. Players locate hidden words in a letter grid across 6 progressively harder levels. The game is deployed at [silathagame.web.app](https://silathagame.web.app) and built with React + Firebase.

The educational angle is central: every word in every level is drawn from topics such as women's health conditions (e.g., ENDOMETRIOSIS, PMDD), workplace inequality concepts (e.g., GLASSCLIFF, TOKENISM), and empowerment vocabulary (e.g., INTERSECTIONALITY, AGENCY).

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | React 19 (functional components + hooks) |
| Routing | React Router DOM v7 |
| Build tool | Vite 7 |
| Backend / Auth | Firebase Authentication (anonymous + email/password) |
| Database | Cloud Firestore |
| Hosting | Firebase Hosting |
| Styling | Vanilla CSS with CSS custom properties (no CSS-in-JS, no Tailwind) |
| State management | React built-in hooks only (`useState`, `useEffect`, `useContext`, `useMemo`, `useCallback`, `useRef`) |
| Linting | ESLint 9 (flat config) with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh` |

No testing framework is currently configured.

---

## Project Structure

```
word-search-game/
├── index.html                  # Vite entry HTML
├── vite.config.js              # Vite config (React plugin only)
├── firebase.json               # Firebase Hosting config
├── eslint.config.js            # ESLint flat config
├── package.json
│
├── public/
│   └── logo.png                # App logo (Silatha branding)
│
└── src/
    ├── main.jsx                # React DOM entry point
    ├── App.jsx                 # Root component — router + AuthProvider setup
    ├── App.css
    │
    ├── assets/                 # Static assets imported by components
    │
    ├── components/             # Reusable UI components
    │   ├── AuthContext.jsx     # React Context providing `user` and `loading` state
    │   ├── Cell.jsx            # Single grid cell; handles visual states (selected, found, hinted)
    │   ├── Grid.jsx            # Game board; maps grid data → Cell components; handles mouse/touch events
    │   ├── Header.jsx          # Page header / navigation bar
    │   ├── LevelSelector.jsx   # Compact level card used in LevelSelectionPage
    │   ├── ProtectedRoute.jsx  # Route guard; redirects unauthenticated users to /login
    │   ├── Timer.jsx           # Count-up timer displayed during gameplay
    │   └── WordList.jsx        # Sidebar list of words to find; marks found words
    │
    ├── config/
    │   ├── firebase.js         # Firebase app init; exports `auth` and `db`
    │   └── levels.js           # Single source of truth for all level definitions and helper functions
    │
    ├── hooks/
    │   ├── useAuth.js          # Firebase Auth actions (signInAnon, signIn, signUp, signOut) + state
    │   ├── useGameProgress.js  # Reads/writes Firestore progress per user per level
    │   └── useWordSelection.js # Drag-selection state machine (start → extend → end/validate)
    │
    ├── pages/
    │   ├── LandingPage.jsx     # Public home/splash page with CTA
    │   ├── LoginPage.jsx       # Email/password login + anonymous login
    │   ├── SignupPage.jsx      # Email/password registration
    │   ├── LevelSelectionPage.jsx  # Grid of all 6 levels with lock/unlock state
    │   └── GamePage.jsx        # Main gameplay: grid, word list, timer, hints, victory modal
    │
    ├── styles/                 # One CSS file per component/page (co-located by name)
    │   └── *.css
    │
    └── utils/
        ├── gridGenerator.js    # Orchestrates grid creation: places words then fills noise letters
        ├── wordPlacement.js    # Low-level word placement with 8-directional support + bounds checking
        └── wordValidator.js    # Validates a drag selection: straight-line check + word extraction/matching
```

---

## Coding Conventions

- **Component style**: Functional components only. No class components.
- **File naming**: PascalCase for components and pages (`.jsx`), camelCase for hooks and utilities (`.js`).
- **Exports**: Named exports for hooks, utilities, and context. Default exports for page and component files.
- **Imports**: CSS is imported directly inside the component file that owns the styles.
- **JSDoc**: Utility functions include JSDoc comments (`@param`, `@returns`). Components use inline comments instead.
- **`useCallback` / `useMemo`**: Used consistently in `GamePage.jsx` to prevent unnecessary re-renders and grid regeneration.
- **Refs for stale closures**: `useWordSelection` uses a `useRef` mirror of state to avoid stale closure bugs in event handlers (e.g., `mouseup`).
- **ESLint rule**: `no-unused-vars` is configured to ignore names matching `/^[A-Z_]/` (uppercase constants).
- **Environment variables**: All Firebase credentials are accessed via `import.meta.env.VITE_*`; never hard-coded.
- **No TypeScript**: The project is plain JavaScript/JSX. Type annotations appear only in JSDoc.
- **CSS**: Each component has a dedicated `.css` file in `src/styles/`. No shared utility classes framework.

---

## Data Sources / APIs

### Firebase Authentication
- **Anonymous sign-in** — allows instant play without registration.
- **Email/Password sign-in** — optional, for persistent cross-device progress.
- Auth state is observed via `onAuthStateChanged` in both `AuthContext.jsx` and `useAuth.js`.

### Cloud Firestore Schema

```
users/{userId}
  lastPlayed: Timestamp
  currentLevel: number

users/{userId}/progress/{levelId}
  levelId: number
  completed: boolean
  bestTime: number (seconds)
  attempts: number
  completedAt: Timestamp
```

- Progress is loaded per-level on mount in `useGameProgress`.
- Best time is only updated if the new time is faster than the stored `bestTime`.

### Level Configuration (`src/config/levels.js`)
All game content is statically defined — no external content API. Words, grid sizes, hint counts, and level metadata live in the `LEVELS` array. Adding a new level means appending an object to that array.

---

## Main Workflows

### App Initialization
1. `main.jsx` renders `<App />` into `#root`.
2. `App.jsx` wraps all routes in `<AuthProvider>` (blocks render until auth state resolves).
3. `ProtectedRoute` redirects unauthenticated users to `/login`.

### Authentication Flow
- Landing page → Login page (email/password or anonymous).
- `useAuth` provides `signIn`, `signUp`, `signInAnon`, and `signOut`.
- On success, React Router navigates to `/levels`.

### Level Selection
- `LevelSelectionPage` calls `useGameProgress(userId)` to load all level states.
- `isLevelUnlocked(levelId, progress)` disables locked levels (each level requires the previous to be `completed: true`).

### Gameplay Loop (`GamePage.jsx`)
1. `levelId` param is read from URL.
2. `getLevelById` fetches the level config.
3. `generateGrid(words, gridSize, levelId)` is called inside `useMemo` — only runs when the level changes.
4. `useWordSelection` manages the drag state machine (mousedown → mousemove → mouseup / touchstart → touchmove → touchend).
5. On drag end, `validateSelection` checks: valid straight line → extract letters → match against word list.
6. Found words accumulate in `foundWords` state.
7. When `foundWords.length === level.words.length`, victory is triggered and `saveCompletion` writes to Firestore.
8. A count-up timer runs in a `setInterval` while `isGameActive` is true.

### Grid Generation
- `gridGenerator.js` sorts words longest-first, calls `tryPlaceWord` for each.
- `wordPlacement.js` supports all 8 directions (horizontal, vertical, both diagonals, and their reverses).
- Empty cells are filled with a weighted random letter set (more vowels / common consonants).

---

## Goals of the Project

1. Educate players about women's health, empowerment, and workplace equality through curated vocabulary.
2. Provide a polished, fully responsive game experience on desktop, tablet, and mobile.
3. Track player progress persistently (Firestore) with cross-device sync for registered users.
4. Keep the barrier to entry low via anonymous auth (no forced registration).
5. Scale difficulty gradually across 6 levels (grid size: 10×10 → 18×18; word complexity increases).

---

## Instructions for AI Assistants Working on This Repo

### Before Making Changes
- **Read `src/config/levels.js` first** — it is the single source of truth for level data. Changes to words, grid sizes, or hints belong here.
- **Check `src/utils/gridGenerator.js` and `wordPlacement.js`** before touching grid logic — the two files are tightly coupled.
- **Do not add a state management library** (Redux, Zustand, etc.) without strong justification. The current hook-based approach is intentional.

### Environment Variables
The project requires a `.env` file (not committed) with these keys:
```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```
Never hard-code these values.

### Running Locally
```bash
npm install
npm run dev        # development server (Vite HMR)
npm run build      # production build → dist/
npm run preview    # preview production build
npm run lint       # ESLint check
```

### Adding a New Level
1. Append a new object to the `LEVELS` array in `src/config/levels.js`.
2. Follow the existing schema: `id`, `name`, `gridSize`, `words`, `timeLimit`, `hints`, `description`.
3. `MAX_LEVEL_ID` is derived automatically from `LEVELS.length`.
4. No other files need updating for basic level addition.

### Styling
- Create a new `.css` file in `src/styles/` for any new component.
- Import it inside the component file itself.
- Follow the existing dark-theme variable conventions visible in `src/styles/index.css`.

### Firebase / Firestore
- Firestore reads/writes are isolated to `useGameProgress.js`. Keep persistence logic there.
- Auth logic lives in `useAuth.js` and `AuthContext.jsx` — avoid calling Firebase Auth API directly from pages.

---

## Notes for Future Development

- **No test suite exists.** Adding Vitest + React Testing Library would be a natural first step for stability.
- **`timeLimit` is always `null`** in current level configs — the field exists but the count-down path is partially scaffolded. A future feature could enforce per-level time limits.
- **Word directions** are currently all 8 directions for every level despite the comment suggesting level-gated directions. The `getAllowedDirections` function in `wordPlacement.js` could be wired to restrict directions on early levels for gentler onboarding.
- **Hint system** decrements `hintsRemaining` but the hint-reveal logic is in `GamePage.jsx`. It could be extracted into a dedicated `useHints` hook for maintainability.
- **Anonymous → registered account linking** (Firebase `linkWithCredential`) is not implemented — anonymous users lose progress if they later create an account.
- **No offline support.** A service worker / PWA manifest could cache the app shell and enable offline play.
- **Word list is hard-coded.** A CMS or Firestore-backed word bank would allow content updates without a code deploy.
- **Accessibility**: Keyboard navigation for the grid is not implemented. Drag-selection via keyboard would be a meaningful a11y improvement.
