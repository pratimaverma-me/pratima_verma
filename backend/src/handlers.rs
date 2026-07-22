use axum::Json;
use axum::http::StatusCode;

use crate::models::{
    ContactRequest, ContactResponseData, EducationItem, ExperienceItem, HealthData, ProfileData,
    ProjectItem, ProjectLink, ProjectMetric, SkillCategory, SocialLink,
};
use crate::response::{ApiError, ApiResponse};

pub async fn health() -> Json<ApiResponse<HealthData>> {
    let data = HealthData {
        status: "running".to_string(),
    };

    Json(ApiResponse::success(data))
}

pub async fn profile() -> Json<ApiResponse<ProfileData>> {
    let data = ProfileData {
        name: "Pratima Verma".to_string(),
        title: "Quant Developer / Rust Backend Engineer".to_string(),
        summary: "I design and build quantitative trading systems, high-performance backend applications, and AI-powered software with a focus on performance, reliability, and clean architecture."
            .to_string(),
        journey: "My path into software started with a Master's in Computer Science and a background in Telematics at Dayalbagh Educational Institute. That grew into a focus on Rust and systems programming, and today I work as a Rust Developer Intern at Raghunandan Money, building order book and market-data infrastructure for low-latency trading — while publishing OrderPulse, my own Rust-powered market-data library, on PyPI."
            .to_string(),
        enjoys_building: "I enjoy building high-performance backend systems — order book engines, binary market-data parsers, and Python-facing libraries — where correctness and low latency both matter, along with AI-powered tools that make complex data easier to work with."
            .to_string(),
        focus_areas: vec![
            "Quantitative Trading".to_string(),
            "Rust".to_string(),
            "Backend Engineering".to_string(),
            "AI".to_string(),
            "High Performance Systems".to_string(),
        ],
        availability: "I am currently open to Rust Backend, Quant Developer, Low-Latency Systems, and Systems Engineering opportunities."
            .to_string(),
        location: "Agra, Uttar Pradesh, India".to_string(),
        email: "pratimaverma711@gmail.com".to_string(),
        phone: "+91 7817806908".to_string(),
        resume_url: "/resume/Pratima_Verma_Resume.pdf".to_string(),
        socials: vec![
            SocialLink {
                label: "GitHub".to_string(),
                href: "https://github.com/pratimaverma-me".to_string(),
                icon: "github".to_string(),
            },
            SocialLink {
                label: "LinkedIn".to_string(),
                href: "https://linkedin.com/in/pratimaverma10".to_string(),
                icon: "linkedin".to_string(),
            },
            SocialLink {
                label: "Email".to_string(),
                href: "mailto:pratimaverma711@gmail.com".to_string(),
                icon: "mail".to_string(),
            },
            SocialLink {
                label: "Phone".to_string(),
                href: "tel:+917817806908".to_string(),
                icon: "phone".to_string(),
            },
        ],
    };

    Json(ApiResponse::success(data))
}

pub async fn education() -> Json<ApiResponse<Vec<EducationItem>>> {
    let data = vec![
        EducationItem {
            id: "edu-1".to_string(),
            degree: "Master In Computer Science".to_string(),
            institution: "Dayalbagh Educational Institute".to_string(),
            start_date: "Sept 2023".to_string(),
            end_date: "May 2025".to_string(),
            coursework: vec![
                "Data Structures & Algorithms".to_string(),
                "Computer Networks".to_string(),
                "Operating Systems".to_string(),
                "Compiler Design".to_string(),
                "Data Mining".to_string(),
                "Quantum Computing".to_string(),
                "Neural Networks".to_string(),
            ],
        },
        EducationItem {
            id: "edu-2".to_string(),
            degree: "B.Voc in Telematics".to_string(),
            institution: "Dayalbagh Educational Institute".to_string(),
            start_date: "Sept 2019".to_string(),
            end_date: "May 2022".to_string(),
            coursework: vec![
                "Machine Learning".to_string(),
                "Deep Learning".to_string(),
                "NLP".to_string(),
                "Operating Systems".to_string(),
                "Python".to_string(),
                "Java".to_string(),
            ],
        },
    ];

    Json(ApiResponse::success(data))
}

