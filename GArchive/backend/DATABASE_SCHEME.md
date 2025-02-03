CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    nickname VARCHAR(20) NOT NULL,
    bio VARCHAR(101),
    PRIMARY KEY (user_id)
) AUTO_INCREMENT = 10000;

CREATE TABLE user_salt (
    username VARCHAR(20) PRIMARY KEY,
    salt VARCHAR(255) NOT NULL,
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
);

CREATE TABLE tags (
    tag_id INT NOT NULL AUTO_INCREMENT,
    tag VARCHAR(10) NOT NULL,
    PRIMARY KEY(tag_id)
);

CREATE TABLE user_tags (
    user_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (user_id, tag_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE
);
