# i18n Rust Tray Lang (I18N_RUST_TRAY_LANG)

## Summary

Mechanism to update the native system tray menu language from the frontend.

## User value

Ensures the Tray Menu matches the App UI language.

## Scope

- Frontend: `N/A` (Invoker)
- Rust: `src-tauri/src/tray_icon.rs`
- Config: `N/A`

## Implementation anchors

- Files:
  - `src-tauri/src/tray_icon.rs`
- Key symbols:
  - `tray_update_lang` (Internal Rust function & Command)
- Events:
  - `N/A`

## Contract

1. **Command**: `tray_update_lang`.
2. **Behavior**:
   - Accepts `lang` string.
   - Re-creates the tray menu via `create_tray_menu`.
   - Re-sets the menu on the tray method.
3. **Current State**:
   - The command _runs_ and rebuilds the menu, but the actual string translation logic inside `create_tray_menu` is commented out/incomplete ("TODO: tray internationalization").

## Acceptance checks

- [ ] Call `invoke('tray_update_lang', ...)` does not crash the app.
- [ ] Menu is visually refreshed (though strings may not change yet).

## Notes / edge cases

- Marked as Draft/Planned in features, reflecting the TODO status in code.
