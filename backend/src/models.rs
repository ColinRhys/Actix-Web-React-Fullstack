use serde::{Deserialize, Serialize};

use crate::schema::users_actix;

#[derive(Debug, Serialize, Deserialize, Queryable)]
pub struct User {
  pub id: i32,
  pub first_name: String,
  pub last_name: String,
  pub email: String,
  pub user_name: String,
  pub created_at: chrono::NaiveDateTime,
  pub published_profile: bool,
  pub user_uuid: String,
  pub user_auth0_sub: String,
}

#[derive(Debug, Insertable)]
#[table_name = "users_actix"]
  pub struct NewUser<'a> {
  pub first_name: &'a str,
  pub last_name: &'a str,
  pub email: &'a str,
  pub user_name: &'a str,
  pub created_at: chrono::NaiveDateTime,
  pub published_profile: bool,
  pub user_uuid: String,
  pub user_auth0_sub: &'a str,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UserPayLoad {
    pub first_name: String,
    pub last_name: String,
    pub email: String,
    pub user_name: String,
    pub user_auth0_sub: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UserUpdatePayLoad {
    pub first_name: String,
    pub last_name: String,
    pub email: String,
    pub user_name: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UserEmailUsernamePayload {
  pub user_name: String,
  pub email: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UserRegistrationError {
  pub error_message: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UserEmailPayload {
  pub email: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UserNamePayload {
  pub user_name: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FindUserPayload {
  pub email: String,
  pub auth_sub: String,
}