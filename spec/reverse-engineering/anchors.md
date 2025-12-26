# Implementation Anchors Index

## System

| Feature ID             | Anchors                                                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **MDAT_REPO_CONTRACT** | `spec/reverse-engineering/repo-map.md`                                                                           |
| **MDAT_APP_BOOT**      | `src/main.tsx` (`ErrorBoundary`, `Providers`), `src/Providers.tsx` (`TauriProvider`, `Mantine`, `BrowserRouter`) |
| **MDAT_RUNTIME_MODE**  | `isTauri()` usage in `src/App.tsx`, `src/tauri/TauriProvider.tsx`                                                |

## UI Shell

| Feature ID              | Anchors                                                                                                          |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **UI_SHELL_CONTRACT**   | `src/App.tsx` (`AppShell`, `AppShell.Header`, `AppShell.Navbar`, `AppShell.Main`)                                |
| **UI_NAV_STATE**        | `src/App.tsx` (`mobileNavOpened`, `desktopNavOpened`), `src/common/utils.ts` (`useCookie('desktop-nav-opened')`) |
| **UI_SCROLL_CONTAINER** | `src/App.tsx` (`SimpleBar`, `ScrollToTop`, `setScroller`)                                                        |
| **UI_LOADING_STATES**   | `src/views/LazyView.tsx`, `src/views/FallbackSuspense.tsx`                                                       |
| **UI_ERROR_BOUNDARY**   | `src/main.tsx` (Global), `src/App.tsx` (Route-level `ErrorBoundary` around `Routes`)                             |
| **UI_THEME_CONTRACT**   | `src/App.tsx` (`useMantineColorScheme`, `toggleColorScheme`, `Ctrl+J`)                                           |

## Routing

| Feature ID                 | Anchors                                                  |
| -------------------------- | -------------------------------------------------------- |
| **ROUTING_RR7_CONTRACT**   | `src/App.tsx` (`Routes`, `Route`, `Navigate`)            |
| **ROUTING_VIEWS_REGISTRY** | `src/App.tsx` (`const views: View[]`)                    |
| **ROUTING_LAZY_VIEWS**     | `src/App.tsx` (`lazy(() => import('./views/LazyView'))`) |

## i18n

| Feature ID                    | Anchors                                                         |
| ----------------------------- | --------------------------------------------------------------- |
| **MDAT_I18N_SETUP**           | `src/translations/i18n.ts` (`i18next.init`, `LanguageDetector`) |
| **MDAT_I18N_TYPES**           | `src/i18next.d.ts` (CustomTypeOptions)                          |
| **MDAT_I18N_LANGUAGE_SWITCH** | `src/components/LanguageHeaders.tsx`                            |
| **MDAT_I18N_RUST_TRAY_LANG**  | `src-tauri/src/tray_icon.rs` (`tray_update_lang` command)       |

## State / Persistence

| Feature ID                        | Anchors                                             |
| --------------------------------- | --------------------------------------------------- |
| **MDAT_PERSIST_LOCALFORAGE_HOOK** | `src/common/utils.ts` (`useLocalForage`)            |
| **MDAT_PERSIST_COOKIE**           | `src/common/utils.ts` (`useCookie`)                 |
| **MDAT_STORAGE_ABSTRACTION**      | `src/tauri/storage.ts` (Store vs localforage logic) |

## Tauri

| Feature ID                         | Anchors                                                                                         |
| ---------------------------------- | ----------------------------------------------------------------------------------------------- |
| **MDAT_TAURI_CONFIG**              | `src-tauri/tauri.conf.json`                                                                     |
| **MDAT_TAURI_CAPABILITIES**        | `src-tauri/capabilities/desktop.json`, `src-tauri/capabilities/migrated.json`                   |
| **MDAT_TAURI_LOGGING**             | `src-tauri/src/lib.rs` (`tauri_plugin_log`), `src/main.tsx` (`tauriLogger.error`)               |
| **MDAT_TAURI_SINGLE_INSTANCE**     | `src-tauri/src/lib.rs` (`tauri_plugin_single_instance`), `src/App.tsx` (`newInstance` listener) |
| **MDAT_TAURI_TRAY_MENU**           | `src-tauri/src/tray_icon.rs`, `src/App.tsx` (`systemTray` listener)                             |
| **MDAT_TAURI_LONG_RUNNING_THREAD** | `src-tauri/src/utils.rs` (`long_running_thread`), `src/App.tsx` (`longRunningThread` listener)  |
| **MDAT_TAURI_UPDATER_UI**          | `src/App.tsx` (`tauriUpdater.check`), `src-tauri/tauri.conf.json` (Updater plugin)              |
| **MDAT_TAURI_NOTIFICATIONS_UI**    | `src/App.tsx` (`notifications.show` calls)                                                      |
| **MDAT_TAURI_WINDOW_STATE_PLUGIN** | `src-tauri/src/lib.rs` (`tauri_plugin_window_state`)                                            |
| **MDAT_TAURI_STORE_PLUGIN**        | `src-tauri/src/lib.rs` (`tauri_plugin_store`)                                                   |
| **MDAT_TAURI_PROVIDER_CONTEXT**    | `src/tauri/TauriProvider.tsx` (`TauriContext`, `getUserAppFiles`)                               |
| **MDAT_TAURI_CUSTOM_TITLEBAR**     | `src/tauri/TitleBar.tsx`, `src/tauri/TauriProvider.tsx` (`WIN32_CUSTOM_TITLEBAR`)               |
| **MDAT_TAURI_FS_ENUM_APPFILES**    | `src/tauri/TauriProvider.tsx` (`getUserAppFiles`)                                               |
| **MDAT_TAURI_MIN_WIDTH**           | `src/tauri/TauriProvider.tsx` (`useMinWidth`)                                                   |
| **MDAT_TAURI_IPC_COMMANDS**        | `src-tauri/src/lib.rs` (`tray_update_lang`, `process_file`)                                     |
