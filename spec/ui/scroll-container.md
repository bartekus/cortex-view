# UI Scroll Container (UI_SCROLL_CONTAINER)

## Summary

Custom scrollbar implementation for the main content area, including "Back to Top" functionality.

## User value

Consistent scrolling experience across OSs and easy navigation for long content.

## Scope

- Frontend: `src/App.tsx`, `src/components/ScrollToTop.tsx`
- Rust: `N/A`
- Config: `N/A`

## Implementation anchors

- Files:
  - `src/App.tsx`
  - `src/components/ScrollToTop.tsx`
- Key symbols:
  - `SimpleBar`
  - `setScroller`
  - `ScrollToTop`
- Events:
  - `scroll` (DOM event)

## Contract

1. **Container**:
   - `SimpleBar` wraps `AppShell.Main` content.
   - `autoHide={false}` ensures scrollbar is visible.
2. **Ref Wiring**:
   - `SimpleBar` exposes the scrollable DOM node via ref (`setScroller`).
3. **ScrollToTop**:
   - Listens to `scroll` event on `scroller`.
   - Shows button if `scrollTop > 0`.
   - On Click: `scroller.scrollTo({ top: 0, behavior: 'smooth' })`.

## Acceptance checks

- [ ] content > viewport height.
- [ ] Scroll down. ScrollToTop button appears (bottom right).
- [ ] Click button. smooth scrolls to top. Button disappears.

## Notes / edge cases

- SimpleBar virtualizes the scrollbar; native scroll events must be attached to the correct inner container (handled by `scrollableNodeProps`).
