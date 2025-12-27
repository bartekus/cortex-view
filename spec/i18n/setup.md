# i18n Setup (I18N_SETUP)

## Summary

Configuration of `i18next` with React integration and browser language detection.

## User value

Automatically shows the interface in the user's preferred language (if supported), or falls back to English.

## Scope

- Frontend: `src/translations/i18n.ts`
- Rust: `N/A`
- Config: `src/translations/*.json`

## Implementation anchors

- Files:
  - `src/translations/i18n.ts`
- Key symbols:
  - `defaultLng` ('en')
  - `defaultNS` ('translations')
  - `LanguageDetector`
- Events:
  - `N/A`

## Contract

1. **Init**:
   - Uses `LanguageDetector`.
   - Fallback: `en`.
   - Default Namespace: `translations`.
   - Interpolation: `escapeValue: false` (React handles safety).
   - Key Separator: `false` (Flat JSON keys).
2. **Resources**:
   - Statically imports `en.json`, `fr.json`.
   - Exports `resources` object.

## Acceptance checks

- [ ] Change browser language preference to French.
- [ ] App loads in French (provided key exists).
- [ ] Change language returns to English (Fallback).

## Notes / edge cases

- Flat JSON keys mean nesting is not supported (e.g., `t('home.title')` looks for key `"home.title"`, not object `{ home: { title: ... } }`).
