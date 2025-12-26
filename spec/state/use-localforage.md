# Persistence: LocalForage (MDAT_PERSIST_LOCALFORAGE_HOOK)

## Summary

A React hook (`useLocalForage`) for persisting generic component state to IndexedDB via localForage.

## User value

Remembers UI state (like "Footers Seen") across sessions without needing a backend.

## Scope

- Frontend: `src/common/utils.ts`
- Rust: `N/A`
- Config: `N/A`

## Implementation anchors

- Files:
  - `src/common/utils.ts`
- Key symbols:
  - `useLocalForage`
  - `localforage`
- Events:
  - `N/A`

## Contract

1. **Loading**:
   - `useLayoutEffect` fetches item by key.
   - `loading` state is true until fetch completes.
   - If null, sets default value.
2. **Saving**:
   - `useEffect` saves to localForage on state change.
   - **Guard**: Checks `!loading` to prevent overwriting stored data with initial default state before load completes.
3. **Structure**:
   - Returns `[state, setState, loading]`.

## Acceptance checks

- [ ] Set a value using the hook. Reload page. Value persists.
- [ ] Verify no "flash" of default value overwriting stored value (race condition check).

## Notes / edge cases

- Only supports primitives/objects serializable by localForage (Structured Clone).
