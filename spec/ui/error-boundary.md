# UI Error Boundary (UI_ERROR_BOUNDARY)

## Summary

Defensive wrapper to catch React render errors and display a recovery UI instead of crashing the whole app or showing a blank screen.

## User value

Allows the user to "Refresh" and attempt to recover from a buggy state without needing a full app restart.

## Scope

- Frontend: `src/root.tsx`
- Rust: `N/A`
- Config: `N/A`

## Implementation anchors

- Files:
  - `src/root.tsx`
- Key symbols:
  - `export function ErrorBoundary`
  - `isRouteErrorResponse`
- Events:
  - `N/A`

## Contract

1.  **Unified Boundary**:
    - RRv7 `ErrorBoundary` export in `root.tsx` catches both Routing errors (404s) and Render errors.
    - Displays a "Fatal Error" style UI with stack traces in DEV.
2.  **Recovery**:
    - Users can reload the page to attempt recovery.

## Acceptance checks

- [ ] Throw error in a View. Verify Shell still visible, View replaced by Error UI. Click Refresh -> Returns to Home.
- [ ] Throw error in AppShell. Verify Full Page Error UI.

## Notes / edge cases

- `tauriLogger.error` is registered in `onError` to persist the stack trace.
