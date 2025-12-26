
# Tauri Notifications UI (MDAT_TAURI_NOTIFICATIONS_UI)

## Summary
Usage of frontend UI notifications (via Mantine) to surface backend events and system status.

## User value
Immediate feedback for background actions (Tray events) or critical system states (Updates).

## Scope
- Frontend: `src/App.tsx`
- Rust: `N/A`
- Config: `N/A`
- Libraries: `@mantine/notifications`

## Implementation anchors
- Files:
  - `src/App.tsx`
- Key symbols:
  - `notifications.show`
- Events:
  - `systemTray` (Triggers notification)

## Contract
1. **Debug Notifications**:
   - System Tray events trigger a "System Tray Event" notification with the payload message.
2. **Update Notifications**:
   - Update availability triggers a persistent notification with action buttons.
   - Update progress status triggers status notifications.

## Acceptance checks
- [ ] Trigger a system tray event → Notification appears in UI.
- [ ] Notifications can be dismissed.

## Notes / edge cases
- This spec covers *Frontend UI* notifications. Native OS notifications are handled by `tauri-plugin-notification`, which is initialized in `lib.rs` but not explicitly used in the analyzed frontend code (though `notify` helper exists in `utils.ts`).
