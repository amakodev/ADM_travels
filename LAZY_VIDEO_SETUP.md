# LazyVideo Component Setup Guide

## 📋 Overview

The `LazyVideo` component has been created to optimize video loading in the Tours section, especially for mobile devices. Videos now only load when visible in the viewport, saving bandwidth and improving performance.

## ✅ Features Implemented

### 1. **Lazy Loading with Intersection Observer**
   - Videos only load when they enter or are near the viewport (50px margin)
   - Prevents unnecessary bandwidth usage
   - Improves initial page load time

### 2. **Mobile-Specific Animations**
   - Slide-in animation (from left) on mobile devices (max-width: 768px)
   - Fade-in animation on desktop
   - Smooth, performant animations using Framer Motion

### 3. **Placeholder System**
   - Gray placeholder with loading spinner shown before video loads
   - Optional poster image support
   - Prevents layout shift

### 4. **Performance Optimizations**
   - `loading="lazy"` attribute on iframe
   - `preload="metadata"` for efficient loading
   - Videos don't autoplay until visible
   - Proper aspect ratio to prevent layout shift

### 5. **Mobile-Friendly Layout**
   - Cards stack vertically on mobile
   - Proper spacing and padding
   - Full-width cards on mobile for better viewing

## 📁 File Structure

```
src/
├── components/
│   ├── LazyVideo.jsx          ← New reusable component
│   └── Tours.jsx              ← Uses LazyVideo (via videos.jsx)
├── styles/
│   ├── LazyVideo.css          ← New styles for LazyVideo
│   └── Tour.css               ← Updated mobile styles
└── videos.jsx                 ← Updated to use LazyVideo
```

## 🔧 Component Location

**LazyVideo Component:** `src/components/LazyVideo.jsx`

This is a reusable component that can be used anywhere in your project where you need lazy-loaded videos.

## 📝 Usage

### Basic Usage

```jsx
import LazyVideo from './components/LazyVideo';

<LazyVideo
  videoId="1134270977"
  title="Nature Tours"
  autoplay={true}
  loop={true}
  muted={true}
/>
```

### With Poster Image

```jsx
<LazyVideo
  videoId="1134270977"
  title="Nature Tours"
  poster="/images/nature-poster.jpg"
  autoplay={true}
  loop={true}
  muted={true}
/>
```

## 🎯 How It Works

1. **Initial State**: Component renders with a placeholder (gray box with spinner)
2. **Visibility Detection**: Intersection Observer watches for when component enters viewport
3. **Loading Trigger**: When visible (within 50px), video starts loading after 100ms delay
4. **Animation**: On mobile, video slides in from left with fade. On desktop, just fades in
5. **Autoplay**: Video only autoplays when visible and loaded

## 📱 Mobile Optimizations

- **Stack Layout**: Cards stack vertically on mobile (max-width: 768px)
- **Full Width**: Cards take 100% width on mobile
- **Slide Animation**: Smooth slide-in from left on mobile
- **Reduced Spacing**: Optimized gaps and padding for mobile screens
- **Performance**: Videos only load when scrolled into view

## ⚙️ Configuration Options

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `videoId` | string | required | Vimeo video ID |
| `title` | string | "Video" | Accessibility title |
| `poster` | string | null | Optional poster image URL |
| `autoplay` | boolean | true | Autoplay when visible |
| `loop` | boolean | true | Loop video |
| `muted` | boolean | true | Mute video |

## 🎨 Styling

The component includes:
- Placeholder with animated spinner
- Smooth transitions
- Mobile-responsive design
- Proper aspect ratio (16:9)
- No layout shift

## 🔍 Performance Benefits

1. **Bandwidth Savings**: Videos only load when needed
2. **Faster Initial Load**: No video loading on page load
3. **Better Mobile Experience**: Reduced data usage on mobile
4. **Smooth Scrolling**: No performance impact from off-screen videos
5. **Battery Life**: Less processing power used

## 📊 Browser Support

- Modern browsers with Intersection Observer support
- Fallback for older browsers (videos still load, just not lazy)
- Mobile browsers (iOS Safari, Chrome Mobile, etc.)

## 🚀 Next Steps (Optional Enhancements)

1. **Add Poster Images**: Add poster images to `posterImages` object in `videos.jsx`
2. **Error Handling**: Add error states if video fails to load
3. **Playback Controls**: Add optional playback controls for user interaction
4. **Analytics**: Track video load and play events

## 📍 Current Implementation

The component is already integrated into:
- ✅ `src/videos.jsx` - All category videos use LazyVideo
- ✅ `src/components/Tours.jsx` - Uses videos from videos.jsx
- ✅ Mobile styles updated in `Tour.css`

## 🧪 Testing

To test the lazy loading:
1. Open browser DevTools (Network tab)
2. Load the Tours page
3. Scroll down slowly
4. Watch videos load only when they enter the viewport
5. On mobile, verify slide-in animation works

## 📞 Support

For questions or issues:
- Check component props in `LazyVideo.jsx`
- Review Intersection Observer settings (rootMargin, threshold)
- Verify mobile breakpoint (768px) matches your needs

---

**Last Updated:** January 2024
**Component Version:** 1.0.0

