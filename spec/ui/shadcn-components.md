
# UI Components: Shadcn (UI_COMPONENTS_SHADCN)

## Summary
Adoption of shadcn/ui component library for the core design system.

## User value
Professional, accessible, and customizable UI components with minimal effort.

## Scope
- Frontend: `src/components/ui/` (Planned)
- Rust: `N/A`
- Config: `components.json` (Planned)

## Implementation anchors
- Files:
  - `N/A` (Current components are Mantine)
- Key symbols:
  - `N/A`
- Events:
  - `N/A`

## Contract
1. **Structure**: Components live in `src/components/ui`.
2. **Style**: Powered by Tailwind CSS classes.
3. **Icons**: Lucide React (standard companion).

## Acceptance checks
- [ ] (Future) `npx shadcn-ui@latest add button` works.

## Notes / edge cases
- Current codebase uses Mantine. A migration strategy is needed.