pub async fn experience() -> Json<ApiResponse<Vec<ExperienceItem>>> {
    let data = vec![
        ExperienceItem {
            id: "exp-1".to_string(),
            role: "Rust Developer Intern".to_string(),
            organization: "Raghunandan Money".to_string(),
            location: "Agra, Uttar Pradesh".to_string(),
            start_date: "Nov 2025".to_string(),
            end_date: "Present".to_string(),
            highlights: vec![
                "Developing a high-performance Order Book and Trade Processing Engine in Rust for low-latency financial market infrastructure.".to_string(),
                "Designed and developed OrderPulse, a Rust-powered market-data processing library exposed to Python through PyO3.".to_string(),
                "Building production-grade binary feed parsers for exchange order and trade messages with real-time decoding and event processing.".to_string(),
                "Working on MCX and NSE market-data systems involving binary feed reading, event extraction, automation, and high-throughput pipelines.".to_string(),
                "Implemented order book workflows supporting New, Modify, Cancel, and Trade events.".to_string(),
                "Optimized internal storage by replacing tree-based implementations with cache-friendly array-indexed designs to reduce latency.".to_string(),
                "Applied Rust ownership, borrowing, and concurrency models for thread-safe and memory-safe execution.".to_string(),
                "Developed unit tests, debugging workflows, benchmarks, and profiling tools to improve reliability and performance.".to_string(),
            ],
            tags: vec![
                "Rust".to_string(),
                "PyO3".to_string(),
                "Order Book".to_string(),
                "Market Data".to_string(),
                "Concurrency".to_string(),
            ],
        },
        ExperienceItem {
            id: "exp-2".to_string(),
            role: "Full Stack Developer Intern".to_string(),
            organization: "Infotech".to_string(),
            location: "Noida".to_string(),
            start_date: "Jun 2023".to_string(),
            end_date: "Aug 2023".to_string(),
            highlights: vec![
                "Developed responsive web applications using HTML, CSS, JavaScript, and Bootstrap.".to_string(),
                "Integrated ASP.NET services with SQL databases for secure backend operations and data management.".to_string(),
                "Participated in debugging, testing, and deployment activities across development environments.".to_string(),
            ],
            tags: vec![
                "HTML".to_string(),
                "CSS".to_string(),
                "JavaScript".to_string(),
                "Bootstrap".to_string(),
                "ASP.NET".to_string(),
                "SQL".to_string(),
            ],
        },
    ];

    Json(ApiResponse::success(data))
}

pub async fn skills() -> Json<ApiResponse<Vec<SkillCategory>>> {
    let data = vec![
        SkillCategory {
            id: "skills-1".to_string(),
            category: "Programming Languages".to_string(),
            skills: vec![
                "Rust".to_string(),
                "C".to_string(),
                "C++".to_string(),
                "Python".to_string(),
                "SQL".to_string(),
            ],
        },
        SkillCategory {
            id: "skills-2".to_string(),
            category: "Software Engineering".to_string(),
            skills: vec![
                "OOP".to_string(),
                "Data Structures & Algorithms".to_string(),
                "Design Patterns".to_string(),
                "System Design".to_string(),
                "Software Architecture".to_string(),
            ],
        },
        SkillCategory {
            id: "skills-3".to_string(),
            category: "Rust & Systems Programming".to_string(),
            skills: vec![
                "Ownership".to_string(),
                "Borrowing".to_string(),
                "Lifetimes".to_string(),
                "Memory Safety".to_string(),
                "Error Handling".to_string(),
                "Traits".to_string(),
                "Generics".to_string(),
                "Multithreading".to_string(),
                "Concurrency".to_string(),
            ],
        },
        SkillCategory {
            id: "skills-4".to_string(),
            category: "Operating Systems".to_string(),
            skills: vec![
                "Linux".to_string(),
                "Process Management".to_string(),
                "Memory Management".to_string(),
                "File Systems".to_string(),
                "Shell Environment".to_string(),
            ],
        },
        SkillCategory {
            id: "skills-5".to_string(),
            category: "Financial Systems".to_string(),
            skills: vec![
                "Low-Latency Trading Systems".to_string(),
                "Order Book Engine".to_string(),
                "Market Data Feeds".to_string(),
                "NSE Feed Processing".to_string(),
                "MCX Feed Processing".to_string(),
                "Trade Processing".to_string(),
            ],
        },
        SkillCategory {
            id: "skills-6".to_string(),
            category: "Performance Engineering".to_string(),
            skills: vec![
                "Benchmarking".to_string(),
                "Profiling".to_string(),
                "Optimization".to_string(),
                "Throughput Analysis".to_string(),
                "Latency Reduction".to_string(),
            ],
        },
        SkillCategory {
            id: "skills-7".to_string(),
            category: "Testing & Debugging".to_string(),
            skills: vec![
                "Unit Testing".to_string(),
                "Integration Testing".to_string(),
                "GDB".to_string(),
                "LLDB".to_string(),
                "Valgrind".to_string(),
                "Logging".to_string(),
            ],
        },
        SkillCategory {
            id: "skills-8".to_string(),
            category: "Tools & Frameworks".to_string(),
            skills: vec![
                "PyO3".to_string(),
                "Git".to_string(),
                "Linux Server".to_string(),
                "CUDA".to_string(),
                "TensorFlow".to_string(),
                "PyTorch".to_string(),
            ],
        },
    ];

    Json(ApiResponse::success(data))
}

