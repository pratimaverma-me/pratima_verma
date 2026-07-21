mod handlers;
mod models;
mod response;
mod routes;

use axum::http::{
    header::{ACCEPT, AUTHORIZATION, CONTENT_TYPE},
    HeaderValue, Method,
};
use tower_http::cors::CorsLayer;

#[tokio::main]
async fn main() {
    // Load .env from an explicit path relative to the crate root.
    //
    // CARGO_MANIFEST_DIR is fixed at compile time, so this continues to work
    // regardless of the directory from which the program is started.
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
            .map(|value| !value.trim().is_empty())
            .unwrap_or(false)
    );

    println!(
        "CONTACT_RECEIVER_EMAIL present: {}",
        std::env::var("CONTACT_RECEIVER_EMAIL")
            .map(|value| !value.trim().is_empty())
            .unwrap_or(false)
    );

    println!(
        "CONTACT_SENDER_EMAIL present: {}",
        std::env::var("CONTACT_SENDER_EMAIL")
            .map(|value| !value.trim().is_empty())
            .unwrap_or(false)
    );

    // Allow the deployed Vercel frontend to call this backend.
    let frontend_origin: HeaderValue =
        "https://pratima-verma-iind.vercel.app"
            .parse()
            .expect("invalid frontend origin");

    let cors = CorsLayer::new()
        .allow_origin(frontend_origin)
        .allow_methods([
            Method::GET,
            Method::POST,
            Method::PUT,
            Method::PATCH,
            Method::DELETE,
            Method::OPTIONS,
        ])
        .allow_headers([
            ACCEPT,
            AUTHORIZATION,
            CONTENT_TYPE,
        ]);

    // Create the existing router and add CORS middleware.
    let app = routes::create_router().layer(cors);

    // Render automatically provides the PORT environment variable.
    // Locally, the application will continue using port 8080.
    let port = std::env::var("PORT")
        .unwrap_or_else(|_| "8080".to_string());

    let address = format!("0.0.0.0:{port}");

    let listener = tokio::net::TcpListener::bind(&address)
        .await
        .unwrap_or_else(|error| {
            panic!("failed to bind to {address}: {error}");
        });

    println!("Server running at http://{address}");

    axum::serve(listener, app)
        .await
        .expect("server error");
}