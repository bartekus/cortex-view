# Tauri Tray (MDAT_TAURI_TRAY_MENU)

## Summary

System tray icon and menu providing background persistence and quick actions.

## User value

Keeps the app accessible even when the main window is closed or minimized.

## Scope

- Frontend: `src/App.tsx`
- Rust: `src-tauri/src/tray_icon.rs`
- Config: `N/A`

## Implementation anchors

- Files:
  - `src-tauri/src/tray_icon.rs`
  - `src/App.tsx`
- Key symbols:
  - `create_tray_icon`
  - `create_tray_menu`
  - `systemTray` (Event payload message)
  - `system-tray` (Event payload message for clicks)
- Events:
  - `systemTray`: Menu item clicks.
  - `system-tray`: Icon clicks (Left/Right).

## Contract

1. **Menu Items**:
   - `SubmenuBuilder` ("Sub Menu!")
   - `toggle-visibility` ("Hide Window" / "Show Window")
   - `quit` ("Quit") -> `process::exit(0)`
   - `toggle-tray-icon` -> Swaps icon between `SystemTray1.ico` and `SystemTray2.ico`.
2. **Interaction**:
   - **Left Click**: Emits `system-tray` ("left-click"), Shows Window, Focuses Window.
   - **Menu Click**: Emits `systemTray` with item ID.
3. **Frontend Listener**:
   - `App.tsx` listens for `systemTray`.
   - Displays debug notification with payload message.

## Acceptance checks

- [ ] Tray icon appears on launch.
- [ ] "Quit" menu item terminates the app.
- [ ] "Toggle tray icon" changes the icon image.
- [ ] Clicking tray icon brings app to front.

## Notes / edge cases

- `tray_update_lang` command exists but internationalization inside the Rust tray menu is marked as TODO/Untested in `tray_icon.rs`.
