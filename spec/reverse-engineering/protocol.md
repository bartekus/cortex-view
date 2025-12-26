# Reverse Engineering Protocol (MDAT_REVERSE_ENGINEERING_PROTOCOL)

## Summary

The systematic process used to extract contract specifications from the existing `modern-desktop-app-template` codebase without modifying behavior.

## User value

Ensures the rewrite to React Router v7 and shadcn/ui starts from a solid understanding of the current feature set, minimizing regression risks.

## Scope

- Frontend: All
- Rust: All
- Config: All

## Implementation anchors

- Files:
  - `spec/task.md` (Execution log)
  - `spec/features.yaml` (Registry)
- Key symbols:
  - `N/A`
- Events:
  - `N/A`

## Contract

1. **Discovery Loop**:
   - Read `features.yaml` to identify Feature ID.
   - Search codebase for relevant files/symbols (Anchors).
   - Read source code to understand behavior.
2. **Spec Generation**:
   - Create `spec/<domain>/<name>.md`.
   - Fill "Summary", "User Value", "Scope", "Anchors", "Contract", "Acceptance".
3. **Verification**:
   - Cross-check generated spec against code reality.
   - Update `task.md` progress.

## Acceptance checks

- [ ] All features in `features.yaml` have a corresponding `.md` file in `spec/`.
- [ ] `spec/reverse-engineering/repo-map.md` exists.
- [ ] `spec/reverse-engineering/parity.md` exists and shows 100% coverage.

## Notes / edge cases

- This protocol is self-referential.
