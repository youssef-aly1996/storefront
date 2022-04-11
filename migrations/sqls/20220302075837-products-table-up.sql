/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS products(
    id serial primary key not null,
    name varchar(100) not null,
    price real not null,
    category varchar(100)
);