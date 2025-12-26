# Routing Views Registry (ROUTING_VIEWS_REGISTRY)

## Summary

Centralized configuration array defining all available application views, used to generate both Routes and Sidebar Navigation.

## User value

DRY (Don't Repeat Yourself) - Adding a page once adds it to both routing and navigation.

## Scope

- Frontend: `src/App.tsx`
- Rust: `N/A`
- Config: `N/A`

## Implementation anchors

- Files:
  - `src/App.tsx`
- Key symbols:
  - `interface View`
  - `const views: View[]`
- Events:
  - `N/A`

## Contract

1. **Schema**:
   - `component`: React Component (Func or Lazy).
   - `path`: URL string (`/path`).
   - `name`: Display string (translated).
   - `exact`: boolean (optional).
2. **Usage**:
   - `views.map(...)` generates `<NavLink>` in Sidebar.
   - `views.map(...)` generates `<Route>` in Main.

## Acceptance checks

- [ ] Add a new object to `views` array.
- [ ] New link appears in Sidebar.
- [ ] Clicking link renders the Component.

## Notes / edge cases

- `views[0]` is special (default redirect target).
