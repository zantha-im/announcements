# HTML Canvas

A professional NextJS 16 admin interface for managing and previewing product content and announcements. View, edit, and copy HTML snippets optimized for Shopify with a modern, intuitive UI.

## Features

- **NextJS 16 + React 18**: Modern component-based architecture with App Router
- **Unified Admin Hub**: Sidebar navigation with Announcements and Extended Products
- **Product Preview**: Accordion-style component viewer with collapsible sections
- **Dual View Modes**: Toggle between rendered preview and HTML source code
- **Copy to Clipboard**: One-click copying of component HTML with success feedback
- **Lazy Loading**: Efficient content loading on hover/expand
- **DM Sans Typography**: Matches Shopify's design system exactly
- **CSS Modules**: Scoped, maintainable styling system
- **Responsive Design**: Perfect on desktop, tablet, and mobile devices
- **Shopify-Ready**: All content works directly in Shopify's HTML editor
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
├── app/                                    # NextJS 16 App Router
│   ├── layout.tsx                         # Root layout with metadata
│   ├── page.tsx                           # Main admin page with navigation
│   ├── page.module.css                    # Main page styles
│   ├── globals.css                        # Global styles
│   └── product-preview/                   # Legacy product preview page
├── components/                             # React components
│   ├── AppLayout.tsx                      # Sidebar + header layout
│   ├── AppLayout.module.css               # Layout styles
│   ├── ProductPreviewInline.tsx           # Inline product preview component
│   ├── ProductPreviewInline.module.css    # Product preview styles
│   ├── AnnouncementsPreview.tsx           # Announcements preview component
│   ├── AnnouncementsPreview.module.css    # Announcements styles
│   ├── SnippetViewer.tsx                  # Legacy code display component
│   └── SnippetViewer.module.css           # Snippet viewer styles
├── public/                                 # Static assets
│   ├── favicon.ico
│   ├── site-icon.png
│   └── content-types/                     # HTML snippets for Shopify
│       ├── announcements/
│       │   └── page.html
│       └── extended-product/
│           └── skeld/
│               ├── braaid/
│               │   ├── specifications.html
│               │   ├── tasting-notes.html
│               │   ├── maker-comments.html
│               │   └── origin-story.html
│               ├── tholtan/
│               │   ├── specifications.html
│               │   ├── tasting-notes.html
│               │   ├── maker-comments.html
│               │   └── origin-story.html
│               └── cashtal/
│                   ├── specifications.html
│                   ├── tasting-notes.html
│                   ├── maker-comments.html
│                   └── origin-story.html
├── .windsurf/                              # Portable developer tooling (git subtree)
│   ├── workflows/                         # Automation workflows
│   ├── guides/                            # Reference documentation
│   ├── tools/                             # Utility scripts
│   └── review/                            # Code review tooling
├── package.json                           # NextJS dependencies
├── tsconfig.json                          # TypeScript configuration
├── next.config.js                         # NextJS configuration
├── README.md                              # This file
├── ARCHITECTURE.md                        # Detailed architecture guide
└── Windsurf README.md                     # .windsurf subtree setup guide
```

## Admin Interface

### Main Page (`/`)

The main page serves as a unified hub for content management with:

- **Sidebar Navigation**: Browse all content types and products
- **Dynamic Content Loading**: Click to view product previews or announcements
- **State Management**: Active item tracking with React hooks

### Announcements Preview

View and manage announcement content with:

- **Header Bar**: Title and description
- **View Toggle**: Switch between rendered and HTML source views
- **Copy Button**: Copy entire announcement to clipboard
- **Full-Height Content**: Scrollable announcements without inner scrollbars
- **Rendered View**: Formatted HTML with proper styling
- **HTML View**: Raw HTML source in monospace font

**Navigation**: Click "Preview" under ANNOUNCEMENTS in sidebar

### Product Preview

View and manage product components with:

- **Accordion Interface**: Only one component expanded at a time
- **Component Sections**: Specifications, Tasting Notes, Maker Comments, Origin Story
- **Lazy Loading**: Content loads on hover for performance
- **View Toggle**: Rendered or HTML source for each component
- **Copy Buttons**: Copy individual component HTML
- **Success Feedback**: Visual confirmation on copy
- **DM Sans Font**: Matches Shopify typography exactly

**Navigation**: Click any product under EXTENDED PRODUCTS in sidebar

### Products

Currently supported products:

- **SKëLD - Braaid**: Spirit-Infused Aromatic Snuff
- **SKëLD - Tholtan**: (Coming soon with real content)
- **SKëLD - Cashtal**: Sandbox for testing formatting and styles

Each product has 4 components:
1. **Specifications** - Product details and attributes
2. **Tasting Notes** - Flavor profile and experience
3. **Maker Comments** - Creator insights and story
4. **Origin Story** - Product history and inspiration

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

## Key Features Explained

### Accordion Component Behavior

Product components use an accordion pattern where opening one component automatically closes all others:

```typescript
// Only one component expanded at a time
if (expandedComponents[component.id]) {
  // Close it
} else {
  // Close all, open this one
}
```

### Lazy Loading

Content is loaded on hover for performance:

```typescript
onMouseEnter={() => loadComponent(component.id, component.path)}
```

### View Toggle

Each component can be viewed in two modes:

1. **Rendered View** (default): Formatted HTML with styling
2. **HTML View**: Raw HTML source in monospace font

### Copy to Clipboard

Extracts inner HTML content and copies to clipboard with success feedback:

```typescript
const contentDiv = doc.querySelector('div')
const contentToCopy = contentDiv.innerHTML
await navigator.clipboard.writeText(contentToCopy)
```

## Customization

### Adding New Products

1. Create new directories in `public/content-types/extended-product/{product-brand}/{product-name}/`
2. Add 4 HTML files: `specifications.html`, `tasting-notes.html`, `maker-comments.html`, `origin-story.html`
3. Update `components/ProductPreviewInline.tsx` to add product configuration
4. Update `components/AppLayout.tsx` to add navigation item
5. Update `app/page.tsx` to add content description

### Changing Colors

The theme system uses CSS custom properties in `app/globals.css`:

```css
:root {
    --bg-primary: #1E2128;         /* Main background */
    --card: #252831;               /* Card background */
    --text-primary: #FFFFFF;       /* Main text */
    --btn: #4471BA;                /* Button color */
    /* ... and more */
}
```

Update these variables to customize the entire app appearance.

### Updating Typography

The app uses DM Sans font from Google Fonts. To change:

1. Update `@import` in `ProductPreviewInline.module.css`
2. Update `font-family` in `.componentContent` class
3. Adjust font weights as needed (400, 500, 600, 700 available)

## Shopify Integration

All content is designed to paste directly into Shopify:

1. Go to your Shopify admin → Pages
2. Create or edit a page
3. Click "Show HTML" or switch to HTML editor
4. Copy snippet from HTML Canvas admin UI (use the copy button)
5. Paste the entire snippet
6. Save and publish

**Workflow**:

1. **Preview in Admin UI**: View rendered content and toggle to HTML
2. **Copy HTML**: Click copy button to copy to clipboard
3. **Paste in Shopify**: Paste into Shopify page HTML editor
4. **Verify**: Check rendered output in Shopify
5. **Publish**: Save and publish the page

**Important**:
- Content uses DM Sans font (matches Shopify's design system)
- HTML is self-contained with no external dependencies
- All styles are inline or included in the HTML
- No build process required - paste and go
- Test in Cashtal sandbox before deploying real content

## Architecture & Development

For .windsurf subtree setup and workflows, see [Windsurf README.md](Windsurf%20README.md).

## Testing & Development

### Component Testing

Each component can be tested independently:

1. Click a product in the sidebar
2. Expand a component (e.g., Specifications)
3. Toggle between rendered and HTML views
4. Copy and verify in Shopify
5. Adjust HTML as needed
