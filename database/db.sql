CREATE DATABASE db_links;

USE db_links;

-- USERS TABLE
CREATE TABLE users (
    id  int(11) not null,
    username varchar(16) not null,
    password varchar(60) not null,
    fullname varchar(100) not null
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id int(11) not null AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;

-- LINKS TABLE
CREATE TABLE links(
    id int(11) not null,
    title varchar(150) not null,
    url varchar(255) not null,
    description text,
    user_id int(11),
    created_at timestamp not null default current_timestamp,
    constraint fk_user foreign key (user_id) references users(id)
);

ALTER TABLE links
    ADD PRIMARY KEY (id)

ALTER TABLE links
    MODIFY id int(11) not null AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE links;
