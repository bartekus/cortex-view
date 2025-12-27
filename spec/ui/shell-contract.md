# UI Shell Contract (UI_SHELL_CONTRACT)

## Overview

The "Shell" is the persistent frame of the application, typically containing global navigation, header, and footer. In RRv7, this is physically part of the `src/root.tsx` component (the root layout).

## Shell Structure

The `root.tsx` default export renders the following hierarchy:

1. **Document Root**: `<html>`, `<head>`, `<body>`.
2. **Context Providers**: Global providers (Theme, etc.) wrapping the app content.
3. **App Shell**:
   - **Sidebar** (collapsible, navigation).
   - **Header** (top bar, breadcrumbs, window controls).
   - **Main Content Area** (`<main>`).
     - **Outlet**: The `<Outlet />` component where specific route views are rendered.
   - **Footer** (status bar, optional).

## Implementation Details

- **File**: `src/root.tsx`.
- **Composition**: The Shell should likely use CSS Grid or Flexbox to arrange the Sidebar and Main area.
- **Scroll Behavior**:
  - The **Main Content Area** should be the primary scroll container.
  - Sidebar should stay fixed or have independent scroll.
  - `ScrollRestoration` should manage scroll position of the main area.

## Key Components

- `<Sidebar />`: Navigation menu.
- `<Header />`: App title, tools.
- `<Outlet />`: From `react-router`, renders the child route.

## Obsolete

- `src/components/Layout.tsx`: Previously the shell container; now logic often lives in `root.tsx` or a dedicated `src/components/AppShell.tsx` imported by `root.tsx`.

## Implementation anchors

- Files:
  - `src/root.tsx`
- Key symbols:
  - `Layout` (Function Component)
  - `Meta`, `Links`, `Scripts`, `ScrollRestoration`
  - `AppShell` (Mantine - _To be implemented_)
  - `Navbar`, `Header` (_To be implemented_)
- Events:
  - `N/A`

## Contract

1. **Regions**:
   - **Header**: Height 60px. Contains Burger (mobile/desktop), Title, Language, Theme Toggle.
   - **Navbar**: Width 200px. Collapsible. Hidden on mobile by default.
   - **Aside**: Width 300px. Visible only on desktop (`breakpoint='md'`).
   - **Main**: Scrollable area (via `SimpleBar`).
   - **Footer**: Height 60px. Conditionally rendered (`showFooter`).
2. **Responsiveness**:
   - `navbar.breakpoint = 'sm'`.
   - `aside.breakpoint = 'md'`.
3. **Z-Index/Layering**:
   - Header is above everything.
   - Navbar overlay on mobile.

## Acceptance checks

- [ ] Resize to mobile width. Navbar disappears. Click Burger -> Navbar appears.
- [ ] Resize to desktop width. Aside appears.

## Notes / edge cases

- `AppShell` handles the CSS grid layout automatically.
