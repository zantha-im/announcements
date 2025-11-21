# HTML Canvas Architecture

HTML Canvas is a modular system for generating static HTML snippets optimized for Shopify's HTML editor. Each content type is self-contained with its own templates, styling, and documentation.

## Project Structure

```
html-canvas/
├── admin/                          # Admin UI for viewing and managing snippets
│   └── index.html                 # Single-page admin interface
│
├── content-types/                 # Content type modules
│   ├── announcements/             # Announcements content type
│   │   ├── page.html             # Complete announcements page
│   │   └── templates/            # Reusable announcement templates
│   │       ├── standard-announcement.html
│   │       ├── product-update.html
│   │       └── shipping-alert.html
│   │
│   └── extended-product/          # Extended Product content type
│       ├── page.html             # Complete product page
│       └── templates/            # Reusable product components
│           ├── product-gallery.html
│           ├── product-specs.html
│           └── product-testimonials.html
│
├── README.md                       # Project overview and usage guide
├── ARCHITECTURE.md                 # This file
└── .git/                          # Git repository
```

## Content Types

### Announcements

**Purpose**: Dynamic announcement pages for communicating updates, service changes, and important information to customers.

**Features**:
- Color-coded banners (success, warning, danger, primary)
- Responsive grid layouts
- Anchor-based navigation for deep linking
- Smooth scrolling with offset support
- Hover effects and transitions

**Files**:
- `page.html` - Complete announcements page (17.6 KB)
- `templates/standard-announcement.html` - Basic announcement template
- `templates/product-update.html` - Product-focused announcement
- `templates/shipping-alert.html` - Shipping/logistics announcement

**Usage**: Copy `page.html` directly into Shopify page editor, or use templates to add individual announcements.

### Extended Product

**Purpose**: Rich product showcase pages with detailed specifications, image galleries, and customer testimonials.

**Features**:
- Multi-image gallery with thumbnail navigation
- Specifications grid (material, dimensions, weight, warranty, etc.)
- Feature highlights with icons
- Customer testimonial cards with ratings
- Call-to-action section
- Fully responsive design

**Files**:
- `page.html` - Complete product page template
- `templates/product-gallery.html` - Image gallery component
- `templates/product-specs.html` - Specifications grid
- `templates/product-testimonials.html` - Testimonial cards

**Usage**: Use `page.html` as a starting point, customize with your product details, or mix-and-match templates.

## Admin UI

The admin interface (`admin/index.html`) provides:

- **Tab-based navigation** for switching between content types
- **Snippet viewer** with syntax highlighting
- **Copy-to-clipboard** functionality for easy Shopify integration
- **Template selector** for quick template viewing
- **Responsive design** for desktop and mobile

### How to Use the Admin UI

1. Open `admin/index.html` in a web browser
2. Select a content type from the tabs (Announcements, Extended Product)
3. Click "View Snippet" to see the full page HTML
4. Select a template from the dropdown to view individual components
5. Click "Copy to Clipboard" to copy the snippet
6. Paste directly into your Shopify page editor

## Styling System

All content types use a consistent styling system based on CSS custom properties:

```css
:root {
    --bg-primary: #1E2128;          /* Main background */
    --bg-secondary: #252831;        /* Card/container background */
    --bg-tertiary: #2D3039;         /* Tertiary background */
    --border-color: #343741;        /* Borders */
    --text-primary: #FFFFFF;        /* Main text */
    --text-secondary: #D1D5DB;      /* Secondary text */
    --text-muted: #9CA3AF;          /* Muted text */
    --accent-primary: #4471BA;      /* Primary accent (blue) */
    --accent-secondary: #4471BA;    /* Secondary accent */
    --success: #469B3B;             /* Success (green) */
    --warning: #F59E0B;             /* Warning (orange) */
    --danger: #EF4444;              /* Danger (red) */
}
```

### Customizing Colors

To change the color scheme:

1. Locate the `:root` CSS section in the page HTML
2. Update the color variables
3. All elements using those variables will automatically update

Example:
```css
:root {
    --accent-primary: #FF6B6B;      /* Change to red */
    --success: #51CF66;             /* Change to green */
}
```

## Adding New Content Types

To add a new content type:

1. Create a new directory under `content-types/` (e.g., `content-types/my-type/`)
2. Create `page.html` with the complete page template
3. Create `templates/` subdirectory with reusable component templates
4. Update `admin/index.html` to add a new tab and section
5. Update this `ARCHITECTURE.md` file

### Template Structure

Each template should be a self-contained HTML snippet that:
- Includes only the necessary CSS for that component
- Uses the global CSS custom properties for colors
- Is responsive and mobile-friendly
- Can be combined with other templates

Example template structure:
```html
<!-- Component Name -->
<style>
    /* Component-specific styles using CSS custom properties */
    .component { background: var(--bg-secondary); }
</style>

<section class="component">
    <!-- Component HTML -->
</section>
```

## Shopify Integration

All snippets are designed to be pasted directly into Shopify's page editor:

1. Go to your Shopify admin
2. Navigate to Pages
3. Create or edit a page
4. Click "Show HTML" or switch to HTML editor
5. Paste the entire snippet
6. Save

**Important Notes**:
- Tailwind CSS is loaded via CDN (`cdn.tailwindcss.com`)
- Google Fonts are loaded via CDN
- No external dependencies beyond CDN resources
- All styles are self-contained within the snippet
- No build process required

## Best Practices

### For Content Creators

1. **Use templates** for consistency across multiple pages
2. **Customize colors** using CSS custom properties, not inline styles
3. **Test on mobile** before publishing to Shopify
4. **Keep snippets modular** - don't combine multiple content types in one page
5. **Update documentation** when creating new templates

### For Developers

1. **Maintain CSS custom properties** for easy customization
2. **Use semantic HTML** for accessibility
3. **Test responsive breakpoints** (640px, 768px, 1024px)
4. **Minimize inline styles** - use CSS classes instead
5. **Document new components** in this architecture file

## Performance Considerations

- All snippets are optimized for Shopify's HTML editor constraints
- CSS is embedded (no external stylesheets)
- JavaScript is minimal and inline
- Images should be optimized before uploading to Shopify CDN
- Tailwind CSS is loaded from CDN (consider self-hosting for production)

## Version History

- **v1.0** (Nov 2025)
  - Initial release with Announcements and Extended Product types
  - Admin UI for snippet management
  - Comprehensive documentation

## Support & Contributing

For questions, issues, or contributions:
- Check the README.md for usage guides
- Review template examples for implementation patterns
- Update ARCHITECTURE.md when adding new features
