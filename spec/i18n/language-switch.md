# i18n Language Switch (MDAT_I18N_LANGUAGE_SWITCH)

## Summary

UI component to manually toggle between supported languages, plus a keyboard shortcut.

## User value

Allows users to switch language instantly without changing system settings.

## Scope

- Frontend: `src/components/LanguageHeaders.tsx`
- Rust: `N/A`
- Config: `N/A`

## Implementation anchors

- Files:
  - `src/components/LanguageHeaders.tsx`
- Key symbols:
  - `LanguageHeaders`
  - `cycleLang`
  - `mod+Shift+L`
- Events:
  - `N/A`

## Contract

1. **Derivation**:
   - Supported languages derived from `Object.keys(resources)` in `i18n.ts`.
2. **Rendering**:
   - Returns null if only 1 language.
   - Renders uppercase codes separated by `|`.
   - Current language is Text (static).
   - Others are Anchors (clickable).
3. **Behavior**:
   - Click: `i18n.changeLanguage(lang)`.
   - Hotkey (`mod+Shift+L`): Cycles through languages in index order.

## Acceptance checks

- [ ] Click 'FR'. UI Updates.
- [ ] Press `Cmd+Shift+L` (Mac) or `Ctrl+Shift+L`. UI Cycles language.

## Notes / edge cases

- 'mod' maps to Ctrl on Windows/Linux and Cmd on macOS.
