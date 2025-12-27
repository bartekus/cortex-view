# App Boot (APP_BOOT)

# App Boot Specification

## Overview

The application boot sequence is governed by **React Router v7** (RRv7) + **Vite**. There is no traditional `src/main.tsx` or `src/App.tsx` entry point for logic. Instead, the entry point is standard for RRv7, with `src/root.tsx` serving as the root component and layout.

## Boot Anchors

### 1. Entry Point

- **File**: `src/root.tsx`
- **Role**: The "Root" route that wraps all other routes.
- **Responsibilities**:
  - Exporting the default React component (`Layout`).
  - Exporting `LinksFunction` for global CSS (Tailwind, global.css).
  - Exporting `MetaFunction` for global metadata.
  - Exporting `ErrorBoundary` for top-level error handling.
  - Rendering the `<html>`, `<head>`, and `<body>` tags.
  - Rendering `<Scripts />`, `<ScrollRestoration />`, and `<Outlet />`.

### 2. Client Hydration

- **File**: `src/entry.client.tsx`
- **Role**: Hydrates the React application on the client side.
- **Responsibilities**:
  - `startTransition` and `hydrateRoot`.
  - Wrapping standard React Router hydration logic.

### 3. Server Rendering (Optional/Future)

- **File**: `src/entry.server.tsx` (if SSR is enabled)
- **Role**: Handles server-side request processing.

## Initialization Sequence

1. **Vite** serves `index.html` (or processes request via SSR).
2. **React Router** matches the URL against `src/routes.ts`.
3. **`src/root.tsx`** is rendered as the parent route.
4. **Global Providers** (Theme, Context) should be initialized within the component tree of to `root.tsx` (e.g. wrapping the `<Outlet />` or `<html>` depending on scope).
5. **Route Component** is rendered into the `<Outlet />`.

## Key Invariants

- `root.tsx` must export `default function App()` (or named export if configured) which returns the root markup.
- All global styles must be imported or linked in `root.tsx`.
- One-time initialization logic (analytics, global state hydration) should occur in a client-guarded effect or `clientLoader` within `root.tsx`.

## Legacy/Obsolete

- `src/main.tsx`: Obsolete in RRv7 convention (replaced by `entry.client.tsx`).
- `src/App.tsx`: Obsolete (replaced by `root.tsx`).

## Acceptance checks

- [ ] Intentionally throwing an error in a view component triggers the `ErrorBoundary` UI in `src/root.tsx`.
- [ ] Application starts without console errors regarding missing context providers.

## Notes / edge cases

- In RRv7, "Providers" often sit inside the `Layout` component or are configured via `route.lazy` / `clientLoader` if they need async data.
- Ensure `TauriProvider` doesn't block the initial HTML render if possible (or show a splash screen).
