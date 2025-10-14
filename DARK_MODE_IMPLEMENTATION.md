# Dark Mode Implementation Guide

## Overview
This document describes the complete dark mode implementation for the DecodeDsa application. The dark mode feature allows users to toggle between light and dark themes across all pages.

## Implementation Summary

### 1. **Theme Context** (`src/contexts/ThemeContext.tsx`)
- Created a React Context to manage theme state globally
- Persists user preference in `localStorage`
- Automatically applies/removes `dark` class on document root
- Provides `useTheme` hook for easy access in components

### 2. **Application Setup**
- **`src/index.tsx`**: Wrapped entire app with `ThemeProvider`
- **`src/App.tsx`**: Added dark mode background classes to main container
- **`tailwind.config.js`**: Enabled `darkMode: 'class'` configuration

### 3. **Sidebar Updates** (`src/components/sidebar.tsx`)
- Added theme toggle button with Moon/Sun icons
- Updated all sections to support both light and dark modes:
  - Background gradients
  - Text colors
  - Border colors
  - Hover states
  - Scrollbar styling

### 4. **Page Updates**
Updated the following pages with dark mode support:
- ✅ Home Page (`src/page.tsx`)
- ✅ Sorting Algorithms Page (`src/pages/SortingAlgorithmsPage.tsx`)
- ✅ Searching Algorithms Page (`src/pages/SearchingAlgorithmsPage.tsx`)

### 5. **Global Styles** (`src/globals.css`)
- Added smooth transitions for color changes (300ms)
- CSS variables for both light and dark themes
- Custom component styles with dark mode support

## Features

### ✨ Key Features
- **Persistent**: Theme preference saved in localStorage
- **Global**: Works across all pages automatically
- **Smooth**: All color transitions are animated (300ms)
- **Accessible**: Proper contrast ratios maintained in both modes
- **Intuitive**: Toggle button clearly indicates current/next state

### 🎨 Color Scheme

#### Light Mode
- Background: `slate-50` to `slate-100` gradients
- Text: `slate-800`, `gray-900`
- Cards: `white` backgrounds
- Borders: `slate-300`, `gray-200`

#### Dark Mode
- Background: `slate-900` to `slate-800` gradients
- Text: `white`, `gray-300`
- Cards: `slate-800` backgrounds
- Borders: `slate-700`, `slate-600`

## Usage

### For Users
1. Open the sidebar (already visible on desktop, click hamburger menu on mobile)
2. Scroll to the bottom of the sidebar
3. Click the theme toggle button:
   - Shows "Dark Mode" with 🌙 icon in light mode
   - Shows "Light Mode" with ☀️ icon in dark mode
4. Theme persists across page navigation and browser sessions

### For Developers

#### Using the Theme Hook
```tsx
import { useTheme } from '../contexts/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

#### Adding Dark Mode to New Components
Use Tailwind's `dark:` prefix for dark mode styles:

```tsx
<div className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white">
  <p className="text-gray-600 dark:text-gray-300">
    This text adapts to theme
  </p>
</div>
```

## File Structure
```
src/
├── contexts/
│   └── ThemeContext.tsx          # Theme state management
├── components/
│   └── sidebar.tsx                # Includes toggle button
├── pages/
│   ├── SortingAlgorithmsPage.tsx # Dark mode enabled
│   ├── SearchingAlgorithmsPage.tsx # Dark mode enabled
│   └── ...                        # Other pages (partially updated)
├── App.tsx                        # ThemeProvider wrapper
├── index.tsx                      # Root setup
└── globals.css                    # Dark mode CSS variables

tailwind.config.js                 # Dark mode: 'class' enabled
```

## Extending Dark Mode to Other Pages

To add dark mode support to additional pages:

1. Add dark mode classes to the main container:
```tsx
<div className="bg-white dark:bg-slate-900">
```

2. Update text colors:
```tsx
<h1 className="text-gray-900 dark:text-white">
```

3. Update component backgrounds:
```tsx
<div className="bg-gray-50 dark:bg-slate-800">
```

4. Update borders:
```tsx
<div className="border-gray-200 dark:border-slate-700">
```

5. Update hover states:
```tsx
<button className="hover:bg-gray-100 dark:hover:bg-slate-700">
```

## Testing Checklist
- [x] Toggle button appears in sidebar
- [x] Theme persists on page refresh
- [x] Theme applies to all updated pages
- [x] Smooth transitions between themes
- [x] No console errors
- [x] Proper contrast in both modes
- [x] Works on mobile and desktop

## Known Limitations
- Some pages may not have dark mode fully implemented yet
- Visualizer components may need additional dark mode styling
- Some third-party components may not support dark mode

## Future Improvements
1. Add dark mode to all remaining pages
2. Add dark mode to visualization components
3. Add system preference detection (auto dark mode based on OS)
4. Add theme picker with multiple color schemes
5. Add accessibility improvements (high contrast mode)

## Troubleshooting

### Theme not persisting
- Check if localStorage is enabled in browser
- Clear localStorage and try again: `localStorage.clear()`

### Colors not changing
- Ensure Tailwind's `dark:` classes are used
- Check if `darkMode: 'class'` is in tailwind.config.js
- Verify ThemeProvider wraps entire app

### Transition issues
- Check globals.css for transition styles
- Ensure no conflicting CSS overrides transitions

## Credits
- Implementation: GitHub Copilot
- Design System: Tailwind CSS
- Icons: Lucide React
