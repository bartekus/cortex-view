
# i18n Types (MDAT_I18N_TYPES)

## Summary
TypeScript definitions ensuring strong typing for translation keys.

## User value
Prevents developer errors (typos in keys) and provides autocomplete for `t('')` calls.

## Scope
- Frontend: `src/translations/i18next.d.ts` (Note: file found at `src/translations/` not `src/`)
- Rust: `N/A`
- Config: `N/A`

## Implementation anchors
- Files:
  - `src/translations/i18next.d.ts` (Verified location)
- Key symbols:
  - `CustomTypeOptions`
  - `resources.en`
- Events:
  - `N/A`

## Contract
1. **Augmentation**:
   - Extends `'i18next'` module.
   - Sets `defaultNS` to 'translations'.
   - Maps `resources` to the shape of `en` JSON.
2. **Constraint**:
   - Only keys present in `en.json` are valid arguments for `t()`.

## Acceptance checks
- [ ] (Code Check) Typing `t('invalid_key')` causes a TypeScript error in the IDE.

## Notes / edge cases
- The file was found at `src/translations/i18next.d.ts` but referenced as `src/i18next.d.ts` in initial exploration. Correct path is `src/translations/`.
