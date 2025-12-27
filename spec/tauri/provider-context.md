# Tauri Provider Context (TAURI_PROVIDER_CONTEXT)

## Summary

React Context that exposes initialized Tauri platform data (paths, OS type, dimensions) to the component tree.

## User value

Allows UI components to adapt to the OS (e.g., Mac vs Windows layout) and access filesystem paths without re-fetching.

## Scope

- Frontend: `src/tauri/TauriProvider.tsx`
- Rust: `N/A`
- Config: `N/A`

## Implementation anchors

- Files:
  - `src/tauri/TauriProvider.tsx`
- Key symbols:
  - `TauriContext`
  - `useTauriContext`
  - `loading`, `downloads`, `documents`, `osType`, `fileSep`, `scaleFactor`
  - `containerSize`
- Events:
  - `N/A`

## Contract

1. **Initialization**:
   - `useTauriContext` hooks provide `{ loading: true }` initially.
   - `useEffect` calls `tauriPath.downloadDir()`, `os.type()`, etc.
   - Sets `loading: false` once all promises resolve.
2. **Monitoring**:
   - Polls `appWindow.isFullscreen()` and `currentMonitor().scaleFactor` every 200ms.
   - Updates `scaleFactor` and `containerSize` (Linux HiDPI fix).
3. **Linux Specifics**:
   - `containerSize` calculation logic for Linux scaling.

## Acceptance checks

- [ ] Components consuming `useTauriContext` receive valid paths (not undefined) after loading.
- [ ] `osType` correctly reflects the host OS.

## Notes / edge cases

- Polling interval (200ms) could be a performance concern if logic gets heavy.
