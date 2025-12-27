# Tauri Capabilities (TAURI_CAPABILITIES)

## Summary

Defines the permission scopes for the Tauri application, allowing access to filesystem, shell, and system interfaces.

## User value

Enforces security by granting only necessary privileges. Users can trust the app won't access unauthorized files.

## Scope

- Frontend: `N/A`
- Rust: `N/A`
- Config: `src-tauri/capabilities/desktop.json`, `src-tauri/capabilities/migrated.json`

## Implementation anchors

- Files:
  - `src-tauri/capabilities/desktop.json`
  - `src-tauri/capabilities/migrated.json`
- Key symbols:
  - `fs:scope`
  - `fs:allow-read-dir`
- Events:
  - `N/A`

## Contract

1. **Core Permissions**:
   - `core:default`, `opener:default`, `log:default`, `store:default`
2. **Filesystem Scope**:
   - Read/Write allowed in: `$APP/*`, `$DOCUMENT/*`, `$DOWNLOAD/*`
   - Explicit `fs:allow-download-write-recursive`
   - Explicit `fs:allow-write-file`, `fs:allow-read-dir`, `fs:allow-mkdir`
3. **Window Control**:
   - Maximize, minimize, close, fullscreen, set size, set decorations.
4. **Shell/OS**:
   - `shell:allow-open`
   - `os:allow-platform`, `os:allow-version`, etc.

## Acceptance checks

- [ ] App can read/write files in the Documents folder (verified by `fs-enum-appfiles`).
- [ ] App can minimize/maximize window.
- [ ] App can open external links (Shell).

## Notes / edge cases

- `desktop.json` and `migrated.json` appear to overlap. The union of these capabilities is the effective set.
