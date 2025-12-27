# Implementation Anchors Index

## System

| Feature ID        | Anchors                                                            |
| ----------------- | ------------------------------------------------------------------ |
| **REPO_CONTRACT** | `spec/reverse-engineering/repo-map.md`                             |
| **APP_BOOT**      | `src/root.tsx` (`Layout`, `ErrorBoundary`), `src/routes.ts`        |
| **RUNTIME_MODE**  | `isTauri()` usage in `src/root.tsx`, `src/tauri/TauriProvider.tsx` |

## UI Shell

| Feature ID              | Anchors                                                                      |
| ----------------------- | ---------------------------------------------------------------------------- |
| **UI_SHELL_CONTRACT**   | `src/root.tsx` (`Layout` component, `AppShell` placeholder)                  |
| **UI_NAV_STATE**        | `src/root.tsx` (Nav state state), `src/common/utils.ts`                      |
| **UI_SCROLL_CONTAINER** | `src/root.tsx` (Main scroll area)                                            |
| **UI_LOADING_STATES**   | `src/root.tsx` (`HydrateFallback` if used), `src/components/ui/skeleton.tsx` |
| **UI_ERROR_BOUNDARY**   | `src/root.tsx` (`ErrorBoundary` export)                                      |
| **UI_THEME_CONTRACT**   | `src/root.tsx` (`useMantineColorScheme` equivalent)                          |

## Routing

| Feature ID                 | Anchors                                   |
| -------------------------- | ----------------------------------------- |
| **ROUTING_RR7_CONTRACT**   | `src/routes.ts` (Route Configuration)     |
| **ROUTING_VIEWS_REGISTRY** | `src/routes.ts` (View imports)            |
| **ROUTING_LAZY_VIEWS**     | `src/routes.ts` (Dynamic imports handled) |

## i18n

| Feature ID               | Anchors                                                         |
| ------------------------ | --------------------------------------------------------------- |
| **I18N_SETUP**           | `src/translations/i18n.ts` (`i18next.init`, `LanguageDetector`) |
| **I18N_TYPES**           | `src/i18next.d.ts` (CustomTypeOptions)                          |
| **I18N_LANGUAGE_SWITCH** | `src/components/LanguageHeaders.tsx`                            |
| **I18N_RUST_TRAY_LANG**  | `src-tauri/src/tray_icon.rs` (`tray_update_lang` command)       |

## State / Persistence

| Feature ID                   | Anchors                                             |
| ---------------------------- | --------------------------------------------------- |
| **PERSIST_LOCALFORAGE_HOOK** | `src/common/utils.ts` (`useLocalForage`)            |
| **PERSIST_COOKIE**           | `src/common/utils.ts` (`useCookie`)                 |
| **STORAGE_ABSTRACTION**      | `src/tauri/storage.ts` (Store vs localforage logic) |

## Tauri

| Feature ID | Anchors |

# Codebase Anchors

This file maps abstract system concepts to concrete files.

| Concept | File / Anchor | logic |
| source of truth | `spec/features.yaml` | Feature Registry |
| **Boot Entry** | `src/entry.client.tsx` | Hydrates the app |
| **App Root** | `src/root.tsx` | Main Layout & Providers |
| **Routing Config** | `src/routes.ts` | Route table definition |
| **Tauri Config** | `src-tauri/tauri.conf.json` | Platform config |
| **Tauri Entry** | `src-tauri/src/lib.rs` | Rust entry point |
| **Global Styles** | `src/root.tsx` (links) | Usage of `app.css` / Tailwind |
| **Shell Component** | `src/root.tsx` | Top-level layout structure |
| **TAURI_UPDATER_UI** | `src/root.tsx` (`tauriUpdater.check`), `src-tauri/tauri.conf.json` (Updater plugin) |
| **TAURI_NOTIFICATIONS_UI** | `src/root.tsx` (`notifications.show` calls) |
| **TAURI_WINDOW_STATE_PLUGIN** | `src-tauri/src/lib.rs` (`tauri_plugin_window_state`) |
| **TAURI_STORE_PLUGIN** | `src-tauri/src/lib.rs` (`tauri_plugin_store`) |
| **TAURI_PROVIDER_CONTEXT** | `src/tauri/TauriProvider.tsx` (`TauriContext`, `getUserAppFiles`) |
| **TAURI_CUSTOM_TITLEBAR** | `src/tauri/TitleBar.tsx`, `src/tauri/TauriProvider.tsx` (`WIN32_CUSTOM_TITLEBAR`) |
| **TAURI_FS_ENUM_APPFILES** | `src/tauri/TauriProvider.tsx` (`getUserAppFiles`) |
| **TAURI_MIN_WIDTH** | `src/tauri/TauriProvider.tsx` (`useMinWidth`) |
| **TAURI_IPC_COMMANDS** | `src-tauri/src/lib.rs` (`tray_update_lang`, `process_file`) |