pub async fn projects() -> Json<ApiResponse<Vec<ProjectItem>>> {
    let data = vec![
        ProjectItem {
            id: "proj-1".to_string(),
            name: "OrderPulse".to_string(),
            period: "2026".to_string(),
            description: "OrderPulse is a high-performance exchange feed parser and order-flow analytics library. It uses Rust for speed and exposes Python bindings for reading NSE binary order/trade feed files, enriching messages with contract metadata, and building token-level order book snapshots.".to_string(),
            highlights: vec![
                "Reads NSE binary order and trade feed files using a Rust-powered parser exposed to Python through PyO3.".to_string(),
                "Enriches decoded messages with contract metadata.".to_string(),
                "Implemented MessageCacheReader for full-file memory caching and StreamingBinaryLoader for large binary feed files.".to_string(),
                "Developed OrderbookBuilder for market depth, best bid/ask, spread, mid-price, and real-time order book snapshots.".to_string(),
                "Built Python APIs using PyO3, exposing decoded order and trade messages as Python-native objects and dictionaries.".to_string(),
                "Added support for complete order lifecycle management including New, Modify, Cancel, and Trade events.".to_string(),
                "Performed benchmarking, profiling, memory optimization, and latency analysis to improve runtime performance.".to_string(),
            ],
            tech_stack: vec![
                "Rust".to_string(),
                "Python".to_string(),
                "PyO3".to_string(),
                "C++".to_string(),
                "NSE Market Data".to_string(),
                "Binary Feed Parsing".to_string(),
                "Order Book Architecture".to_string(),
                "Multithreading".to_string(),
                "Concurrency".to_string(),
            ],
            image_url: None,
            links: vec![ProjectLink {
                label: "View on PyPI".to_string(),
                href: "https://pypi.org/project/orderpulse/".to_string(),
            }],
            featured: true,
            metrics: vec![],
            metrics_note: None,
        },
        ProjectItem {
            id: "proj-2".to_string(),
            name: "Order Book Reconstruction from Trade and Order Messages".to_string(),
            period: "Nov 2025 – Present".to_string(),
            description: "Built an order book reconstruction system at RMoney using exchange trade and order messages, processing new order, modify, cancel, and trade execution events to maintain the bid side, ask side, price levels, order quantities, market depth, and best bid/best ask in real time.".to_string(),
            highlights: vec![
                "Parsed trade and order messages from exchange market-data feeds.".to_string(),
                "Reconstructed the order book event by event from raw message streams.".to_string(),
                "Maintained price-time priority across all order book updates.".to_string(),
                "Updated bid and ask levels in real time as new events arrived.".to_string(),
                "Calculated top-of-book and market depth from the reconstructed order book.".to_string(),
                "Validated the reconstructed order book against exchange snapshots for correctness.".to_string(),
                "Investigated missing, duplicate, and out-of-order messages.".to_string(),
                "Benchmarked the engine against a full trading day of approximately 5 million order and trade messages, measuring an average per-message processing latency of ~32 nanoseconds.".to_string(),
            ],
            tech_stack: vec![
                "C++".to_string(),
                "Python".to_string(),
                "Market Microstructure".to_string(),
                "Order Book".to_string(),
                "Low-Latency Systems".to_string(),
                "Exchange Market Data".to_string(),
            ],
            image_url: None,
            links: vec![],
            featured: true,
            metrics: vec![
                ProjectMetric {
                    label: "Messages Processed".to_string(),
                    value: "~5,000,000".to_string(),
                    caption: "Full trading day replay — measured".to_string(),
                },
                ProjectMetric {
                    label: "Avg Latency / Message".to_string(),
                    value: "~32 ns".to_string(),
                    caption: "Average, not worst-case — measured".to_string(),
                },
                ProjectMetric {
                    label: "Total Processing Time".to_string(),
                    value: "~0.16 s".to_string(),
                    caption: "Derived: messages × avg latency".to_string(),
                },
                ProjectMetric {
                    label: "Throughput".to_string(),
                    value: "~31.25M msg/s".to_string(),
                    caption: "Derived: 1s ÷ avg latency".to_string(),
                },
            ],
            metrics_note: Some(
                "Benchmark figures reflect average per-message processing latency within the core engine, measured across a full day's message replay — not a claim that all 5 million messages were processed in 32 nanoseconds. Total processing time and throughput are calculated directly from that average (messages × avg latency, and 1s ÷ avg latency, respectively). Actual end-to-end runtime may differ due to file I/O, message parsing, memory allocation, logging, and other system overhead."
                    .to_string(),
            ),
        },
        ProjectItem {
            id: "proj-3".to_string(),
            name: "Automatic Flood Detection System".to_string(),
            period: "2023 – 2024".to_string(),
            description: "Real-time flood-level detection system built on a YOLOv8-based multi-class image detection model.".to_string(),
            highlights: vec![
                "Designed and trained a YOLOv8-based real-time flood-level detection system using a multi-class image dataset.".to_string(),
                "Performed model comparison, K-fold validation, latency benchmarking, error analysis, and performance evaluation.".to_string(),
                "Optimized inference performance and analyzed deployment feasibility for real-time monitoring systems.".to_string(),
            ],
            tech_stack: vec![
                "Python".to_string(),
                "YOLOv8".to_string(),
                "PyTorch".to_string(),
            ],
            image_url: None,
            links: vec![],
            featured: false,
            metrics: vec![],
            metrics_note: None,
        },
    ];

    Json(ApiResponse::success(data))
}

