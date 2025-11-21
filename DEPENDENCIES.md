# Dependencies and Warnings

## Main App Dependencies

The html-canvas NextJS application has clean, modern dependencies:

```json
{
  "dependencies": {
    "lucide-react": "^0.548.0",
    "next": "^16.0.3",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  }
}
```

**Status**: ✅ No deprecation warnings

## .windsurf Review Tools

The `.windsurf/review/` directory contains code review and linting tools. These have some transitive dependencies with deprecation warnings:

- `inflight@1.0.6` - deprecated, from ESLint ecosystem
- `@humanwhocodes/config-array@0.13.0` - deprecated, should use @eslint/config-array
- `rimraf@3.0.2` - old version, v4+ available
- `glob@7.2.3` - old version, v9+ available
- `@humanwhocodes/object-schema@2.0.3` - deprecated, should use @eslint/object-schema
- `eslint@8.57.1` - old version, newer versions available

### Why These Warnings Exist

The `.windsurf/` directory is a **git subtree** managed upstream at `https://github.com/zantha-im/.windsurf.git`. The review tools are intentionally pinned to specific versions for stability and reproducibility across multiple projects.

### How to Address

**Option 1: Ignore (Recommended)**
- These warnings don't affect the main app functionality
- The review tools work correctly despite the warnings
- The upstream .windsurf repo will handle version updates

**Option 2: Update Upstream**
- Push improvements to the upstream .windsurf repository
- Use the `/subtree-push` workflow to publish changes
- Other projects will benefit from the updates via `/subtree-pull`

**Option 3: Local Override**
- Not recommended as it breaks the subtree contract
- Would require manual merging on future updates

## Installation

When installing dependencies:

```bash
npm install          # Installs main app dependencies (clean)
npm --prefix .windsurf/review ci  # Installs review tools (has warnings)
```

The warnings are isolated to the review tools and don't affect the application.

## Next Steps

If you want to update the review tools:

1. Navigate to the upstream `.windsurf` repository
2. Update the dependencies in `.windsurf/review/package.json`
3. Test the changes
4. Push to the upstream repo
5. Run `/subtree-pull` in this project to get the updates
