# Akash Sharma — Portfolio

A redesigned, modern single-page portfolio built with plain HTML, CSS, and JavaScript.

## ✅ What was fixed from the original version

- **Critical security fix**: removed a hardcoded SMTP password that was exposed in `script.js`. The contact form now uses [EmailJS](https://www.emailjs.com), which is safe to use client-side.
- **Removed exposed personal details**: real phone number and home address were hardcoded in the HTML; removed in favor of email + LinkedIn only.
- **Fixed a CSS specificity bug**: a stray `input, textarea { border: 1px solid red }` rule was silently overriding the intended themed input borders.
- **Optimized all images**: total image weight dropped from ~4.8MB to ~500KB (added WebP versions with JPG/PNG fallback via `<picture>`).
- **Removed an unused image** (`home.png`) that wasn't referenced anywhere in the code.
- **Rebuilt the layout** from a tab-style "one section visible at a time" SPA into a modern scroll-based layout with scroll-reveal animations, a scroll progress bar, active-section nav highlighting, and a back-to-top button.
- Cleaned up placeholder "About Me" content (removed age/gender/marital status — not standard on professional portfolios).

## ⚠️ Required setup before going live

### 1. Connect the contact form (EmailJS)
The form will show a friendly "not connected yet" message until you do this:

1. Create a free account at [emailjs.com](https://www.emailjs.com)
2. Add an **Email Service** (Gmail works fine) → copy the **Service ID**
3. Create an **Email Template** using variables: `{{name}}`, `{{email}}`, `{{phone}}`, `{{subject}}`, `{{message}}` → copy the **Template ID**
4. Go to **Account → General** → copy your **Public Key**
5. Open `script.js` and replace these three lines near the top of the EmailJS section:
   ```js
  const EMAILJS_SERVICE_ID = 'service_sn8ot7q';
  const EMAILJS_TEMPLATE_ID = 'template_tc6j6zy';
  const EMAILJS_PUBLIC_KEY = 'zxmAg07c2fW2gpNhl';
   ```

### 2. Add your resume
The "Download CV" button links to `resume.pdf`, which doesn't exist yet. Add your actual resume PDF to the project root with that exact filename, or update the `href` in `index.html` (search for `resume.pdf`).

### 3. Replace placeholder projects
The "My Projects" section currently has placeholder titles, descriptions, and `#` links. Search `index.html` for `portfolio-detail` and replace:
- Project titles and descriptions
- Tech tags
- The `#` hrefs for "Live Project" and "Source Code"

### 4. Replace portfolio screenshots
`images/portfolio1.jpg` through `portfolio6.jpg` are currently generic template screenshots — swap them for real screenshots of your projects (keep similar dimensions, ~800px wide, for consistent loading performance).

## 🚀 Deploying

This is a static site — you can host it for free on **GitHub Pages**, **Netlify**, or **Vercel** with no build step required. Just upload `index.html`, `style.css`, `script.js`, and the `images/` folder.
