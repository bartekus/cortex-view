# Tauri Config (TAURI_CONFIG)

## Summary

The central configuration for the Tauri build pipeline, windowing defaults, and security policies.

## User value

Defines the app's identity (name, version), window behavior (hidden by default to avoid flash), and security boundaries (CSP).

## Scope

- Frontend: `N/A`
- Rust: `N/A`
- Config: `src-tauri/tauri.conf.json`

## Implementation anchors

- Files:
  - `src-tauri/tauri.conf.json`
- Key symbols:
  - `productName`
  - `identifier`
  - `plugins`
- Events:
  - `N/A`

## Contract

1. **Build Commands**:
   - Dev: `ppnpm start` at `http://localhost:1420`
   - Prod: `ppnpm build` -> `../build`
2. **Window Defaults**:
   - `width`: 1000, `height`: 600
   - `resizable`: true
   - `visible`: false (Important: App must manually show window after loading to prevent white flash)
   - `decorations`: true (Can be overridden by custom titlebar logic)
3. **CSP**:
   - Default: `default-src blob: data: filesystem: ws: wss: http: https: tauri: 'unsafe-eval' 'unsafe-inline' 'self' img-src: 'self'; connect-src ipc: http://ipc.localhost`
4. **Updater**:
   - Active: true
   - Pubkey: (Empty in template, must be filled for prod)

## Acceptance checks

- [ ] `ppnpm tauri dev` launches the application.
- [ ] Application window is initially hidden and only appears when ready (handled by `TauriProvider`).
- [ ] Window is resizable.

## Notes / edge cases

- The `v1` to `v2` migration might have left some artifacts or specific configurations in `tauri.conf.json` that need validation against Tauri v2 schemas.
