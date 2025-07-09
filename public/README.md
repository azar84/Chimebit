# Public Assets

This folder contains static assets that are served directly by the web server.

## Structure

### Core Assets
- `favicon.svg` - Browser favicon (32x32 SVG)
- `logo.svg` - Main application logo (120x40 SVG)
- `images/` - Folder for image assets
  - `placeholder.svg` - Default placeholder image

### PWA & App Support
- `manifest.json` - Web app manifest for PWA capabilities
- `sw.js` - Service worker for offline functionality
- `offline.html` - Offline page template
- `icons/` - PWA icons (various sizes)

### SEO & Web Standards
- `robots.txt` - Search engine crawling instructions
- `sitemap.xml` - Site structure for search engines
- `404.html` - Custom 404 error page

### Security & App Linking
- `.well-known/security.txt` - Security contact information
- `.well-known/assetlinks.json` - Android app linking
- `.well-known/apple-app-site-association` - iOS app linking

## Usage

### In HTML
```html
<img src="/logo.svg" alt="Logo" />
<img src="/images/placeholder.svg" alt="Placeholder" />
```

### In React Components
```tsx
<img src="/logo.svg" alt="Logo" />
<img src="/images/placeholder.svg" alt="Placeholder" />
```

## Adding New Assets

1. **Images**: Place in `images/` folder
2. **Icons**: Consider using Lucide React icons instead of image files
3. **Favicons**: Update `favicon.svg` or add multiple sizes
4. **Logos**: Update `logo.svg` or add brand-specific versions
5. **PWA Icons**: Add to `icons/` folder with proper sizes

## Configuration Files

### PWA Setup
- Update `manifest.json` with your app details
- Customize `sw.js` for your caching strategy
- Add PWA icons to `icons/` folder

### SEO Setup
- Update `sitemap.xml` with your actual URLs
- Modify `robots.txt` for your domain
- Update meta tags in `index.html`

### Security Setup
- Update `.well-known/security.txt` with your contact info
- Configure app linking files for mobile apps

## File Formats

- **SVG**: Preferred for icons, logos, and simple graphics
- **PNG**: Use for complex images or when transparency is needed
- **JPG**: Use for photographs
- **WebP**: Modern format with better compression (with fallbacks) 