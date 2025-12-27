# Tauri Single Instance (TAURI_SINGLE_INSTANCE)

## Summary

Ensures only one instance of the application runs at a time. If a second instance is launched, it focuses the existing window and passes command-line arguments.

## User value

Prevents confusion and resource conflicts from multiple open app windows. Supports "Open with..." OS behaviors.

## Scope

- Frontend: `src/root.tsx`
- Rust: `src-tauri/src/lib.rs`
- Config: `N/A`

## Implementation anchors

- Files:
  - `src-tauri/src/lib.rs`
  - `src/root.tsx`
- Key symbols:
  - `tauri_plugin_single_instance`
  - `newInstance` (Event)
- Events:
  - `newInstance`

## Contract

1. **Plugin Behavior**:
   - Initialized in `lib.rs`.
   - Closure: `emit("newInstance", SingleInstancePayload { args, cwd })`.
2. **Frontend Listener**:
   - Subscribes to `newInstance` in `App.tsx`.
   - Action:
     - Show window if hidden.
     - Unminimize if minimized.
     - Focus window.
     - (TODO) Handle `args` if length > 1 (currently empty block).

## Acceptance checks

- [ ] Launch App.
- [ ] Minimize App.
- [ ] Attempt to launch App again from terminal.
- [ ] Result: Existing window restores and focuses; new process exits.

## Notes / edge cases

- Argument parsing logic in `App.tsx` is currently a placeholder.
