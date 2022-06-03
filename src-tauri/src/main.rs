#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use num::bigint::ToBigInt;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![factorial])
        .run(tauri::generate_context!())
        .expect("Error while running tauri application");
}

#[tauri::command]
fn factorial(num: i32) -> String {
    if let Some(mut factorial) = 1.to_bigint() {
        for i in 1..=num {
            factorial = factorial * i;
        }
        factorial.to_string()
    } else {
        panic!("Failed to calculate factorial!");
    }
}
