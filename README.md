# Sequelize Sandbox

This repo is an example of using Sequelize, TypeScript, and Express. Each directory has its own README.md file to serve as documentation.

The goal here is to provide simple examples for using Sequelize, as well as establishing useful patterns to follow in similar projects.

Following the setup will give you a running Express API with a persistent PostgreSQL database via Docker. From there, you can experiment with creating new models, controller methods, routes, etc. 

Feel free to fork this repo as a starting point for a project of your own. 

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
    npm run db:start    # data will persist in Docker volume 'sequelize-pgdata'
    ```

1. Run the dev server
    ```bash
    npm run dev
    ```

1. When you're finished/want to stop the database, run
    ```bash
    npm run db:stop
    ```

- You can import the Postman collection to view and use available endpoints.
- You can also connect to the database on `localhost:5432` via psql or pgAdmin, using the following credentials:
    - User: `postgres`
    - Password: `postgres`
    - Database Name: `scratch`