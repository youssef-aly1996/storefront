/* Replace with your SQL commands */

CREATE TYPE mood AS ENUM ('active', 'complete');

CREATE TABLE IF NOT EXISTS orders(
    id SERIAL PRIMARY KEY,
    user_id BIGINT,
    total_price real NOT NULL,
    status mood NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE 
);