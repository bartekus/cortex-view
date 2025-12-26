# UI Shell Contract (UI_SHELL_CONTRACT)

## Summary

The top-level layout component (`AppShell`) governing the responsive structure of the application.

## User value

Provides a consistent, responsive container for navigation and content, adapting to mobile and desktop screens.

## Scope

- Frontend: `src/App.tsx`
- Rust: `N/A`
- Config: `N/A`

## Implementation anchors

- Files:
  - `src/App.tsx`
- Key symbols:
  - `AppShell` (Mantine)
  - `Navbar`, `Header`, `Main`, `Aside`, `Footer`
  - `mobileNavOpened`, `desktopNavOpened`
- Events:
  - `N/A`

## Contract

1. **Regions**:
   - **Header**: Height 60px. Contains Burger (mobile/desktop), Title, Language, Theme Toggle.
   - **Navbar**: Width 200px. Collapsible. Hidden on mobile by default.
   - **Aside**: Width 300px. Visible only on desktop (`breakpoint='md'`).
   - **Main**: Scrollable area (via `SimpleBar`).
   - **Footer**: Height 60px. Conditionally rendered (`showFooter`).
2. **Responsiveness**:
   - `navbar.breakpoint = 'sm'`.
   - `aside.breakpoint = 'md'`.
3. **Z-Index/Layering**:
   - Header is above everything.
   - Navbar overlay on mobile.

## Acceptance checks

- [ ] Resize to mobile width. Navbar disappears. Click Burger -> Navbar appears.
- [ ] Resize to desktop width. Aside appears.

## Notes / edge cases

- `AppShell` handles the CSS grid layout automatically.
