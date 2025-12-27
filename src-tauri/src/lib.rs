mod tray_icon;
use tauri::Manager;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_log::Builder::default().build())
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            let _ = app
                .get_webview_window("main")
                .expect("no main window")
                .set_focus();
        }))
        .plugin(tauri_plugin_updater::Builder::new().build())
        .setup(|app| {
            tray_icon::create_tray_icon(app.handle())?;
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            tray_icon::process_file,
            tray_icon::tray_update_lang,
            greet
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
