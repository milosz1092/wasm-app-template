use std::time::Duration;

#[cfg(target_arch = "wasm32")]
use wasm_thread as thread;

#[cfg(target_arch = "wasm32")]
mod wasm {
    use crate::main;
    use wasm_bindgen::prelude::*;

    // Prevent `wasm_bindgen` from autostarting main on all spawned threads
    #[wasm_bindgen(start)]
    pub fn dummy_main() {}

    // Export explicit run function to start main
    #[wasm_bindgen]
    pub fn run() {
        console_log::init().unwrap();
        console_error_panic_hook::set_once();
        main();
    }
}

fn main() {
    thread::spawn(|| {
        log::info!(
            "hi number from the spawned thread {:?}!",
            thread::current().id()
        );
        thread::sleep(Duration::from_millis(1));
    });

    log::info!(
        "hi number from the main thread {:?}!",
        thread::current().id()
    );
}
