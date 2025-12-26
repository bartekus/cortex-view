# UI Loading States (UI_LOADING_STATES)

## Summary

Visual feedback during asynchronous code loading (Code Splitting).

## User value

Indicates activity so the user knows the app hasn't frozen while fetching new views.

## Scope

- Frontend: `src/App.tsx`, `src/views/FallbackSuspense.tsx`
- Rust: `N/A`
- Config: `N/A`

## Implementation anchors

- Files:
  - `src/App.tsx`
  - `src/views/FallbackSuspense.tsx`
- Key symbols:
  - `Suspense` (React)
  - `FallbackSuspense` (Component)
  - `Loader` (Mantine)
- Events:
  - `N/A`

## Contract

1. **Suspense Boundary**:
   - Wraps every `Route` element in `App.tsx`.
   - `<Suspense fallback={<FallbackSuspense />}>`.
2. **Fallback UI**:
   - Centered `Loader` (Spinner).
   - Only appears if the component chunk takes time to load.

## Acceptance checks

- [ ] (Network Throttling) Navigate to Lazy View.
- [ ] Verify spinner appears briefly before content loads.

## Notes / edge cases

- Splashscreen component exists (`src/views/Splashscreen.tsx`) but isn't actively wired in the main route flow in `App.tsx` snippet (likely used during auth or initial boot, but `App.tsx` uses `loading` from `TauriProvider`? No, `TauriProvider` manages its own loading but `App.tsx` doesn't block render on it explicitly in the view hierarchy, except via Context availability).
