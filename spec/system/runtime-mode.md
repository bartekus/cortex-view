# Runtime Mode (MDAT_RUNTIME_MODE)

## Summary

The mechanism to detect the current runtime environment (Web Browser vs. Tauri Desktop) and conditionally enable platform-specific features.

## User value

Allows a single codebase to serve two platforms. Web users get a functioning site (graceful degradation), while Desktop users get rich OS integration (FS, Tray, Window controls).

## Scope

- Frontend: `src/tauri/TauriProvider.tsx`, `src/App.tsx`, `src/tauri/storage.ts`
- Rust: `N/A`
- Config: `N/A`

## Implementation anchors

- Files:
  - `src/tauri/TauriProvider.tsx`
  - `src/App.tsx`
  - `src/tauri/storage.ts`
- Key symbols:
  - `isTauri()` (from `@tauri-apps/api/core`)
  - `TauriContext`
- Events:
  - `N/A`

## Contract

1. **Detection**: The source of truth is `isTauri()` from `@tauri-apps/api/core`.
2. **Web Fallback**:
   - If `!isTauri()`:
     - `TauriProvider` provides default/mock values (e.g., `osType: undefined`, `downloads: undefined`).
     - Event listeners (Tray, Updater, SingleInstance) in `App.tsx` are **NOT** registered.
     - Storage defaults to `localforage` (browser IndexedDB/LocalStorage).
3. **Tauri Activation**:
   - If `isTauri()`:
     - `TauriProvider` initializes async platform calls (FS, Window, OS).
     - Event listeners in `App.tsx` are registered on mount.
     - Storage Logic _may_ attempt to use Tauri Store (filesystem) if configured (controlled by `USE_STORE` constant in some paths).

## Acceptance checks

- [ ] **Web Build**: Runs in a normal browser (Chrome/Safari) without crashing due to "window.**TAURI** is not defined" or similar errors. Use `npm run dev`.
- [ ] **Tauri Build**: Runs in the Tauri window and successfully calls Rust commands (e.g., window size, OS type detection).
- [ ] **Data Persistence**: Web uses IndexedDB/LocalStorage; Tauri uses JSON files (if enabled).

## Notes / edge cases

- `USE_STORE` constant in `src/tauri/storage.ts` might forcibly disable the Tauri Store even in Tauri mode. This behavior should be documented in the storage spec, but here we note that `isTauri()` is the primary gate.
