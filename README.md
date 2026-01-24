# 🎯 Word Search Game

<div align="center">

![Silatha Logo](./public/logo.png)

**A modern, progressive word search puzzle game with 8 challenging levels**

[![React](https://img.shields.io/badge/React-19.2.0-61dafb?logo=react&logoColor=white)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.8.0-ffca28?logo=firebase&logoColor=white)](https://firebase.google.com/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[📖 Documentation](#getting-started) • [🐛 Report Bug](https://github.com/najeeb101/word-search-game-/issues) • [✨ Request Feature](https://github.com/najeeb101/word-search-game-/issues)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🎮 Demo](#-demo)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Firebase Setup](#firebase-setup)
  - [Installation](#installation)
- [🔒 Firebase Security Rules](#-firebase-security-rules)
- [📦 Building for Production](#-building-for-production)
- [🎯 Game Controls](#-game-controls)
- [📊 Level Progression](#-level-progression)
- [📁 Project Structure](#-project-structure)
- [🎨 Key Design Choices](#-key-design-choices)
- [🔧 Troubleshooting](#-troubleshooting)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

<table>
<tr>
<td>

🎯 **8 Progressive Levels**
- From beginner to ultimate difficulty
- Gradual introduction of new mechanics

🔄 **Multiple Word Directions**
- Horizontal and vertical placement
- Backwards words in advanced levels

⏱️ **Progress Timer**
- Track how long it takes to complete each level
- Challenge yourself to beat your best time

💡 **Smart Hint System**
- Limited hints per level
- Strategic hint usage required

</td>
<td>

📊 **Progress Tracking**
- Save your best times
- Unlock new levels progressively
- Cross-device sync for authenticated users

🔐 **Firebase Authentication**
- Anonymous login for instant play
- Optional email/password registration
- Secure user data storage

📱 **Fully Responsive**
- Optimized for desktop, tablet, and mobile
- Touch-friendly controls
- Adaptive layouts

🎨 **Modern UI**
- Dark theme with glassmorphism
- Smooth animations and transitions
- Premium visual design

</td>
</tr>
</table>

---

## 🎮 Demo

> **Note:** Add screenshots or a GIF of your game in action here!

<!-- Uncomment and add your screenshots
<div align="center">
  <img src="./docs/screenshots/landing-page.png" alt="Landing Page" width="45%">
  <img src="./docs/screenshots/game-play.png" alt="Game Play" width="45%">
</div>
-->

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend Framework** | React 18 with functional components and hooks |
| **Routing** | React Router v6 |
| **Backend Services** | Firebase (Authentication + Firestore) |
| **Build Tool** | Vite |
| **Styling** | Vanilla CSS with CSS custom properties |
| **State Management** | React Hooks (useState, useEffect, useContext) |
| **Deployment** | Firebase Hosting (or any static hosting) |

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Firebase Account** - [Sign up](https://firebase.google.com/)

### Firebase Setup

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project" and follow the setup wizard

2. **Enable Authentication**
   - Navigate to **Authentication** → **Sign-in method**
   - Enable **Anonymous** provider (required)
   - Enable **Email/Password** provider (optional)

3. **Create Firestore Database**
   - Navigate to **Firestore Database**
   - Click "Create database"
   - Choose **Production mode**
   - Select your preferred region

4. **Get Firebase Configuration**
   - Go to **Project Settings** → **General**
   - Scroll to "Your apps" section
   - Click the web icon (`</>`) to register a web app
   - Copy the configuration object

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/najeeb101/word-search-game-.git
   cd word-search-game-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Edit `.env` file** with your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Start playing! 🎮

---

## 🔒 Firebase Security Rules

To secure your Firestore database, add these rules in the Firebase Console:

**Navigate to:** Firestore Database → Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User documents - users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // User progress subcollection
      match /progress/{levelId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

**Important:** Click "Publish" after adding the rules.

---

## 📦 Building for Production

### Build the Application

```bash
# Create optimized production build
npm run build

# Preview the production build locally
npm run preview
```

The build output will be in the `dist/` directory.

### Deploy to Firebase Hosting

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase Hosting (first time only)
firebase init hosting
# Select your project
# Set public directory to: dist
# Configure as single-page app: Yes
# Set up automatic builds with GitHub: Optional

# Build and deploy
npm run build
firebase deploy
```

### Deploy to Other Platforms

- **Vercel**: Connect your GitHub repo and deploy automatically
- **Netlify**: Drag and drop the `dist` folder or connect via Git
- **GitHub Pages**: Use `gh-pages` package to deploy the `dist` folder

---

## 🎯 Game Controls

| Input Method | Action |
|--------------|--------|
| **Mouse** | Click and drag to select words |
| **Touch** | Touch and drag on mobile devices |
| **Hint Button** | Reveals the first letter of a random unfound word |
| **Timer** | Tracks your completion time |

### How to Play

1. **Select a level** from the level selection screen
2. **Find all words** listed on the right (desktop) or bottom (mobile)
3. **Click/touch and drag** across letters to select a word
4. **Release** when you've selected the entire word
5. **Use hints wisely** - they're limited!
6. **Complete all words** to unlock the next level and save your best time

---

## 📊 Level Progression

| Level | Grid Size | Words | Directions | Hints | Difficulty |
|:-----:|:---------:|:-----:|:-----------|:-----:|:----------:|
| **1** | 8×8 | 5 | H, V | 3 | ⭐ Beginner |
| **2** | 10×10 | 7 | H, V, Back | 3 | ⭐⭐ Easy |
| **3** | 12×12 | 8 | H, V, Back | 2 | ⭐⭐⭐ Medium |
| **4** | 14×14 | 10 | H, V, Back | 2 | ⭐⭐⭐ Medium+ |
| **5** | 15×15 | 11 | H, V, Back | 1 | ⭐⭐⭐⭐ Hard |
| **6** | 16×16 | 12 | H, V, Back | 1 | ⭐⭐⭐⭐ Hard+ |
| **7** | 18×18 | 13 | H, V, Back | 1 | ⭐⭐⭐⭐⭐ Expert |
| **8** | 20×20 | 14 | H, V, Back | 0 | ⭐⭐⭐⭐⭐ Ultimate |

**Legend:**
- **H** = Horizontal
- **V** = Vertical
- **Back** = Backwards (words can be reversed horizontally or vertically)

---

## 📁 Project Structure

```
word-search-game/
├── public/                  # Static assets
│   └── logo.png            # Silatha logo
├── src/
│   ├── components/         # Reusable React components
│   │   ├── Cell.jsx       # Individual grid cell component
│   │   ├── Grid.jsx       # Game board grid container
│   │   ├── WordList.jsx   # Words to find display
│   │   ├── Timer.jsx      # Countdown timer component
│   │   ├── Header.jsx     # Application header with auth
│   │   └── LevelSelector.jsx # Level selection grid
│   ├── pages/             # Page-level components
│   │   ├── LandingPage.jsx      # Welcome/home page
│   │   ├── LevelSelectionPage.jsx # Level chooser
│   │   └── GamePage.jsx         # Main game interface
│   ├── hooks/             # Custom React hooks
│   │   ├── useAuth.js            # Authentication logic
│   │   ├── useGameProgress.js    # Progress tracking & saving
│   │   └── useWordSelection.js   # Word selection handling
│   ├── utils/             # Utility functions
│   │   ├── wordPlacement.js # Word placement algorithm
│   │   ├── gridGenerator.js # Grid generation logic
│   │   └── wordValidator.js # Selection validation
│   ├── config/            # Configuration files
│   │   ├── firebase.js    # Firebase initialization
│   │   └── levels.js      # Level definitions & settings
│   ├── styles/            # CSS stylesheets
│   │   └── *.css         # Component-specific styles
│   ├── App.jsx           # Main application component
│   ├── App.css           # Global app styles
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global CSS variables & resets
├── .env.example          # Environment variables template
├── .firebaserc           # Firebase project configuration
├── firebase.json         # Firebase hosting configuration
├── vite.config.js        # Vite build configuration
├── package.json          # Project dependencies
└── README.md            # This file
```

---

## 🎨 Key Design Choices

### 🧩 Word Placement Algorithm

- **Greedy Random Placement**: Words are placed one at a time with collision detection
- **Length-First Sorting**: Longer words are placed first to maximize success rate
- **4-Direction Support**: Horizontal, vertical, and their backwards variants
- **Level-Based Filtering**: Level 1 uses only H/V, Level 2+ adds backwards directions

### 🖱️ Selection Mechanism

- **Unified Event Handler**: Single handler for both mouse and touch events
- **Real-Time Validation**: Selection is validated as the user drags
- **Bi-Directional Checking**: Checks both forward and backward directions
- **Visual Feedback**: Immediate highlighting of selected cells

### 📈 Progressive Difficulty

The game introduces complexity gradually:

1. **Level 1**: Learn the basics with horizontal and vertical words only
2. **Level 2+**: Introduce backwards words for added challenge
3. **Level 3+**: Larger grids with more words to find
4. **Level 5+**: Reduce hints to increase difficulty
5. **Level 8**: Ultimate test with no hints and the largest grid

### 🔥 Firebase Integration

- **Anonymous Authentication**: Play instantly without signup
- **Optional Registration**: Create an account to sync progress across devices
- **Optimized Firestore Structure**: Minimal reads/writes for cost efficiency
- **Security Rules**: User data is protected and isolated

### 📱 Responsive Design

- **Mobile-First CSS**: Designed for mobile, enhanced for desktop
- **Adaptive Layouts**: Word list repositions from sidebar to bottom panel
- **Touch Optimization**: Proper touch event handling for drag selection
- **Viewport Constraints**: Grid scales to fit screen without scrolling

---

## 🔧 Troubleshooting

### Firebase Errors on Startup

**Problem:** App crashes or shows Firebase errors

**Solutions:**
- ✅ Verify `.env` file exists in the root directory
- ✅ Check that all Firebase credentials are correct
- ✅ Ensure Firebase Authentication is enabled (Anonymous provider)
- ✅ Confirm Firestore Database is created
- ✅ Verify security rules are deployed

### Words Not Being Detected

**Problem:** Selected words aren't being recognized

**Solutions:**
- ✅ Ensure you're selecting in a straight line (no curves)
- ✅ Try selecting the word in the opposite direction
- ✅ Verify the word is in the "Words to Find" list
- ✅ Check that you're selecting the complete word

### Progress Not Saving

**Problem:** Game progress doesn't persist

**Solutions:**
- ✅ Verify you're signed in (check the header)
- ✅ Open browser console (F12) and check for Firebase errors
- ✅ Ensure Firestore security rules allow writes for your user
- ✅ Check your internet connection

### Build Errors

**Problem:** `npm run build` fails

**Solutions:**
- ✅ Delete `node_modules` and `package-lock.json`, then run `npm install`
- ✅ Ensure you're using Node.js v16 or higher
- ✅ Check for any ESLint errors with `npm run lint`

### Deployment Issues

**Problem:** Deployed app shows blank page

**Solutions:**
- ✅ Ensure environment variables are set in your hosting platform
- ✅ Check that the build directory is set to `dist`
- ✅ Configure as a single-page application (SPA)
- ✅ Verify Firebase configuration is correct in production

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Ideas for Contributions

- 🎨 Additional themes (light mode, custom color schemes)
- 🌍 Internationalization (i18n) support
- 🏆 Global leaderboard functionality
- 📊 Statistics and analytics dashboard
- 🎵 Sound effects and background music
- 🎮 Additional game modes (timed sprint, endless mode)
- 📱 Progressive Web App (PWA) features

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with ❤️ using **React** and **Firebase**
- Logo design: **Silatha**
- Inspired by classic word search puzzles
- Thanks to all contributors and players!

---

<div align="center">

**[⬆ Back to Top](#-word-search-game)**

Made with 💙 by [Najeeb](https://github.com/najeeb101)

</div>
