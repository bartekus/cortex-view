
# Tauri Logging (MDAT_TAURI_LOGGING)

## Summary
Unified logging system that outputs to the webview console in development and to log files in production/release builds, using `tauri-plugin-log`.

## User value
Assist in debugging issues by preserving logs.

## Scope
- Frontend: `src/main.tsx`
- Rust: `src-tauri/src/lib.rs`
- Config: `src-tauri/capabilities/desktop.json` (`log:default`)

## Implementation anchors
- Files:
  - `src-tauri/src/lib.rs`
  - `src/main.tsx`
- Key symbols:
  - `tauri_plugin_log::TargetKind::LogDir`
  - `tauri_plugin_log::TargetKind::Webview`
  - `tauriLogger.error`, `tauriLogger.info`
- Events:
  - `N/A`

## Contract
1. **Targets**:
   - **All Builds**: LogDir (`logs/` directory in AppData).
   - **Debug Builds**: Webview Console (via `#[cfg(debug_assertions)]`).
2. **Frontend Usage**:
   - `tauriLogger.error(e.message)` is used in `ErrorBoundary`.
   - `tauriLogger.info` is used for event listeners (Tray, Thread).

## Acceptance checks
- [ ] In Development (`npm run tauri dev`), `tauriLogger.info` prints to the browser console.
- [ ] In Production/Release, logs are written to the platform-specific logs directory.

## Notes / edge cases
- Log rotation or size limits are not explicitly configured in the current `lib.rs` snippets.
