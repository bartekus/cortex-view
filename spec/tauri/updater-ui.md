# Tauri Updater UI (MDAT_TAURI_UPDATER_UI)

## Summary

In-app UI for detecting, downloading, and installing application updates.

## User value

Keeps the application up-to-date with fix and features without manual re-download.

## Scope

- Frontend: `src/root.tsx`
- Rust: `N/A`
- Config: `src-tauri/tauri.conf.json`

## Implementation anchors

- Files:
  - `src/root.tsx`
  - `src-tauri/tauri.conf.json`
- Key symbols:
  - `tauriUpdater.check()`
  - `update.downloadAndInstall`
- Events:
  - `Started`, `Progress`, `Finished` (Update lifecycle)

## Contract

1. **Check**:
   - Performed on `App.tsx` mount via `useEffect`.
2. **Notification**:
   - If `update` is available, shows a persistent Mantine notification.
   - Notification contains "Install and Relaunch" button.
3. **Install Flow**:
   - User clicks button.
   - `downloadAndInstall` callback handles events.
   - `Started`: Shows "Installing..." notification.
   - `Finished`: Calls `relaunch()`.

## Acceptance checks

- [ ] If update endpoint returns valid update, notification appears.
- [ ] (Mock/Simulate) Click install triggers download flow.

## Notes / edge cases

- Currently points to `https://youtu.be/ZXjlZBisYPQ` in `tauri.conf.json` (placeholder). Needs a real endpoint to function.
