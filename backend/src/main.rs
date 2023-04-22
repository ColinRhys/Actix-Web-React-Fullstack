#[macro_use]
extern crate diesel;

use std::alloc::handle_alloc_error;

use actix_cors::Cors;
use actix_web::{http, middleware, web, App, HttpServer, http::header};
use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};

mod handlers;
mod models;
mod schema;
mod claims;
mod types;

// We define a custom type for connection pool to use later.
pub type DbPool = r2d2::Pool<ConnectionManager<PgConnection>>;

#[actix_web::main] // or #[tokio::main]
async fn main() -> std::io::Result<()> {
    // Loading .env into environment variable.
    dotenv::dotenv().ok();

    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    // set up database connection pool
    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL");
    let manager = ConnectionManager::<PgConnection>::new(database_url);
    let pool: DbPool = r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool.");

    HttpServer::new(move || {
        // let cors = Cors::default()
        //     .allowed_origin("http://localhost:8080")
        //     .allowed_methods(vec!["GET", "POST"])
        //     .allowed_headers(vec![header::AUTHORIZATION, header::ACCEPT])
        //     .allowed_header(http::header::CONTENT_TYPE)
        //     .supports_credentials()
        //     .max_age(3600);
        let cors = Cors::permissive();


        App::new()
            .app_data(web::Data::new(pool.clone()))
            .wrap(cors)
            .wrap(middleware::Logger::default())
            .route("/", web::get().to(|| async { "Colin's Actix REST API" }))
            .service(handlers::index)
            .service(handlers::create)
            .service(handlers::show)
            .service(handlers::update)
            .service(handlers::destroy)
            .service(handlers::update_published)
            .service(handlers::get_unpublished_users)
            .service(handlers::check_user_name)
            .service(handlers::find_user_by_user_name)
            .service(handlers::find_user_by_email_and_sub)
    })
    .bind(("0.0.0.0", 8081))?
    .run()
    .await
}
