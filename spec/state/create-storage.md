
# Storage Abstraction (MDAT_STORAGE_ABSTRACTION)

## Summary
A higher-order storage hook (`createStorage`) that acts as a unified facade over either `tauri-plugin-store` (filesystem) or `localForage` (IndexedDB), depending on the runtime.

## User value
Seamlessly handles data persistence whether running in Web or Desktop mode.

## Scope
- Frontend: `src/tauri/storage.ts`
- Rust: `src-tauri/src/lib.rs` (Plugin)
- Config: `USE_STORE` constant

## Implementation anchors
- Files:
  - `src/tauri/storage.ts`
- Key symbols:
  - `createStorage`
  - `USE_STORE`
  - `SAVE_DELAY` (100ms)
- Events:
  - `N/A`

## Contract
1. **Selection Logic**:
   - `USE_STORE = false && isTauri()`.
   - **CURRENT STATUS**: Hardcoded to `false`. Always uses `localforage` path even in Tauri.
2. **API**:
   - `get`, `set`, `use` (hook), `data`, `loading`.
3. **Behavior (Web / Fallback)**:
   - Uses `localforage`.
   - Debounces saves by `SAVE_DELAY` (100ms).
   - Handles `null` or invalid data by resetting to `{}`.
4. **Behavior (Tauri Store)**:
   - *Inactive code path*.
   - Would use `Store.load(path)`.
   - Saves immediately (no debounce in current code, logic differs slightly).

## Acceptance checks
- [ ] (Current) Data persists to IndexedDB in both Web and Tauri modes.
- [ ] (Future) If `USE_STORE` enabled, data persists to `.dat` / `.json` file.

## Notes / edge cases
- `USE_STORE` is explicitly disabled (`false && ...`). This spec documents the code as written, including the disabled branch.