pub async fn contact(
    Json(payload): Json<ContactRequest>,
) -> Result<(StatusCode, Json<ApiResponse<ContactResponseData>>), (StatusCode, Json<ApiError>)> {
    let name = payload.name.trim();
    let email = payload.email.trim();
    let message = payload.message.trim();

    if name.is_empty() {
        return Err((
            StatusCode::BAD_REQUEST,
            Json(ApiError::new("Name is required.")),
        ));
    }
    if name.len() > 200 {
        return Err((
            StatusCode::BAD_REQUEST,
            Json(ApiError::new("Name is too long.")),
        ));
    }
    if !is_valid_email(email) {
        return Err((
            StatusCode::BAD_REQUEST,
            Json(ApiError::new("A valid email address is required.")),
        ));
    }
    if message.is_empty() {
        return Err((
            StatusCode::BAD_REQUEST,
            Json(ApiError::new("Message is required.")),
        ));
    }
    if message.len() > 5000 {
        return Err((
            StatusCode::BAD_REQUEST,
            Json(ApiError::new("Message is too long.")),
        ));
    }

    let api_key = required_env("RESEND_API_KEY")?;
    let receiver = required_env("CONTACT_RECEIVER_EMAIL")?;
    let sender = required_env("CONTACT_SENDER_EMAIL")?;

    let client = reqwest::Client::new();
    let email_payload = serde_json::json!({
        "from": format!("Portfolio Contact Form <{sender}>"),
        "to": [receiver],
        "reply_to": email,
        "subject": format!("New portfolio message from {name}"),
        "text": format!("Name: {name}\nEmail: {email}\n\nMessage:\n{message}"),
    });

    let res = client
        .post("https://api.resend.com/emails")
        .bearer_auth(&api_key)
        .json(&email_payload)
        .send()
        .await
        .map_err(|e| {
            // Full detail goes to the server's own log only — never to the
            // HTTP response a browser can inspect.
            eprintln!("[contact] network error calling Resend: {e}");
            (
                StatusCode::BAD_GATEWAY,
                Json(ApiError::new(
                    "Could not reach the email provider. Please try again later.",
                )),
            )
        })?;

    if !res.status().is_success() {
        let detail = res.text().await.unwrap_or_default();
        eprintln!("[contact] Resend rejected the request: {detail}");
        return Err((
            StatusCode::BAD_GATEWAY,
            Json(ApiError::new(
                "The email provider rejected the message. Please try again later.",
            )),
        ));
    }

    Ok((
        StatusCode::OK,
        Json(ApiResponse::success(ContactResponseData {
            delivered: true,
        })),
    ))
}

// Treats an unset OR blank/whitespace-only env var as "not configured" — a
// bare `KEY=` line in .env sets the variable to an empty string, which
// `std::env::var` alone would treat as present.
fn required_env(key: &str) -> Result<String, (StatusCode, Json<ApiError>)> {
    let value = std::env::var(key).ok().filter(|v| !v.trim().is_empty());

    // Presence only — never print the actual secret value.
    println!(
        "[contact] env {key}: {}",
        if value.is_some() {
            "present"
        } else {
            "MISSING"
        }
    );

    value.ok_or_else(|| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(ApiError::new(format!(
                "Email delivery is not configured on the server (missing {key})."
            ))),
        )
    })
}

fn is_valid_email(email: &str) -> bool {
    let parts: Vec<&str> = email.splitn(2, '@').collect();
    if parts.len() != 2 {
        return false;
    }
    let (local, domain) = (parts[0], parts[1]);
    !local.is_empty()
        && !local.contains(' ')
        && domain.contains('.')
        && !domain.starts_with('.')
        && !domain.ends_with('.')
        && !domain.contains(' ')
}
