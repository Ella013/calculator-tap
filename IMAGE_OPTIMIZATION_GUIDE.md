# Image Optimization Guide

## Overview
This document explains how to optimize images for the Calculator Tap website to improve performance.

## Logo Optimization

### Current Files
- `calculator tap logo.png` (~415KB) - needs optimization

### Target Files (to be created)
1. `calculator-tap-logo.webp` - WebP format (target: ≤50KB)
2. `calculator-tap-logo.png` - Optimized PNG fallback (target: ≤50KB)

### Steps to Create Optimized Logo
1. Use an image optimization tool (e.g., Squoosh, ImageOptim, or online tools)
2. Convert original PNG to WebP format with ~80-85% quality
3. Optimize PNG version with tools like:
   - TinyPNG (https://tinypng.com/)
   - ImageOptim (Mac) or FileOptimizer (Windows)
   - Squoosh (https://squoosh.app/)
4. Resize if needed (logo should fit in ~40px height display)
5. Ensure both files are ≤50KB

### File Naming
- New files use kebab-case: `calculator-tap-logo.webp` and `calculator-tap-logo.png`
- Update all references from `calculator tap logo.png` to the new names

## Favicon Optimization

### Current Files
- `favicon.ico` (~242KB) - needs replacement

### Target Files (to be created)
1. `favicon-16x16.png` - 16x16 pixels
2. `favicon-32x32.png` - 32x32 pixels
3. `apple-touch-icon.png` - 180x180 pixels (iOS)
4. `android-chrome-192x192.png` - 192x192 pixels
5. `android-chrome-512x512.png` - 512x512 pixels
6. `site.webmanifest` - Already created

### Steps to Create Favicons
1. Start with a high-quality source image (512x512 or larger)
2. Use a favicon generator (recommended tools):
   - RealFaviconGenerator (https://realfavicongenerator.net/)
   - Favicon.io (https://favicon.io/)
   - Or manually create with image editor
3. Generate all required sizes:
   - 16x16, 32x32 (for browsers)
   - 180x180 (for Apple devices)
   - 192x192, 512x512 (for Android)
4. Optimize each PNG (should be <5KB each)
5. Place all files in the root directory

### File Placement
- All favicon files should be in the project root
- The build script will copy them to `dist/` and each language folder
- HTML already updated to reference the new favicon files

## Build Process
The build script (`build.js`) has been updated to:
1. Copy optimized logo files (`calculator-tap-logo.png`, `calculator-tap-logo.webp`) to language folders
2. Copy favicon files from root to `dist/` root
3. Use `copyStaticFiles()` to copy assets to each language folder

## Testing
After creating optimized images:
1. Run `npm run build`
2. Verify images are copied correctly
3. Test in browser (check Network tab for file sizes)
4. Verify favicons appear correctly in browser tabs
5. Test WebP support (modern browsers) and PNG fallback (older browsers)

## Tools Recommendation
- **Image Compression**: TinyPNG, Squoosh, ImageOptim
- **WebP Conversion**: Squoosh, cwebp (command-line)
- **Favicon Generation**: RealFaviconGenerator, Favicon.io
- **File Size Check**: Check file sizes are within targets before committing
