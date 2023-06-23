use wasm_bindgen::JsValue;
use wasm_bindgen_futures::JsFuture;
use wasm_bindgen_test::{wasm_bindgen_test, wasm_bindgen_test_configure};

wasm_bindgen_test_configure!(run_in_browser);

// This runs a unit test in native Rust, so it can only use Rust APIs.
#[test]
fn rust_test() {
    assert_eq!(1, 1);
}

// This runs a unit test in the browser, so it can use browser APIs.
#[wasm_bindgen_test]
fn web_test() {
    assert_eq!(1, 1);
}

// This runs a unit test in the browser, and in addition it supports asynchronous Future APIs.
#[wasm_bindgen_test(async)]
async fn async_test() {
    let promise = js_sys::Promise::resolve(&JsValue::from(42));

    let result = JsFuture::from(promise).await;

    match result {
        Ok(x) => {
            assert_eq!(x, JsValue::from(42));
        }
        Err(_) => {
            // Tutaj możesz obsłużyć błąd, jeśli chcesz.
            panic!("Promise failed");
        }
    }
}
