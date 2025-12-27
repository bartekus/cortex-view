# UI Theme Contract (UI_THEME_CONTRACT)

## Summary

Management of Light/Dark mode preference.

## User value

Visual comfort.

## Scope

- Frontend: `src/root.tsx`
- Rust: `N/A`
- Config: `N/A`

## Implementation anchors

- Files:
  - `src/root.tsx`
- Key symbols:
  - `useMantineColorScheme`
  - `useComputedColorScheme`
  - `toggleColorScheme`
- Events:
  - `N/A`

## Contract

1. **Storage**:
   - Managed by Mantine (localStorage key `mantine-color-scheme-value` is default).
2. **Toggle**:
   - Button in Header.
   - Hotkey: `Ctrl+J`.
3. **Icons**:
   - Sun (Yellow) when Dark (to switch to Light).
   - Moon (Blue/Grey) when Light (to switch to Dark).

## Acceptance checks

- [ ] Click Toggle. Theme changes. Reload. Theme persists.
- [ ] Press `Ctrl+J`. Theme toggles.

## Notes / edge cases

- `defaultColorScheme` is typically `auto` (system pref) unless configured otherwise in `MantineProvider`.
