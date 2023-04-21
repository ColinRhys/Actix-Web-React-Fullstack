use std::fmt::write;

use super::DbPool;
use std::collections::HashSet;

use actix_web::{
  delete,
  get,
  post,
  put,
  web::{self, Data}, Error, HttpResponse, dev::Payload};
use actix_web_httpauth::extractors::bearer::BearerAuth;
use diesel::{prelude::*, r2d2::Pool};
use uuid::Uuid;
use dotenv::dotenv;
use std::env;

use crate::{models::{
  NewUser,
  User,
  UserPayLoad,
  UserUpdatePayLoad,
  UserNamePayload,
  UserEmailPayload,
  FindUserPayload},
  schema::users_actix::published_profile, claims};

use crate::{claims::Claims, types::ErrorMessage};

type DbError = Box<dyn std::error::Error + Send + Sync>;

#[post("/createuser")]
async fn create(
  pool: web::Data<DbPool>,
  claims: Claims,
  payload: web::Json<UserPayLoad>,
) -> Result<HttpResponse, Error> {

println!("The permissions on the claims OBJ is - {:?}", claims.permissions);
if claims.validate_permissions(&HashSet::from(["read:admin-messages".to_string()])) {
  let user = web::block(move || {
  let conn = pool.get()?;
  add_a_user(&payload.first_name, &payload.last_name, &payload.email, &payload.user_name, &payload.user_auth0_sub, &conn)
  })
  .await?
  .map_err(actix_web::error::ErrorInternalServerError)?;

  Ok(HttpResponse::Ok().json(user))
} else {
  Ok(HttpResponse::Forbidden().json(ErrorMessage {
    error: Some("insufficient_permissions".to_string()),
    error_description: Some("Please create an account to create a profile".to_string()),
    message: "Permission denied".to_string(),
  }))
}

}

#[get("/findUserByUserName/{userName}")]
async fn check_user_name(
  path: web::Path<String>,
  pool: web::Data<DbPool>, 
  claims: Claims
) -> Result<HttpResponse, Error> {
if claims.validate_permissions(&HashSet::from(["read:admin-messages".to_string()])){
  println!("The permissions on the claims OBJ in check_user_name is - {:?}", claims.permissions);
  let user_name = path.into_inner();
  let user = web::block(move || {
    let conn = pool.get()?;
    find_by_user_name(&user_name, &conn)
  })
  .await?
  .map(|user| HttpResponse::Ok().json(user))
  .map_err(actix_web::error::ErrorInternalServerError)?;
  Ok(user)
} else {
  Ok(HttpResponse::Forbidden().json(ErrorMessage {
    error: Some("insufficient_permissions".to_string()),
    error_description: Some("Please create an account to create a profile".to_string()),
    message: "Permission denied".to_string(),
  }))
}
}

#[get("/findUserByEmailAndSub/{email}/{auth_sub}")]
async fn find_user_by_email_and_sub(
  path: web::Path<FindUserPayload>,
  pool: web::Data<DbPool>
) -> Result<HttpResponse, Error> {
  println!("Email being called find_user_by_email_and_sub {}", &path.email.to_string());
  println!("Auth being called find_user_by_email_and_sub {}", &path.auth_sub.to_string());
  let user = web::block(move || {
    let conn = pool.get()?;
      find_user_by_email_and_auth_sub(&path.email, &path.auth_sub, &conn)
  })
  .await?
  .map(|user| HttpResponse::Ok().json(user))
  .map_err(actix_web::error::ErrorInternalServerError)?;
  Ok(user)
}

#[get("/findDetailedUser/{user_name}")]
async fn find_user_by_user_name(path: web::Path<UserNamePayload>, pool: web::Data<DbPool>) -> Result<HttpResponse, Error> {
  let user = web::block(move || {
    let conn = pool.get()?;
    find_user_by_user_name_return_user(&path.user_name, &conn)
  })
  .await?
  .map(|user| HttpResponse::Ok().json(user))
  .map_err(actix_web::error::ErrorInternalServerError)?;
  Ok(user)
}

fn add_a_user(_first_name: &str,
                _last_name: &str,
                _email: &str,
                _user_name: &str,
                _user_auth0_sub: &str,
                conn: &PgConnection) -> Result<User, DbError> {
  use crate::schema::users_actix::dsl::*;

  let new_user = NewUser {
    first_name: _first_name,
    last_name: _last_name,
    email: _email,
    user_name: _user_name,
    created_at: chrono::Local::now().naive_local(),
    published_profile: false,
    user_uuid: Uuid::new_v4().to_string(),
    user_auth0_sub: _user_auth0_sub,
  };
  let res = diesel::insert_into(users_actix)
    .values(&new_user)
    .get_result(conn)?;
  Ok(res)
}

fn find_all(conn: &PgConnection) -> Result<Vec<User>, DbError> {
  use crate::schema::users_actix::dsl::*;

  let items = users_actix.load::<User>(conn)?;
  Ok(items)
}

fn find_by_id(user_id: i32, conn: &PgConnection) -> Result<Option<User>, DbError> {
  use crate::schema::users_actix::dsl::*;

  let user = users_actix
    .filter(id.eq(user_id)) 
    .first::<User>(conn)
    .optional()?;

  Ok(user)
}

fn find_user_by_email_and_auth_sub(search_email: &str, search_auth_sub: &str, conn: &PgConnection) -> Result<Option<User>, DbError> {
  use crate::schema::users_actix::dsl::*;
  println!("Email being called find_user_by_email_and_sub {}", search_email.to_string());
  println!("Auth being called find_user_by_email_and_sub {}", search_auth_sub.to_string());
  let user = users_actix
    .filter(email.eq(search_email)).filter(user_auth0_sub.eq(search_auth_sub))
    .first::<User>(conn)
    .optional()?;

  Ok(user)
}

