This section contains all the packages used in this project and how to install them.

- yarn or npm install

Set up Database

We shall create the dev and test databases.

- databse works on host and port 0.0.0.0:5432
- from .env file you can edit any databse configs that fits your system
- use docker compose file to create the database container by command "docker-compose up --build"
- get postgres container id by command "docker ps" then run command "docker exec -it + container_id"
- to start wrting sql against the database if you want
- \c storefront
- GRANT ALL PRIVILEGES ON DATABASE storefront TO {user};
- Grant for test database
- \c storefront_test
- GRANT ALL PRIVILEGES ON DATABASE storefront_test TO {user};

Migrate Database
Navigate to the root directory and run the command below to migrate the database

- use npm run migrate-up

starting app

- use npm run dev-server in your terminal
- After start up, the server will start on port 3000 and the database on port 5432

API Endpoints

look at REQUIREMENTS.md

Testing

Run test with

- ENV=test npm run test
