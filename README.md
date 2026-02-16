# Better Timer - Progressive Web App

A powerful timer web application with advanced snooze controls designed to prevent accidental dismissal.

## Features

### ⏰ Timer Functionality
- Set custom timer duration (minutes and seconds)
- Large, clear countdown display
- Visual progress bar showing time elapsed
- Stop and reset controls

### 🎯 Advanced Snooze Control
The unique feature of this app is the **3x3 Drag Grid Snooze Control**:
- When the timer completes, a modal overlay appears with a 3x3 grid of circles
- One circle is randomly designated as the **origin** (blue with ▶ symbol)
- Another circle is randomly designated as the **destination** (red with ⬤ symbol)
- To snooze the alarm, you must:
  1. **Long-press** the blue origin circle (800ms)
  2. **Drag** to the red destination circle
  3. **Release** on the destination

This gesture-based control makes it nearly impossible to dismiss the alarm accidentally, ensuring you're fully awake and aware when handling important timers.

### 📱 Progressive Web App (PWA)
- **Installable** on iOS home screen
- **Offline support** via Service Worker
- **App-like experience** with standalone display mode
- **Optimized for mobile** with touch-friendly interface
- **Notification support** (when alarm triggers)

### 🎨 User Interface
- Beautiful gradient background
- Glassmorphism design with frosted glass effects
- Responsive layout that works on all screen sizes
- Smooth animations and transitions
- Dark overlay for alarm modal prevents distractions

### 🔊 Audio Alerts
- Web Audio API-generated alarm sound
- Alternating tones (880Hz and 440Hz) for attention-grabbing alert
- Continues until snooze gesture is completed

## Installation

### iOS Installation
1. Open Safari and navigate to the app URL
2. Tap the Share button
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add" to confirm
5. The app icon will appear on your home screen

### Android Installation
1. Open Chrome and navigate to the app URL
2. Tap the menu (⋮) button
3. Tap "Add to Home Screen" or "Install app"
4. Tap "Add" to confirm

## Usage

### Starting a Timer
1. Enter the desired duration in minutes and seconds
2. Tap "Start Timer"
3. The countdown begins with a visual progress bar

### When Timer Completes
1. An alarm sound plays
2. The snooze grid modal appears with random positions
3. Long-press the BLUE circle (▶)
4. While holding, drag your finger to the RED circle (⬤)
5. Release to snooze for 5 minutes

### Stopping the Timer
- During countdown: Tap "Stop Timer" to cancel
- Tap "Reset Timer" to return to setup screen

## Technical Details

### Technologies Used
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **Vanilla JavaScript** - No frameworks, pure ES6+
- **Service Worker API** - Offline caching
- **Web Audio API** - Alarm sound generation
- **Touch Events API** - Drag gesture detection

### Project Structure
```
better-timer-webapp/
├── public/
│   ├── index.html           # Main HTML file
│   ├── app.js              # Application logic
│   ├── service-worker.js   # PWA service worker
│   ├── manifest.webmanifest # PWA manifest
│   └── icons/              # App icons
├── package.json            # Project metadata
└── README.md              # This file
```

### Browser Compatibility
- ✅ Safari (iOS 11.3+)
- ✅ Chrome (Android/Desktop)
- ✅ Firefox (Desktop/Mobile)
- ✅ Edge (Desktop/Mobile)

### Key Features for Accidental Dismissal Prevention
1. **Long-press requirement** - 800ms hold prevents quick taps
2. **Random positions** - Different each time, requires attention
3. **Drag gesture** - Must drag from origin to destination
4. **Modal overlay** - Blocks all other UI interactions
5. **No dismiss button** - Only the drag gesture works

## Development

### Running Locally
```bash
npm start
# Server runs at http://localhost:8080
```

### Testing
Open the app in a browser and:
1. Set a short timer (e.g., 10 seconds)
2. Wait for the alarm
3. Test the drag gesture on the snooze grid
4. Verify the timer snoozes for 5 minutes

## Deployment

### GitHub Pages Deployment
This repository is configured to automatically deploy to GitHub Pages when changes are pushed to the `main` branch.

#### Setting up GitHub Pages (One-time setup)
1. Go to your repository settings on GitHub
2. Navigate to "Pages" in the left sidebar
3. Under "Build and deployment":
   - Source: Select "GitHub Actions"
4. The workflow will automatically deploy on the next push to `main`

Once deployed, your app will be available at:
- `https://[username].github.io/better-timer-webapp/` (for project pages)
- Or your custom domain if configured

The deployment includes:
- Automatic build and deployment on push to `main`
- Manual deployment option via GitHub Actions UI
- Optimized caching for PWA features
- Support for custom domains

## License
MIT

## Future Enhancements
- Multiple timer presets
- Custom snooze duration
- Additional gesture patterns (swipe, pattern drawing)
- Timer history and statistics
- Multiple difficulty levels for snooze control
- Sound customization options
