ALTER TABLE users_actix
ALTER COLUMN published_profile BOOLEAN not null;
ALTER TABLE users_actix
ALTER COLUMN user_uuid VARCHAR not null;
ALTER TABLE users_actix
ALTER COLUMN user_auth0_sub VARCHAR not null;