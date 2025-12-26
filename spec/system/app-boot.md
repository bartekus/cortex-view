
# App Boot (MDAT_APP_BOOT)

## Summary
The initialization sequence of the React application, ensuring all global providers and services (i18n, ErrorHandling, Theme, Router) are ready before the UI renders.

## User value
Prevents "flash of unstyled content," ensures translations are loaded, and catches startup crashes gracefully so the user is never left with a blank white screen.

## Scope
- Frontend: `src/main.tsx`, `src/Providers.tsx`, `src/App.tsx`
- Rust: `N/A`
- Config: `src/translations/i18n.ts`

## Implementation anchors
- Files:
  - `src/main.tsx`
  - `src/Providers.tsx`
  - `src/views/FallbackErrorBoundary.tsx`
- Key symbols:
  - `Providers` (Component)
  - `ErrorBoundary` (Component)
  - `tauriLogger`
- Events:
  - `onReset` (ErrorBoundary)

## Contract
1. **Provider Order**:
   - `<TauriProvider>` (Platform context)
   - `<Mantine>` (Theme/UI Style)
   - `<BrowserRouter>` (Routing)
   - *Note*: This order is critical. Theme might depend on Platform settings; Router depends on nothing but provides context to App.
2. **i18n Initialization**:
   - `import './translations/i18n.js'` MUST occur as a side-effect import before the first render cycle to ensure the global `i18n` instance is primed.
3. **Global Error Boundary**:
   - Wrapping `<App />` is a top-level `ErrorBoundary`.
   - `onError`: Logs the error via `tauriLogger.error`.
   - `onReset`: Resets `location.pathname = '/'` to recover from route-specific crashes.
   - `FallbackComponent`: `FallbackAppRender`.

## Acceptance checks
- [ ] Intentionally throwing an error in a view components triggers the `FallbackAppRender` UI.
- [ ] Clicking "Refresh" (or equivalent action) in the fallback UI resets the path to `/` and attempts a re-render.
- [ ] Application starts without console errors regarding missing context providers.

## Notes / edge cases
- If `TauriProvider` fails to initialize (e.g., Tauri APIs missing in web mode), it must fail gracefully or provide default "Web" values (mocking the context) so the app can still boot.
