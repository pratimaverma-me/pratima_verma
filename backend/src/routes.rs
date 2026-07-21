use axum::Router;
use axum::routing::{get, post};
use tower_http::cors::{AllowOrigin, Any, CorsLayer};

use crate::handlers;

pub fn create_router() -> Router {
    let allowed_origins = AllowOrigin::list([
        "http://localhost:3000"
            .parse::<axum::http::HeaderValue>()
            .unwrap(),
        "http://localhost:3001"
            .parse::<axum::http::HeaderValue>()
            .unwrap(),
    ]);

    let cors = CorsLayer::new()
        .allow_origin(allowed_origins)
        .allow_methods(Any)
        .allow_headers(Any);

    Router::new()
        .route("/api/v1/health", get(handlers::health))
        .route("/api/v1/profile", get(handlers::profile))
        .route("/api/v1/education", get(handlers::education))
        .route("/api/v1/experience", get(handlers::experience))
        .route("/api/v1/skills", get(handlers::skills))
        .route("/api/v1/projects", get(handlers::projects))
        .route("/api/v1/contact", post(handlers::contact))
        .layer(cors)
}
