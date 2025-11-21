# HTML Canvas

A professional NextJS application for generating static HTML snippets optimized for Shopify's HTML editor. Create beautiful, responsive pages for announcements, products, and more with a modern admin interface.

## Features

- **NextJS + React**: Modern component-based architecture
- **Multiple Content Types**: Announcements, Extended Products, and more
- **Professional Admin UI**: Sidebar navigation, syntax highlighting, copy-to-clipboard
- **Reusable Templates**: Mix-and-match components for quick customization
- **CSS Modules**: Scoped, maintainable styling system
- **Responsive Design**: Perfect on desktop, tablet, and mobile devices
- **Accessible**: Semantic HTML with proper keyboard navigation
- **Shopify-Ready**: All snippets work directly in Shopify's HTML editor
- **Developer Tooling**: .windsurf subtree with ESLint, TypeScript, and automation workflows

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone or navigate to the project
cd html-canvas

# Install dependencies
npm install

# Start development server
npm run dev
```

Then open `http://localhost:3000` in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
html-canvas/
├── app/                           # NextJS app directory
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Main page with state management
│   ├── globals.css               # Global styles
│   └── page.tsx
├── components/                    # React components
│   ├── AppLayout.tsx             # Sidebar + header layout
│   ├── AppLayout.module.css      # Layout styles
│   ├── SnippetViewer.tsx         # Code display component
│   └── SnippetViewer.module.css  # Snippet viewer styles
├── styles/
│   └── theme.css                 # Design system (colors, spacing, typography)
├── public/                        # Static assets
│   ├── favicon.ico
│   ├── site-icon.png
│   └── content-types/            # HTML snippets
│       ├── announcements/
│       └── extended-product/
├── .windsurf/                     # Portable developer tooling (git subtree)
│   ├── workflows/                # Automation workflows
│   ├── guides/                   # Reference documentation
│   ├── tools/                    # Utility scripts
│   └── review/                   # Code review tooling
├── package.json                  # NextJS dependencies
├── tsconfig.json                 # TypeScript configuration
├── next.config.js                # NextJS configuration
├── README.md                      # This file
├── ARCHITECTURE.md               # Detailed architecture guide
└── Windsurf README.md            # .windsurf subtree setup guide
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
- `public/content-types/announcements/page.html` - Complete page
- `public/content-types/announcements/templates/` - Reusable templates

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
- `public/content-types/extended-product/page.html` - Complete page
- `public/content-types/extended-product/templates/` - Product components

## Development

### Available Scripts

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

### Using Workflows

The `.windsurf/workflows/` directory contains automation workflows:

```bash
# Install npm dependencies for review tools
/subtree-npm

# Update .windsurf from upstream
/subtree-pull

# Run code review and fixes
/code-review-fix
```

## Customization

### Changing Colors

The theme system uses CSS custom properties in `styles/theme.css`:

```css
:root {
    --bg: #1E2128;                 /* Main background */
    --card: #252831;               /* Card background */
    --text: #FFFFFF;               /* Main text */
    --link: #4471BA;               /* Link color */
    --btn: #4471BA;                /* Button color */
    /* ... and more */
}
```

Update these variables to customize the entire app appearance.

### Adding New Content Types

1. Create a new directory in `public/content-types/`
2. Add `page.html` and `templates/` subdirectory
3. Update `components/AppLayout.tsx` to add navigation items
4. Update `app/page.tsx` to add content descriptions
5. Test in the admin UI

## Shopify Integration

All snippets are designed to paste directly into Shopify:

1. Go to your Shopify admin → Pages
2. Create or edit a page
3. Click "Show HTML" or switch to HTML editor
4. Copy snippet from HTML Canvas admin UI
5. Paste the entire snippet
6. Save and publish

**Important**:
- Tailwind CSS is loaded via CDN in snippets
- Google Fonts are loaded via CDN in snippets
- No build process required for snippets
- All styles are self-contained

## Architecture & Development

For detailed information about the project structure, adding new content types, and development guidelines, see [ARCHITECTURE.md](ARCHITECTURE.md).

For .windsurf subtree setup and workflows, see [Windsurf README.md](Windsurf%20README.md).

## Support

For questions or issues:
- Check [ARCHITECTURE.md](ARCHITECTURE.md) for detailed documentation
- Review template examples in `public/content-types/*/templates/`
- Test snippets in the admin UI before deploying to Shopify
- Use `.windsurf/workflows/` for automation and code review
