# Sequelize Sandbox

## Set up

1. Clone this repo
    ```bash
    git clone git@github.com:nealwp/sequelize-sandbox.git
    ```

1. Run install
    ```bash
    npm i
    ```

1. Start the local db (requires Docker)
    ```bash
    npm run db:start    # data will persist in volume 'sequelize-pgdata'
    ```

1. Run the dev server
    ```bash
    npm run dev
    ```

1. When you're finished/want to stop the database, run
    ```bash
    npm run db:stop
    ```

- You can import the Postman collection to view available endpoints.
- You can also connect to the database on `localhost:5432` via psql or pgadmin, using the following credentials:
    - User: `postgres`
    - Password: `postgres`
    - Database Name: `scratch`