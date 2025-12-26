# Custom Titlebar (MDAT_TAURI_CUSTOM_TITLEBAR)

## Summary

Rendering a custom React-based titlebar on Windows to blend with the app theme, while using native decorations on macOS/Linux.

## User value

Consistent, branded look-and-feel on Windows where native titlebars can look dated or mismatched.

## Scope

- Frontend: `src/tauri/TitleBar.tsx`, `src/tauri/TauriProvider.tsx`
- Rust: `N/A`
- Config: `N/A`

## Implementation anchors

- Files:
  - `src/tauri/TitleBar.tsx`
  - `src/tauri/TauriProvider.tsx`
- Key symbols:
  - `TitleBar` (Component)
  - `WIN32_CUSTOM_TITLEBAR` (Constant in TauriProvider)
  - `appWindow.minimize()`, `toggleMaximize()`, `close()`
- Events:
  - `N/A`

## Contract

1. **Activation**:
   - `WIN32_CUSTOM_TITLEBAR` constant in `TauriProvider`.
   - Only active if `osType === 'windows'` AND `!isFullScreen`.
   - If active, `appWindow.setDecorations(false)`.
2. **TitleBar Logic**:
   - Polls window state (maximized, fullscreen, title) every 200ms.
   - Renders Minimize/Maximize/Restore/Close buttons mapped to Tauri window commands.
   - Renders Application Icon and Title.
   - Menu dropdown on Icon click (Minimize, Maximize, Close).

## Acceptance checks

- [ ] (Windows) Verify custom titlebar renders.
- [ ] (Windows) Verify buttons control the window correctly.
- [ ] (Non-Windows) Verify custom titlebar is absent.

## Notes / edge cases

- `WIN32_CUSTOM_TITLEBAR` is currently `false` in the source, meaning native decorations are used by default.
