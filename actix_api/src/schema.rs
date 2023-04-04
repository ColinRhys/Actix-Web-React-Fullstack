// @generated automatically by Diesel CLI.

diesel::table! {
    blog_posts (id) {
        id -> Int4,
        title -> Varchar,
        body -> Text,
        published -> Bool,
    }
}

diesel::table! {
    posts (id) {
        id -> Int4,
        title -> Varchar,
        body -> Text,
        published -> Bool,
    }
}

diesel::table! {
    users (id) {
        id -> Int4,
        first_name -> Varchar,
        last_name -> Varchar,
        user_name -> Varchar,
        email_address -> Varchar,
    }
}

diesel::table! {
    users_actix (id) {
        id -> Int4,
        first_name -> Varchar,
        last_name -> Varchar,
        email -> Varchar,
        user_name -> Varchar,
        created_at -> Timestamp,
        published_profile -> Bool,
        user_uuid -> Varchar,
        user_auth0_sub -> Varchar,
    }
}

diesel::allow_tables_to_appear_in_same_query!(
    blog_posts,
    posts,
    users,
    users_actix,
);
