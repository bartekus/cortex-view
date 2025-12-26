
# IPC Commands (MDAT_TAURI_IPC_COMMANDS)

## Summary
Custom Rust commands callable from the frontend via `invoke`.

## User value
Enables high-performance or system-level operations that are impossible or inefficient in JavaScript.

## Scope
- Frontend: `N/A` (Invoked via `invoke('command_name')`)
- Rust: `src-tauri/src/lib.rs`, `src-tauri/src/tray_icon.rs`
- Config: `N/A`

## Implementation anchors
- Files:
  - `src-tauri/src/lib.rs` (Handler registration)
  - `src-tauri/src/tray_icon.rs`
- Key symbols:
  - `tray_update_lang`
  - `process_file`
- Events:
  - `N/A`

## Contract
1. **`process_file`**:
   - Arg: `filepath: String`
   - Returns: `String` ("Hello from Rust!")
   - Log: Prints "Processing file: ..." to stdout.
2. **`tray_update_lang`**:
   - Arg: `lang: String`
   - Action: Rebuilds and sets the tray menu (intended for localization).

## Acceptance checks
- [ ] Call `invoke('process_file', { filepath: 'test' })`. Receive "Hello from Rust!".
- [ ] Call `invoke('tray_update_lang', { lang: 'fr' })`. Tray menu rebuilds.

## Notes / edge cases
- `tray_update_lang` is currently a skeleton implementation (does not actually translate menu items yet).
