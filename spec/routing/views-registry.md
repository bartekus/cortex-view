# Routing Views Registry (ROUTING_VIEWS_REGISTRY)

## Summary

Centralized configuration array defining all available application views, used to generate both Routes and Sidebar Navigation.

## User value

DRY (Don't Repeat Yourself) - Adding a page once adds it to both routing and navigation.

## Scope

- Frontend: `src/routes.ts` (Routing), `src/lib/views.ts` (Planned Navigation Registry)
- Rust: `N/A`
- Config: `N/A`

## Implementation anchors

- Files:
  - `src/routes.ts`
  - `src/lib/views.ts` (_To be implemented_)
- Key symbols:
  - `interface View`
  - `const views: View[]`
- Events:
  - `N/A`

## Contract

1.  **Schema**:
    - `path`: URL string (`/path`).
    - `name`: Display string (translated).
    - `icon`: Icon component (optional).
2.  **Usage**:
    - **Routing**: `routes.ts` imports view modules directly.
    - **Navigation**: Sidebar maps over `views` array to generate `<NavLink>`.
    - _Note_: In RRv7, "Routing" and "Navigation" are slightly decoupled. `routes.ts` defines valid URLs; `views` registry defines the Menu.

## Acceptance checks

- [ ] Add a new object to `views` array (Registry).
- [ ] New link appears in Sidebar.
- [ ] Ensure corresponding route exists in `routes.ts`.

## Notes / edge cases

- `views[0]` is often used as the default redirect target in `src/root.tsx` or `routes.ts` (index route).
