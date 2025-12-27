# Repository Contract (REPO_CONTRACT)

## Summary

Establish the repository structure, ownership boundaries, and "web vs desktop" hybrid nature of the codebase.

## User value

Ensures the codebase remains navigable and predictable for new contributors, maintaining a clear separation between frontend logic and desktop-specific backend wrapper code.

# Repository Contract

## Directory Structure

The repository follows a hybrid React + Rust (Tauri) structure.

### Root

- `package.json`: Node dependencies and scripts.
- `src-tauri/`: Rust backend and Tauri configuration.
- `src/`: Frontend source code.
- `spec/`: Documentation and specifications.
- `vite.config.ts`: Vite build config.
- `tsconfig.json`: TypeScript config.

### Frontend (`src/`)

- `root.tsx`: App root layout and entry point.
- `routes.ts`: Route configuration.
- `entry.client.tsx`: Client hydration entry.
- `components/`: UI components (e.g. `ui/` for shadcn).
- `lib/`: Utilities (`utils.ts`).
- `routes/`: Page views and route modules.

### Backend (`src-tauri/`)

- `Cargo.toml`: Rust dependencies.
- `tauri.conf.json`: Tauri configuration.
- `src/main.rs`: Rust entry point.
- `src/lib.rs`: Shared Rust logic (commands, etc.).

## Crucial Files (Anchors)

- **Frontend Entry**: `src/entry.client.tsx` -> `src/root.tsx`
- **Routing**: `src/routes.ts`
- **Tauri Config**: `src-tauri/tauri.conf.json`
- **Spec Registry**: `spec/features.yaml`

## Invariants

- Frontend code must explicitly separate Web logic from Tauri-only logic where necessary.
- Specs in `spec/` must reflect the code in `src/` and `src-tauri/`.

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
