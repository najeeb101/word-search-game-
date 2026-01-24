# Word Search Game

A modern, progressive word search puzzle game built with React and Firebase. Features 8 challenging levels with increasing difficulty, user authentication, progress tracking, and a beautiful dark-themed UI.

![Silatha Logo](./public/logo.png)

## Features

- 🎯 **8 Progressive Levels** - From beginner to ultimate difficulty
- 🔄 **Multiple Word Directions** - Horizontal, vertical, diagonal, and backwards
- ⏱️ **Timed Challenges** - Beat the clock in advanced levels
- 💡 **Hint System** - Limited hints to help you progress
- 📊 **Progress Tracking** - Save your best times and unlock new levels
- 🔐 **Firebase Authentication** - Anonymous or email/password login
- 📱 **Fully Responsive** - Play on desktop, tablet, or mobile
- 🎨 **Modern UI** - Dark theme with glassmorphism and smooth animations

## Tech Stack

- **Frontend**: React 18 with functional components and hooks
- **Routing**: React Router v6
- **Backend**: Firebase (Authentication + Firestore)
- **Build Tool**: Vite
- **Styling**: Vanilla CSS with CSS custom properties

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Authentication**:
   - Go to Authentication > Sign-in method
   - Enable "Anonymous" provider
   - Enable "Email/Password" provider (optional)
4. Create a **Firestore Database**:
   - Go to Firestore Database
   - Create database in production mode
   - Start in your preferred region
5. Get your Firebase config:
   - Go to Project Settings > General
   - Scroll to "Your apps" section
   - Click the web icon (</>) to create a web app
   - Copy the configuration object

### Installation

1. Clone or download this repository

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Edit `.env` and add your Firebase credentials:
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

## Firebase Security Rules

Add these security rules to your Firestore database:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      match /progress/{levelId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

## Building for Production

1. Build the production bundle:
```bash
npm run build
```

2. Preview the production build locally:
```bash
npm run preview
```

3. Deploy to your hosting service (Firebase Hosting, Vercel, Netlify, etc.)

### Firebase Hosting Deployment

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init hosting

# Build and deploy
npm run build
firebase deploy
```

## Game Controls

- **Mouse**: Click and drag to select words
- **Touch**: Touch and drag on mobile devices
- **Hint Button**: Get a hint for the next word (limited per level)

## Level Progression

| Level | Grid Size | Words | Directions | Time Limit | Hints |
|-------|-----------|-------|------------|------------|-------|
| 1 | 8×8 | 5 | H, V | None | 3 |
| 2 | 10×10 | 7 | H, V, D | None | 3 |
| 3 | 12×12 | 8 | All + Back | 5 min | 2 |
| 4 | 14×14 | 10 | All + Back | 4 min | 2 |
| 5 | 15×15 | 11 | All + Back | 3 min | 1 |
| 6 | 16×16 | 12 | All + Back | 2.5 min | 1 |
| 7 | 18×18 | 13 | All + Back | 2 min | 1 |
| 8 | 20×20 | 14 | All + Back | 1.5 min | 0 |

*H = Horizontal, V = Vertical, D = Diagonal*

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Cell.jsx        # Individual grid cell
│   ├── Grid.jsx        # Game board grid
│   ├── WordList.jsx    # Words to find sidebar
│   ├── Timer.jsx       # Game timer
│   ├── Header.jsx      # Site header
│   └── LevelSelector.jsx # Level selection grid
├── pages/              # Page components
│   ├── LandingPage.jsx
│   ├── LevelSelectionPage.jsx
│   └── GamePage.jsx
├── hooks/              # Custom React hooks
│   ├── useAuth.js      # Authentication logic
│   ├── useGameProgress.js # Progress tracking
│   └── useWordSelection.js # Word selection logic
├── utils/              # Utility functions
│   ├── wordPlacement.js # Word placement algorithm
│   ├── gridGenerator.js # Grid generation
│   └── wordValidator.js # Selection validation
├── config/             # Configuration files
│   ├── firebase.js     # Firebase initialization
│   └── levels.js       # Level definitions
├── styles/             # CSS files
│   └── *.css          # Component styles
├── App.jsx            # Main app component
└── main.jsx           # Entry point
```

## Key Design Choices

### Word Placement Algorithm
Uses a greedy random placement approach with collision detection. Words are sorted by length (longest first) to maximize placement success. Supports all 8 directions with level-based filtering.

### Selection Mechanism
Unified selection handler supporting both click-and-drag (desktop) and touch-and-drag (mobile). Validates selections in real-time and checks against all possible directions including backwards.

### Progressive Difficulty
Levels gradually introduce new mechanics:
- Levels 1-2: Learn basics with simple directions
- Level 3+: Add time pressure and backwards words
- Level 5+: Reduce hints for expert challenge
- Level 8: Ultimate test with no hints

### Firebase Integration
Anonymous authentication allows instant play without signup. Progress syncs across devices for authenticated users. Firestore structure optimized for quick reads and minimal writes.

### Responsive Design
Mobile-first CSS with grid-based layouts. Word list repositions from sidebar (desktop) to bottom panel (mobile). Touch events properly handled for drag selection.

## Troubleshooting

**Firebase errors on startup:**
- Make sure your `.env` file exists and has correct credentials
- Check that Firebase Authentication and Firestore are enabled
- Verify your Firebase security rules are deployed

**Words not being detected:**
- Ensure you're selecting in a straight line
- Try selecting in the opposite direction
- Check that the word is in the word list

**Progress not saving:**
- Verify you're signed in (check header)
- Check browser console for Firebase errors
- Ensure Firestore security rules allow writes

## License

This project is open source and available under the MIT License.

## Credits

Built with ❤️ using React and Firebase
Logo: Silatha
