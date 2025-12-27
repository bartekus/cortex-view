# Routing Contract (ROUTING_RR7_CONTRACT)

## Summary

Client-side routing configuration using React Router v7 Config Validation.

## User value

Deep linking, browser history support (Back/Forward), and URL-driven state.

## Scope

- Frontend: `src/routes.ts`, `src/root.tsx`, `src/routes/*`
- Rust: `N/A`
- Config: `react-router.config.ts` (if applicable)

## Implementation anchors

- Files:
  - `src/routes.ts` (Route definitions)
  - `src/root.tsx` (Root layout)
- Key symbols:
  - `RouteConfig`
  - `index`, `layout`, `route` (Route helpers)
  - `Outlet` (Layout placeholder)
- Events:
  - `N/A`

## Contract

1.  **Router Config**:
    - Routes are defined in `src/routes.ts` exporting `RouteConfig`.
    - Supports Flattened Routes (RRv7 default) or nested layouts.
2.  **Route Definitions**:
    - `index("routes/home.tsx")`: Maps `/` to Home module.
    - Additional routes added via helper functions (`route("path", "file")`).
3.  **Root Layout**:
    - `src/root.tsx` acts as the global layout, rendering `<Outlet />` where child routes appear.

## Acceptance checks

- [ ] URL `/` loads the `routes/home.tsx` view.
- [ ] Adding a new route in `src/routes.ts` makes it accessible via URL.
- [ ] Back button works after navigation.

## Notes / edge cases

- Config-based routing is static; dynamic runtime routes (if needed) might need a different approach, but standard app routes belong in `routes.ts`.
