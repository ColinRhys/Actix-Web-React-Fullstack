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
    users_actix,
);
