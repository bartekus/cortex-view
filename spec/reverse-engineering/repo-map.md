# Repository Map (MDAT)

## Entrypoints & Boundaries

### Frontend (React + Vite)

- **Entrypoint**: `src/main.tsx` (React root, `tauri-plugin-log` integration, global `ErrorBoundary`)
- **Composition**: `src/Providers.tsx` (TauriProvider -> MantineProvider -> BrowserRouter)
- **Shell**: `src/root.tsx` (Layout, routing, `useEffect` initialization of Tauri listeners)

### Tauri Platform (Rust + Webview)

- **Rust Entrypoint**: `src-tauri/src/lib.rs` (Plugin initialization, `run()`)
- **Tray Logic**: `src-tauri/src/tray_icon.rs` (Menu structure, event handling)
- **Background Tasks**: `src-tauri/src/utils.rs` (`long_running_thread` example)
- **Configuration**: `src-tauri/tauri.conf.json`
- **Capabilities**: `src-tauri/capabilities/` (`desktop.json`, `migrated.json`)

### Shared / Utilities

- **i18n**: `src/translations/i18n.ts` (Setup), `src/translations/*.json` (Resources)
- **State/Utils**: `src/common/utils.ts` (Hooks, storage helpers)
- **Platform Context**: `src/tauri/TauriProvider.tsx` (Exposes OS info, paths, window state to React)
- **Custom Titlebar**: `src/tauri/TitleBar.tsx` (Windows-specific UI)

## Runtime Modes

### Web Mode

- Detected via `!isTauri()` check (implicitly) or fallback behavior in `TauriProvider`.
- `storage.ts` checks `isTauri()` to decide between `localforage` and `tauri-plugin-store`.

### Tauri Mode

- Detected via `isTauri()` from `@tauri-apps/api/core`.
- **Key Branch Points**:
  - `src/root.tsx`: Event listeners (longRunningThread, systemTray, newInstance) are only attached if `isTauri()`.
  - `src/tauri/TauriProvider.tsx`: Window sizing, FS operations, and OS context extraction await `isTauri()`.
  - `src/tauri/storage.ts` (presumed location): Switches storage backend.

## Directory Structure Landmarks

- `src/views/`: Route components
- `src/components/`: Reusable UI components
- `src/common/`: Application-agnostic utilities (cookies, sleep, etc.)
- `src/tauri/`: Code specific to the desktop wrapper (TitleBar, Provider, Storage)
