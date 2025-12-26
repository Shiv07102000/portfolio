# Shivang Patni - Portfolio Website

A professional, industrial-level portfolio website with bilingual support (EN/DE), light/dark themes, and premium aerospace-inspired design.

## 🚀 Features

- **Light & Dark Themes**: Aerospace-themed color schemes with smooth transitions
- **Bilingual Support**: Full English and German language switching with localStorage persistence
- **Responsive Design**: Mobile-first approach, works on all devices
- **Premium Animations**: Smooth scroll reveals, counter animations, and micro-interactions
- **Performance Optimized**: Reduced motion support, efficient animations, lazy loading
- **SEO Ready**: Open Graph tags, semantic HTML, accessible markup
- **Vercel Optimized**: Configured with security headers and caching

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles/
│   └── main.css        # All styles with theme system
├── scripts/
│   └── main.js         # Theme, language, and animations
├── vercel.json         # Vercel deployment config
└── README.md           # This file
```

## 🌐 Deploy to Vercel

### Quick Deploy

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Click "Deploy"

### Manual Deploy (CLI)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

## 🛠️ Local Development

Simply open `index.html` in a web browser, or use a local server:

```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx serve .

# Using VS Code Live Server
# Right-click index.html → Open with Live Server
```

## ✨ Customization

### Theme Colors
Edit CSS variables in `styles/main.css` under `:root` (light theme) and `[data-theme="dark"]`:

```css
:root {
    --accent-primary: #0ea5e9;    /* Main accent */
    --accent-secondary: #6366f1;  /* Secondary accent */
}
```

### Content
- Update HTML in `index.html`
- All text uses `data-en` and `data-de` attributes for bilingual content

### Social Links
Update footer section with your actual profiles:
```html
<a href="https://linkedin.com/in/YOUR-PROFILE">
<a href="https://github.com/YOUR-USERNAME">
```

## 🎨 Design System

### Colors
- **Light Theme**: Clean whites and soft blues inspired by aerospace engineering
- **Dark Theme**: Deep space blues with vibrant accents

### Typography
- **Display**: Orbitron (futuristic, tech feel)
- **Body**: Inter (clean, readable)

### Effects
- Glassmorphism cards
- Gradient accents
- Smooth hover transitions
- Scroll-triggered animations

## 📱 Responsiveness

- **Desktop**: Full layout with side-by-side content
- **Tablet**: Adjusted grids, stacked where needed
- **Mobile**: Single column, touch-optimized interactions

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Reduced motion support
- Keyboard navigation
- High contrast ratios

## 📄 License

© 2025 Shivang Patni. All rights reserved.
