
# UI Theme Shadcn (UI_THEME_SHADCN_IMPL)

## Summary
Planned migration target for theming using CSS variables and Tailwind, compatible with shadcn/ui.

## User value
Modern, fine-grained control over design tokens.

## Scope
- Frontend: `src/globals.css` (Planned)
- Rust: `N/A`
- Config: `tailwind.config.js` (Planned)

## Implementation anchors
- Files:
  - `N/A` (Use `spec/ui/theme-contract.md` as current truth)
- Key symbols:
  - `N/A`
- Events:
  - `N/A`

## Contract
1. **Compatibility**: Must support `light` and `dark` classes on root.
2. **Variables**: define `--background`, `--foreground`, `--primary`, etc.

## Acceptance checks
- [ ] (Future) Tailwind classes reflect current theme.

## Notes / edge cases
- Placeholder spec.
