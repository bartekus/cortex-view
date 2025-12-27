use tauri::{
    menu::{Menu, MenuItem, Submenu},
    tray::{MouseButton, TrayIconBuilder, TrayIconEvent},
    AppHandle, Emitter, Manager, Runtime,
};

#[tauri::command]
pub fn process_file(filepath: String) -> String {
    println!("Processing file: {}", filepath);
    "Hello from Rust!".to_string()
}

#[tauri::command]
pub fn tray_update_lang<R: Runtime>(app: AppHandle<R>, lang: String) {
    let _ = app.tray_by_id("main").map(|tray| {
        let _ = tray.set_menu(Some(create_tray_menu(&app, &lang)));
    });
}

fn create_tray_menu<R: Runtime>(app: &AppHandle<R>, _lang: &str) -> Menu<R> {
    // TODO: tray internationalization
    let toggle = MenuItem::with_id(app, "toggle-visibility", "Hide Window", true, None::<&str>)
        .expect("create hide item");
    let quit =
        MenuItem::with_id(app, "quit", "Quit", true, None::<&str>).expect("create quit item");
    let toggle_icon = MenuItem::with_id(app, "toggle-tray-icon", "Toggle Icon", true, None::<&str>)
        .expect("create toggle icon item");
    let submenu = Submenu::with_items(
        app,
        "Sub Menu!",
        true,
        &[
            &MenuItem::with_id(app, "test", "Test Item", true, None::<&str>)
                .expect("create test item"),
        ],
    )
    .expect("create submenu");

    Menu::with_items(app, &[&toggle, &quit, &toggle_icon, &submenu]).expect("create menu")
}

pub fn create_tray_icon<R: Runtime>(app: &AppHandle<R>) -> tauri::Result<()> {
    let menu = create_tray_menu(app, "en");

    let _tray = TrayIconBuilder::with_id("main")
        .menu(&menu)
        .icon(app.default_window_icon().unwrap().clone())
        .on_menu_event(move |app, event| {
            let id = event.id.as_ref();
            match id {
                "quit" => {
                    std::process::exit(0);
                }
                "toggle-visibility" => {
                    if let Some(window) = app.get_webview_window("main") {
                        if window.is_visible().unwrap_or(false) {
                            let _ = window.hide();
                            // Update menu text to "Show Window" - complex in v2,
                            // typically requires rebuilding menu or keeping handle.
                            // For simplicity in this contract, we just toggle visibility.
                        } else {
                            let _ = window.show();
                            let _ = window.set_focus();
                        }
                    }
                }
                "toggle-tray-icon" => {
                    // Placeholder for icon swapping logic
                    println!("Toggle tray icon clicked - logic pending assets");
                }
                _ => {
                    // Emit event to frontend
                    let _ = app.emit("systemTray", id);
                }
            }
        })
        .on_tray_icon_event(|tray, event| {
            if let TrayIconEvent::Click {
                button: MouseButton::Left,
                ..
            } = event
            {
                let app = tray.app_handle();
                if let Some(window) = app.get_webview_window("main") {
                    let _ = window.show();
                    let _ = window.set_focus();
                }
                let _ = app.emit("system-tray", "left-click");
            }
        })
        .build(app)?;

    Ok(())
}
