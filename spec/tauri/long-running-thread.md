# Tauri Background Task (MDAT_TAURI_LONG_RUNNING_THREAD)

## Summary

Demonstration of a persistent Rust background task that emits events to the frontend periodically.

## User value

Proof of concept for backend-driven events (e.g., job completion, status updates) independent of user interaction.

## Scope

- Frontend: `src/root.tsx`
- Rust: `src-tauri/src/utils.rs`
- Config: `N/A`

## Implementation anchors

- Files:
  - `src-tauri/src/utils.rs`
  - `src/root.tsx`
- Key symbols:
  - `long_running_thread` (async function)
  - `longRunningThread` (Event)
- Events:
  - `longRunningThread`

## Contract

1. **Rust Logic**:
   - Spawned in `lib.rs` setup.
   - Infinite loop with 2-second sleep.
   - Emits `longRunningThread` event with `{ message: "LRT Message" }` to `main` window.
2. **Frontend Logic**:
   - `App.tsx` listens to `longRunningThread`.
   - Logs message to `tauriLogger.info`.

## Acceptance checks

- [ ] Open DevTools in Tauri window.
- [ ] Verify "LRT Message" appears every ~2 seconds.

## Notes / edge cases

- Runs unconditionally. In a real app, should likely be pausable or tied to specific state.
