# Window Min-Width (TAURI_MIN_WIDTH)

## Summary

Enforces a minimum logical window width to ensure UI usability.

## User value

Prevents the layout from breaking or becoming unusable if the window is resized too small.

## Scope

- Frontend: `src/tauri/TauriProvider.tsx`
- Rust: `N/A`
- Config: `tauri.conf.json` (`minWidth` key)

## Implementation anchors

- Files:
  - `src/tauri/TauriProvider.tsx`
- Key symbols:
  - `useMinWidth` (Hook)
- Events:
  - `N/A`

## Contract

1. **Logic**:
   - Gets `currentMonitor()` scale factor.
   - Gets current `innerSize()` (Physical).
   - Converts Physical -> Logical.
   - If `logicalWidth < minWidth`:
     - Resizes window to `minWidth` (Logical).
2. **Execution**:
   - Runs on mount.

## Acceptance checks

- [ ] Resize window to be very narrow.
- [ ] Refresh app (triggering mount check).
- [ ] Window should snap back to minimum width.

## Notes / edge cases

- `tauri.conf.json` also has `minWidth`. This hook acts as a runtime enforcement, potentially for dynamic constraints.
