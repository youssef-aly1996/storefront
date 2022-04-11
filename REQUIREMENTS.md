API Endpoints

Users

- Index [token required]: 'users/list' [GET] (token)
- Show [token required]: 'users/get/:id' [GET] (token)
- Create (args: User)[token required]: 'users/signup' [POST] (token)

Products

- Index: 'products/list' [GET]
- Show: 'products/get/:id' [GET]
- Create (args: Product)[token required]: 'products/create' [POST] (token)

Orders

- showUserOrders [Current Order by user] : 'orders/:id' [GET]
- Create : 'orders/create' [POST]
- addProduct : 'orders/' [POST]

Data Shapes
Product

- id
- name
- price
- [OPTIONAL] category

Table: Product (id:serial[primary key], name:varchar(100)[not null], price:real[not null], category:varchar(100))

User

- id
- firstName
- lastName
- password

Table: User (id:serial[primary key], firstName:varchar(100)[not null], lastName:varchar(100)[not null], password:varchar(255)[not null])

Orders

- id
- user_id
- status of order (active or complete)

Table: Orders (id:serial[primary key], user_id: bigint[not null], status:varchar(100)[not null])

Order_Products

- id
- id of each product in the order
- order_id
- quantity of each product in the order

Table: Order_Products (id:serial[primary key], product_id:integer[not null], product_id:integer[not null], quantity:integer)
