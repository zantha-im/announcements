# HTML Canvas

A modular system for generating static HTML snippets optimized for Shopify's HTML editor. Create professional, responsive pages for announcements, products, and more—all without leaving your browser.

## Features

- **Multiple Content Types**: Announcements, Extended Products, and more
- **Admin UI**: View, test, and copy snippets with a single click
- **Reusable Templates**: Mix-and-match components for quick customization
- **Consistent Design**: Unified styling system across all content types
- **Responsive**: Perfect on desktop, tablet, and mobile devices
- **No Build Required**: Copy snippets directly into Shopify—no compilation needed
- **Accessible**: Semantic HTML with proper keyboard navigation
- **Shopify-Ready**: All snippets work directly in Shopify's HTML editor

## Quick Start

1. **Open the Admin UI**: Open `admin/index.html` in your browser
2. **Select a Content Type**: Choose from Announcements, Extended Product, etc.
3. **View a Snippet**: Click "View Snippet" or select a template
4. **Copy to Clipboard**: Click "Copy to Clipboard"
5. **Paste into Shopify**: Go to your Shopify page editor and paste

## Project Structure

```
html-canvas/
├── admin/
│   └── index.html                 # Admin UI for managing snippets
├── content-types/
│   ├── announcements/
│   │   ├── page.html             # Complete announcements page
│   │   └── templates/            # Reusable templates
│   └── extended-product/
│       ├── page.html             # Complete product page
│       └── templates/            # Product components
├── README.md                      # This file
├── ARCHITECTURE.md                # Detailed architecture guide
└── .git/                         # Git repository
```

## Content Types

### Announcements

Dynamic announcement pages for communicating updates, service changes, and important information.

**Features**:
- Color-coded banners (success, warning, danger, primary)
- Responsive grid layouts
- Anchor-based navigation for deep linking
- Smooth scrolling with offset support
- Hover effects and transitions

**Files**:
- `content-types/announcements/page.html` - Complete page
- `content-types/announcements/templates/` - Reusable templates

### Extended Product

Rich product showcase pages with detailed specifications, image galleries, and customer testimonials.

**Features**:
- Multi-image gallery with thumbnail navigation
- Specifications grid
- Feature highlights with icons
- Customer testimonial cards
- Call-to-action section
- Fully responsive design

**Files**:
- `content-types/extended-product/page.html` - Complete page
- `content-types/extended-product/templates/` - Product components

## Customization

### Changing Colors

All content types use CSS custom properties for easy customization:

```css
:root {
    --accent-primary: #4471BA;      /* Primary accent color */
    --success: #469B3B;             /* Success color */
    --warning: #F59E0B;             /* Warning color */
    --danger: #EF4444;              /* Danger color */
    /* ... and more */
}
```

Simply update these variables in the `:root` section of any snippet.

### Modifying Templates

All templates are self-contained HTML snippets. To customize:

1. Open the template file in your editor
2. Modify the HTML and CSS as needed
3. Test in the admin UI
4. Copy to Shopify when ready

## Shopify Integration

All snippets are designed to paste directly into Shopify:

1. Go to your Shopify admin → Pages
2. Create or edit a page
3. Click "Show HTML" or switch to HTML editor
4. Paste the entire snippet
5. Save and publish

**Important**:
- Tailwind CSS is loaded via CDN
- Google Fonts are loaded via CDN
- No build process required
- All styles are self-contained

## Architecture & Development

For detailed information about the project structure, adding new content types, and development guidelines, see [ARCHITECTURE.md](ARCHITECTURE.md).

## Support

For questions or issues:
- Check [ARCHITECTURE.md](ARCHITECTURE.md) for detailed documentation
- Review template examples in `content-types/*/templates/`
- Test snippets in the admin UI before deploying to Shopify
