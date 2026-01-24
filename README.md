# Word Search Game

<div align="center">

![Silatha Logo](./public/logo.png)

**A full-featured word search puzzle game with 8 levels of increasing complexity.**

[![React](https://img.shields.io/badge/React-19.2.0-61dafb?logo=react&logoColor=white)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.8.0-ffca28?logo=firebase&logoColor=white)](https://firebase.google.com/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[**🎮 Play the Game**](https://silathagame.web.app)

[📖 Documentation](#getting-started) • [🐛 Report Bug](https://github.com/najeeb101/word-search-game-/issues) • [✨ Request Feature](https://github.com/najeeb101/word-search-game-/issues)

</div>

---

## Project Motivation

This project was built with a simple goal: to create a fun, engaging, and challenging word puzzle experience. It combines modern web technologies with classic gameplay mechanics to test players' observation skills across progressively difficult levels, offering a competitive and rewarding experience for puzzle enthusiasts.

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
- Ranges from beginner to highest difficulty
- Gradual introduction of grid complexity

🔄 **Multiple Word Directions**
- Horizontal and vertical placement
- Backwards words in advanced levels

⏱️ **Progress Timer**
- Tracks completion time for each level
- Encourages performance improvement

💡 **Smart Hint System**
- Limited hints available per level
- Strategic hint usage required

</td>
<td>

📊 **Progress Tracking**
- Saves best completion times
- Unlocks new levels progressively
- Cross-device sync for authenticated users

🔐 **Firebase Authentication**
- Anonymous login for instant access
- Optional email/password registration
- Secure user data storage

📱 **Fully Responsive**
- Adapted for desktop, tablet, and mobile
- Touch-friendly interactions
- Fluid layouts

🎨 **User Interface**
- Dark theme styling
- Smooth transitions
- Clean visual design

</td>
</tr>
</table>


---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend Framework** | React 19 with functional components and hooks |
| **Routing** | React Router v6 |
| **Backend Services** | Firebase (Authentication + Firestore) |
| **Build Tool** | Vite |
| **Styling** | Vanilla CSS with CSS custom properties |
| **State Management** | React Hooks (useState, useEffect, useContext) |
| **Deployment** | Firebase Hosting |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Firebase Account**

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

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:####`

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

---

## 🎯 Game Controls

| Input Method | Action |
|--------------|--------|
| **Mouse** | Click and drag to select words |
| **Touch** | Touch and drag on mobile devices |
| **Hint Button** | Reveals the first letter of a random unfound word |
| **Timer** | Tracks your completion time |

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
| **8** | 20×20 | 14 | H, V, Back | 0 | ⭐⭐⭐⭐⭐ Highest |

**Legend:**
- **H** = Horizontal
- **V** = Vertical
- **Back** = Backwards (words can be reversed horizontally or vertically)

---

## 📁 Project Structure

```
word-search-game/
├── public/                  # Static assets
│   └── logo.png            # Application logo
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
│   │   ├── useWordSelection.js   # Word selection handling
│   ├── utils/             # Utility functions
│   │   ├── wordPlacement.js # Word placement algorithm
│   │   ├── gridGenerator.js # Grid generation logic
│   │   └── wordValidator.js # Selection validation
│   ├── config/            # Configuration files
│   │   ├── firebase.js    # Firebase initialization
│   │   └── levels.js      # Level definitions & settings
│   ├── styles/            # CSS stylesheets
│   ├── App.jsx           # Main application component
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

- **Random Placement**: Words are placed sequentially with collision checks.
- **Length-First Sorting**: Longer words are placed first to improve placement success.
- **Direction Support**: Horizontal, vertical, and their backwards variants.
- **Level-Based Filtering**: Level 1 restricts to H/V; Level 2+ enables backwards directions.

### 🖱️ Selection Mechanism

- **Unified Event Handler**: Uses a single handler logic for both mouse and touch events.
- **Real-Time Validation**: Validates selection path as the user drags.
- **Bi-Directional Checking**: Supports forward and backward selection paths.
- **Visual Feedback**: Provides immediate visual cues for selected cells.

### 📈 Progressive Difficulty

Complexity increases through the levels:

1. **Level 1**: Introductory level with horizontal and vertical words.
2. **Level 2+**: Introduces backwards words.
3. **Level 3+**: Increases grid size and word count.
4. **Level 5+**: Reduces available hints.
5. **Level 8**: Maximum difficulty with zero hints and largest grid.

---

## 🔧 Troubleshooting

### Firebase Errors

**Problem:** App crashes or shows Firebase errors.

**Solutions:**
- ✅ Verify `.env` file exists in the root directory.
- ✅ Check that all Firebase credentials in `.env` are correct.
- ✅ Ensure Firebase Authentication (Anonymous) is enabled.
- ✅ Confirm Firestore Database is created.

### Build Errors

**Problem:** `npm run build` fails.

**Solutions:**
- ✅ Delete `node_modules` and `package-lock.json`, then run `npm install`.
- ✅ Ensure you're using Node.js v16 or higher.

---

## 🤝 Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/NewFeature`).
3. Commit your changes (`git commit -m 'Add NewFeature'`).
4. Push to the branch (`git push origin feature/NewFeature`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with **React** and **Firebase**.
- Logo design: **Silatha**.

---

<div align="center">

**[⬆ Back to Top](#-word-search-game)**

Made with 💙 by [Najeeb](https://github.com/najeeb101)

</div>
