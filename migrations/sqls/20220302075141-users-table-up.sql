/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS users(
    id serial primary key not null,
    first_name varchar(100) not null,
    last_name varchar(100) not null,
    password varchar(255) not null
);