-- Your SQL goes here
CREATE TABLE users_actix (
  id SERIAL NOT NULL PRIMARY KEY,
  first_name VARCHAR(140) NOT NULL,
  last_name VARCHAR(140) NOT NULL,
  email VARCHAR(140) NOT NULL,
  user_name VARCHAR(140) NOT NULL,
  created_at TIMESTAMP NOT NULL
)