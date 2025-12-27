# Routing Lazy Views (ROUTING_LAZY_VIEWS)

## Summary

Optimization technique using React.lazy to split code bundles per view.

## User value

Faster initial load time; code for heavy views is only downloaded when needed.

## Scope

- Frontend: `src/root.tsx`, `src/views/LazyView.tsx`
- Rust: `N/A`
- Config: `Vite` (Auto-splitting)

## Implementation anchors

- Files:
  - `src/root.tsx`
- Key symbols:
  - `lazy()`
  - `LazyExoticComponent`
- Events:
  - `N/A`

## Contract

1. **Import**: `const LazyView = lazy(() => import('./views/LazyView'))`.
2. **Type Compatibility**: `views` array type includes `LazyExoticComponent`.
3. **Suspense**: Required parent for lazy components (Provided by `UI_LOADING_STATES` contract).

## Acceptance checks

- [ ] Build app (`pnpm run build`).
- [ ] Verify `dist/assets` contains separate chunks for lazy views.

## Notes / edge cases

- Network failure during lazy load -> Triggers `UI_ERROR_BOUNDARY`.
