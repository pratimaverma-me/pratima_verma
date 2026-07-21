mod handlers;
mod models;

mod response;
mod routes;

#[tokio::main]
async fn main() {
    // Load .env from an explicit path relative to the crate root
    // (CARGO_MANIFEST_DIR is baked in at compile time), rather than relying
    // on dotenvy's cwd-relative search — this makes it work correctly no
    // matter what directory `cargo run` / the compiled binary is launched
    // from.
    let env_path = std::path::Path::new(env!("CARGO_MANIFEST_DIR")).join(".env");
    dotenvy::from_path(&env_path).ok();

    println!("cwd: {:?}", std::env::current_dir());
    println!(
        "loading .env from: {:?} (exists: {})",
        env_path,
        env_path.exists()
    );
    println!(
        "RESEND_API_KEY present: {}",
        std::env::var("RESEND_API_KEY")
            .map(|v| !v.trim().is_empty())
            .unwrap_or(false)
    );
    println!(
        "CONTACT_RECEIVER_EMAIL present: {}",
        std::env::var("CONTACT_RECEIVER_EMAIL")
            .map(|v| !v.trim().is_empty())
            .unwrap_or(false)
    );
    println!(
        "CONTACT_SENDER_EMAIL present: {}",
        std::env::var("CONTACT_SENDER_EMAIL")
            .map(|v| !v.trim().is_empty())
            .unwrap_or(false)
    );

    let app = routes::create_router();

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080")
        .await
        .expect("failed to bind to port 8080");

    println!("Server running at http://localhost:8080");

    axum::serve(listener, app).await.expect("server error");
}
