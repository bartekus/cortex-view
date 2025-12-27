# Routing Contract (ROUTING_RR7_CONTRACT)

## Summary

Client-side routing configuration using React Router v7 Config Validation.

## User value

Deep linking, browser history support (Back/Forward), and URL-driven state.

# React Router v7 Specification

## Routing Strategy

The application uses **React Router v7** with **config-based routing** defined in `src/routes.ts`.

## Configuration Anchor

- **File**: `src/routes.ts`
- **Library**: `@react-router/dev/routes`
- **Format**: Declarative route hierarchy.

## Route Definition Pattern

Routes are defined using the `route`, `index`, `layout`, and `prefix` helpers from `@react-router/dev/routes`.

```typescript
import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [layout("layouts/sidebar.tsx", [index("routes/home.tsx"), route("about", "routes/about.tsx")])] satisfies RouteConfig;
```

## File Conventions

- **Route Modules**: Located in `src/routes/*`.
- **Layouts**: Located in `src/layouts/*` or `src/routes/*` (if specific to a route segment).
- **Naming**: File names typically mirror the route path (e.g., `routes/settings/profile.tsx`).

## Navigation & Linking

- Use `<Link to="...">` or `<NavLink>` from `react-router`.
- Programmatic navigation via `useNavigate()`.
- Route IDs should be stable if referenced by logic.

## Verification

- Run `npx react-router routes` to inspect the generated route tree.

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
