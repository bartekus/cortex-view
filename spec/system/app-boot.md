# App Boot (MDAT_APP_BOOT)

## Summary

The initialization sequence of the React application, ensuring all global providers and services (i18n, ErrorHandling, Theme, Router) are ready before the UI renders.

## User value

Prevents "flash of unstyled content," ensures translations are loaded, and catches startup crashes gracefully so the user is never left with a blank white screen.

## Scope

- Frontend: `src/root.tsx`, `src/routes.ts`
- Rust: `N/A`
- Config: `src/translations/i18n.ts`

## Implementation anchors

- Files:
  - `src/root.tsx` (Replaces `main.tsx` and `App.tsx`)
- Key symbols:
  - `Layout` (Component)
  - `ErrorBoundary` (Component)
  - `links` (Review Stylesheet Loading)
- Events:
  - `N/A`

## Contract

1.  **Entrypoint (RRv7)**:
    - `src/root.tsx` is the Module Root.
    - `Layout` component wraps the document (`<html>`, `<body>`).
    - Global Providers (Tauri, Theme) should be composed here, wrapping `{children}` or `<Outlet />`.
2.  **i18n Initialization**:
    - `import './translations/i18n.js'` (or equivalent init logic) MUST occur before the first render.
3.  **Global Error Boundary**:
    - `export function ErrorBoundary` in `src/root.tsx` handles top-level crashes (404s, unhandled exceptions).
    - Replaces the legacy `FallbackAppRender`.

## Acceptance checks

- [ ] Intentionally throwing an error in a view component triggers the `ErrorBoundary` UI in `src/root.tsx`.
- [ ] Application starts without console errors regarding missing context providers.

## Notes / edge cases

- In RRv7, "Providers" often sit inside the `Layout` component or are configured via `route.lazy` / `clientLoader` if they need async data.
- Ensure `TauriProvider` doesn't block the initial HTML render if possible (or show a splash screen).
