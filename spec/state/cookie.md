# Persistence: Cookie (PERSIST_COOKIE)

## Summary

A React hook (`useCookie`) for persisting simple preferences to browser cookies.

## User value

Used for Sidebar toggle state (`desktop-nav-opened`) to preserve layout preference.

## Scope

- Frontend: `src/common/utils.ts`
- Rust: `N/A`
- Config: `N/A`

## Implementation anchors

- Files:
  - `src/common/utils.ts`
- Key symbols:
  - `useCookie`
  - `Cookies` (js-cookie)
- Events:
  - `N/A`

## Contract

1. **Format**:
   - Default options: `expires: 365000` (Millennia), `sameSite: 'lax'`, `path: '/'`.
2. **Behavior**:
   - Reads synchronously from `Cookies.get` on init.
   - Updates `Cookies.set` on state change.
3. **Usage**:
   - Primarily used for synchronizing some UI states that might be needed by server (if SSR existed) or just for simple string kv storage.

## Acceptance checks

- [ ] Toggle Desktop Nav. Reload. Nav remains in toggled state.
- [ ] Inspect DevTools > Application > Cookies. Verify `desktop-nav-opened` exists.

## Notes / edge cases

- Synchronous read means it blocks the first render tick with the correct value (no flash), unlike async localForage.
