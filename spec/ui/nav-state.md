
# UI Nav State (UI_NAV_STATE)

## Summary
State management for the navigation sidebar visibility, including persistence for desktop users.

## User value
Respected user preference for "Focus Mode" (sidebar collapsed) vs "Navigation Mode" (sidebar open).

## Scope
- Frontend: `src/App.tsx`, `src/common/utils.ts`
- Rust: `N/A`
- Config: `N/A`

## Implementation anchors
- Files:
  - `src/App.tsx`
  - `src/common/utils.ts`
- Key symbols:
  - `useCookie`
  - `desktop-nav-opened`
  - `toggleDesktopNav`
  - `mobileNavOpened`
- Events:
  - `N/A`

## Contract
1. **Desktop Persistence**:
   - Uses `useCookie('desktop-nav-opened', 'true')`.
   - State is boolean-like string: `'true'` or `'false'`.
2. **Mobile State**:
   - Ephemeral (reset on reload).
   - Uses `useDisclosure`.
   - Closed by default.
   - Auto-closes when a `NavLink` is clicked.

## Acceptance checks
- [ ] Collapse desktop sidebar. Reload page. Sidebar remains collapsed.
- [ ] (Mobile) Open sidebar. Click link. Sidebar closes.

## Notes / edge cases
- `useCookie` is sync-read, preventing layout shift on load.
