# Filesystem: Enum App Files (MDAT_TAURI_FS_ENUM_APPFILES)

## Summary

Utility to recursively list user files associated with the application (e.g., `.json` files) in the AppData or Documents directory.

## User value

Allows the app to discover and display user-created content or saved projects.

## Scope

- Frontend: `src/tauri/TauriProvider.tsx`
- Rust: `N/A`
- Config: `data-tauri-drag-region` (unrelated but often near FS UI), `capabilities`

## Implementation anchors

- Files:
  - `src/tauri/TauriProvider.tsx`
- Key symbols:
  - `getUserAppFiles`
  - `readDirRecursively`
  - `EXTS` (Set of allowed extensions: `.json`)
- Events:
  - `N/A`

## Contract

1. **Path Resolution**:
   - Uses `tauriPath.documentDir()`.
   - Target Folder: `Documents/${APP_NAME}`.
2. **Enumeration**:
   - `readDirRecursively` walks the directory tree.
   - Filters files by `EXTS` (currently only `.json`).
3. **Return Format**:
   - Returns `{ path, name }` objects, where `name` is relative to the app folder.

## Acceptance checks

- [ ] Create a dummy `.json` file in `Documents/Product Name/`.
- [ ] Call `getUserAppFiles()`.
- [ ] Verify the file appears in the result list.

## Notes / edge cases

- There is a commented-out or partial logic mismatch in `getUserAppFiles` regarding `baseDir` usage (`fs.BaseDirectory.Document` vs `fs.BaseDirectory.AppData`). The code invokes `fs.readDir(APP_NAME, { baseDir: fs.BaseDirectory.AppData })` but `fs.mkdir` uses `Document`. This needs unification in implementation phase.
