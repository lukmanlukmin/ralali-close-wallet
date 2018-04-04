--
-- MySql database dump
--

CREATE TABLE oauth_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    access_token text NOT NULL,
    access_token_expires_on timestamp NOT NULL,
    client_id text NOT NULL,
    refresh_token text NOT NULL,
    refresh_token_expires_on timestamp NOT NULL,
    user_id INT NOT NULL
);


CREATE TABLE oauth_clients (
    client_id text NOT NULL,
    client_secret text NOT NULL,
    redirect_uri text NOT NULL
);


CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username text NOT NULL,
    password text NOT NULL
);

ALTER TABLE users ADD UNIQUE (username);