# Repository Contract (MDAT_REPO_CONTRACT)

## Summary

Establish the repository structure, ownership boundaries, and "web vs desktop" hybrid nature of the codebase.

## User value

Ensures the codebase remains navigable and predictable for new contributors, maintaining a clear separation between frontend logic and desktop-specific backend wrapper code.

## Scope

- Frontend: `src/` (React, React-Router v7, Vite, Core logic)
- Rust: `src-tauri/` (Tauri runtime, plugins, tray)
- Config: `package.json`, `src-tauri/tauri.conf.json`

## Implementation anchors

- Files:
  - `spec/reverse-engineering/repo-map.md` (Detailed map)
  - `src/root.tsx` (Frontend Entrypoint)
  - `src-tauri/src/lib.rs` (Backend entry)
- Key symbols:
  - `N/A` (Structure level)
- Events:
  - `N/A`
- Storage keys:
  - `N/A`

## Contract

1. **Hybrid Architecture**: The app MUST be buildable as a standard web app (SPA) AND as a desktop app (Tauri).
2. **Directory Structure**:
   - `src/` MUST contain all UI and business logic.
   - `src-tauri/` MUST contain all Rust platform code and build configuration.
   - `src/tauri/` (in frontend) MUST contain the React-side interface to Tauri APIs.
3. **Entrypoints**:
   - Web: `index.html` -> `src/root.tsx` (via React Router)
   - Desktop: `src-tauri/src/lib.rs` (via `run()`)

## Acceptance checks

- [ ] A new contributor can locate the boot path (`src/root.tsx`) in < 2 minutes.
- [ ] A new contributor can locate the Tauri configuration (`src-tauri/tauri.conf.json`) in < 2 minutes.
- [ ] `pnpm run tauri dev` starts the desktop version.

## Notes / edge cases

- `src/tauri/` vs `src-tauri/`: The former is JS/TS bridging code, the latter is Rust. This naming convention must be strictly preserved to avoid confusion.
