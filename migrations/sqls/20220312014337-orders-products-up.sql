/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS order_products (
    id serial primary key not null,
    product_id integer,
    order_id integer,
    quantity integer DEFAULT 1,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE
);