fn find_by_user_name(search_user_name: &str, conn: &PgConnection) -> Result<String, DbError> {
  use crate::schema::users_actix::dsl::*;

  let user = users_actix
    .filter(user_name.eq(search_user_name))
    .first::<User>(conn)
    .optional()?;

  if user.is_none() {
    Ok("UserName is free".to_string())
  } else {
    Ok("UserName taken".to_string())
  }
}

fn find_by_email(search_email: &str, conn: &PgConnection) -> Result<String, DbError> {
  use crate::schema::users_actix::dsl::*;

  let user = users_actix
    .filter(email.eq(search_email))
    .first::<User>(conn)
    .optional()?;

  if user.is_none() {
    Ok("Email is free".to_string())
  } else {
    Ok("Email taken".to_string())
  }
}

fn find_user_by_user_name_return_user(search_user_name: &str, conn: &PgConnection) -> Result<Option<User>, DbError> {
  use crate::schema::users_actix::dsl::*;

  let user = users_actix
  .filter(user_name.eq(search_user_name))
  .first::<User>(conn)
  .optional()?;

  Ok(user)
}

fn find_not_published(conn: &PgConnection) -> Result<Vec<User>, DbError> {
    use crate::schema::users_actix::dsl::*;

  let items = users_actix
    .filter(published_profile.eq(false))
    .load::<User>(conn)?;
  Ok(items)
}

fn set_published(user_id: i32, conn: &PgConnection) -> Result<Option<User>, DbError> {
  use crate::schema::users_actix::dsl::*;
  
  let user = diesel::update(users_actix.find(user_id))
    .set((
        published_profile.eq(true),
        ))
    .get_result::<User>(conn)?;
  Ok(Some(user))
}

fn update_user(user_auth0_sub_search: String, _first_name: String, _last_name: String,
 _email: String, _user_name: String, conn: &PgConnection) -> Result<User, DbError> {
  use crate::schema::users_actix::dsl::*;

    let user_to_update = users_actix
    .filter(user_auth0_sub.eq(user_auth0_sub_search)) 
    .first::<User>(conn)
    .optional()?;

    let user = diesel::update(users_actix.find(&user_to_update.unwrap().id))
    .set((
        first_name.eq(_first_name),
        last_name.eq(_last_name),
        email.eq(_email),
        user_name.eq(_user_name),
        ))
    .get_result::<User>(conn)?;
  Ok(user)   

}

fn delete_user(user_id: i32, conn: &PgConnection) -> Result<usize, DbError> {
  use crate::schema::users_actix::dsl::*;

  let count = diesel::delete(users_actix.find(user_id)).execute(conn)?;
  Ok(count)
}

#[get("/users")]
async fn index(pool: web::Data<DbPool>) -> Result<HttpResponse, Error> {
  let users = web::block(move || {
    let conn = pool.get()?;
    find_all(&conn)
  })
  .await?
  .map_err(actix_web::error::ErrorInternalServerError)?;

  Ok(HttpResponse::Ok().json(users))
}

#[get("/users/{id}")]
async fn show(id: web::Path<i32>, pool: web::Data<DbPool>) -> Result<HttpResponse, Error> {
  let user = web::block(move || {
    let conn = pool.get()?;
    find_by_id(id.into_inner(), &conn)
  })
  .await?
  .map_err(actix_web::error::ErrorInternalServerError)?;

  Ok(HttpResponse::Ok().json(user))
}

#[put("/user/{user_auth0_sub}")]
async fn update(
  user_auth0_sub: web::Path<String>,
  payload: web::Json<UserUpdatePayLoad>,
  pool: web::Data<DbPool>,
  claims: Claims,
) -> Result<HttpResponse, Error> {
  
  if claims.validate_permissions(&HashSet::from(["read:admin-messages".to_string()])) {
    let user = web::block(move || {
      let conn = pool.get()?;
      update_user(user_auth0_sub.into_inner(), payload.first_name.clone(), payload.last_name.clone(),
      payload.email.clone(), payload.user_name.clone(), &conn)
    })
    .await?
    .map_err(actix_web::error::ErrorInternalServerError)?;

    Ok(HttpResponse::Ok().json(user))
  } else {
    Ok(HttpResponse::Forbidden().json(ErrorMessage {
      error: Some("insufficient_permissions".to_string()),
      error_description: Some("Please create an account to create a profile".to_string()),
      message: "Permission denied".to_string(),
    }))
  }
}

#[put("/users/{id}/setPublic")]
async fn update_published(
  id: web::Path<i32>,
  pool: web::Data<DbPool>,
) -> Result<HttpResponse, Error> {
  let user = web::block(move || {
    let conn = pool.get()?;
    set_published(id.into_inner(), &conn)
  })
  .await?
  .map_err(actix_web::error::ErrorInternalServerError)?;

  Ok(HttpResponse::Ok().json(user))
}

#[get("/notPublicUsers")]
async fn get_unpublished_users(pool: web::Data<DbPool>) -> Result<HttpResponse, Error> { 
  let users = web::block(move || {
    let conn = pool.get()?;
    find_not_published(&conn)
  })
  .await?
  .map_err(actix_web::error::ErrorInternalServerError)?;

  Ok(HttpResponse::Ok().json(users))
}

#[delete("/users/{id}")]
async fn destroy(id: web::Path<i32>, pool: web::Data<DbPool>) -> Result<HttpResponse, Error> {
  let result = web::block(move || {
    let conn = pool.get()?;
    delete_user(id.into_inner(), &conn)
  })
  .await?
  .map(|user| HttpResponse::Ok().json(user))
  .map_err(actix_web::error::ErrorInternalServerError)?;

  Ok(result)
}