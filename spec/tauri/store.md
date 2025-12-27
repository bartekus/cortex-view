# Tauri Store (TAURI_STORE_PLUGIN)

## Summary

Filesystem-backed key-value storage for persistent application data.

## User value

Robust storage for settings and state that survives app restart, more reliable than LocalStorage for desktop context.

## Scope

- Frontend: `src/tauri/storage.ts` (implied usage), `src-tauri/capabilities/desktop.json`
- Rust: `src-tauri/src/lib.rs`
- Config: `N/A`

## Implementation anchors

- Files:
  - `src-tauri/src/lib.rs`
  - `src/tauri/storage.ts` (Wrapper logic)
- Key symbols:
  - `tauri_plugin_store`
  - `Store` (JS API)
- Events:
  - `N/A`

## Contract

1. **Plugin Init**:
   - `tauri_plugin_store::Builder::default().build()` in `lib.rs`.
2. **Usage**:
   - Used via `src/tauri/storage.ts` abstraction (when `USE_STORE` is true and `isTauri()`).
   - Saves to `.json` files in the app data directory.
3. **Capabilities**:
   - Requires `store:default` permission.

## Acceptance checks

- [ ] `pnpm run tauri dev`.
- [ ] Modify a setting verified to use Store.
- [ ] Check `Library/Application Support/App.Name/` (or OS equivalent) for `.settings.dat` or similar JSON store file.

## Notes / edge cases

- Usage is gated by `USE_STORE` constant.
