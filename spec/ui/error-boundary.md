# UI Error Boundary (UI_ERROR_BOUNDARY)

## Summary

Defensive wrapper to catch React render errors and display a recovery UI instead of crashing the whole app or showing a blank screen.

## User value

Allows the user to "Refresh" and attempt to recover from a buggy state without needing a full app restart.

## Scope

- Frontend: `src/main.tsx`, `src/App.tsx`, `src/views/FallbackErrorBoundary.tsx`
- Rust: `N/A`
- Config: `N/A`

## Implementation anchors

- Files:
  - `src/views/FallbackErrorBoundary.tsx`
  - `src/main.tsx` (App Root)
  - `src/App.tsx` (Route Root)
- Key symbols:
  - `ErrorBoundary` (react-error-boundary)
  - `FallbackAppRender`
- Events:
  - `onError`
  - `onReset`

## Contract

1. **Layer 1 (Route Level)**:
   - In `App.tsx` inside `SimpleBar`.
   - Catches errors during View rendering.
   - Keeps Shell (Navigation, Header) intact.
2. **Layer 2 (App Level)**:
   - In `main.tsx`.
   - Catches massive failures (e.g., Context missing).
   - Shows "Fatal Error".
3. **Recovery**:
   - `onReset` clears error and navigates to `/`.

## Acceptance checks

- [ ] Throw error in a View. Verify Shell still visible, View replaced by Error UI. Click Refresh -> Returns to Home.
- [ ] Throw error in AppShell. Verify Full Page Error UI.

## Notes / edge cases

- `tauriLogger.error` is registered in `onError` to persist the stack trace.
