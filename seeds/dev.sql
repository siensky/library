INSERT INTO users (auth0_sub, email, username, is_admin)
VALUES ('dev|admin', 'admin@local.dev', 'admin', true)
ON CONFLICT (auth0_sub) DO UPDATE
SET is_admin = EXCLUDED.is_admin,
    email = EXCLUDED.email,
    username = EXCLUDED.username;