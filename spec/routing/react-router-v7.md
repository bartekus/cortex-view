
# Routing Contract (ROUTING_RR7_CONTRACT)

## Summary
Client-side routing configuration, currently using React Router v6 but documented as a contract for v7 migration.

## User value
Deep linking, browser history support (Back/Forward), and URL-driven state.

## Scope
- Frontend: `src/App.tsx`, `src/Providers.tsx`, `src/views/*.tsx`
- Rust: `N/A`
- Config: `N/A`

## Implementation anchors
- Files:
  - `src/App.tsx`
  - `src/Providers.tsx`
- Key symbols:
  - `BrowserRouter`
  - `Routes`, `Route`
  - `Navigate`
- Events:
  - `N/A`

## Contract
1. **Router**: `BrowserRouter` wrapped in `Providers.tsx`.
2. **Route Definitions**:
   - Defined in `App.tsx` via `Routes` component.
   - **Root Redirect**: `path='/'` -> `<Navigate to={views[0].path} />`.
   - **Dynamic Mapping**: Maps `views` array to `<Route>` elements.
3. **Navigation**:
   - `NavLink` used in Sidebar (Active state support).

## Acceptance checks
- [ ] URL `/` redirects to first view (e.g., `/example-view`).
- [ ] Back button works after navigation.

## Notes / edge cases
- `HashRouter` is sometimes preferred for Electron/Tauri but `BrowserRouter` is used here. Ensure `tauri.conf.json` or server config handles client-side routing fallback if not in `dist` mode (Tauri handles `index.html` fallback automatically).
