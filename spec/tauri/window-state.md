
# Tauri Window State (MDAT_TAURI_WINDOW_STATE_PLUGIN)

## Summary
Automatically persists and restores the application window's size and position across sessions.

## User value
App "remembers" where the user left it, providing a seamless experience.

## Scope
- Frontend: `N/A` (Implicit effect)
- Rust: `src-tauri/src/lib.rs`
- Config: `N/A`

## Implementation anchors
- Files:
  - `src-tauri/src/lib.rs`
- Key symbols:
  - `tauri_plugin_window_state`
- Events:
  - `N/A`

## Contract
1. **Plugin Init**:
   - `tauri_plugin_window_state::Builder::default().build()` is added in `lib.rs`.
2. **Behavior**:
   - Saves window bounds to disk on move/resize.
   - Restores bounds on app launch.
3. **Interaction with Visibility**:
   - Because this plugin restores state, `main` window is set to `visible: false` in config. The plugin (or manual `show()` in `TauriProvider` if plugin removed) handles showing it.

## Acceptance checks
- [ ] Move window to corner. Resize it. Close App.
- [ ] Relaunch App.
- [ ] Window appears in same corner with same size.

## Notes / edge cases
- If this plugin is removed, `TauriProvider.tsx` has commented-out code to manually show the window.
