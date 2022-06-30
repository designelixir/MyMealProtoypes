## Description

This is the Meal Creator application for MyMeal.

Users, such as restuarants and Kayla can build dynamc menus here and then view them from a dedicated public link.


# Development setup

* Install dependencies

    npm install

* Setup local DB

Create a postgres DB named `mymeal` locally

Seed the database with `npm run seed`

Create a `.env` file and add a `JWT=randomstringoftext` to enable JWT authentication locally


### Database Migrations

Install Sequelize CLI:

- `npm install -g sequelize-cli`

Set up configuration files via:

- `cd server`
- `sequelize init`

This will create three folders.

- config: contains a json file that will store the connection details for development, staging, and production environments.
  "production": {
  "username": "un",
  "password": "pw",
  "database": "db",
  "host": "h",
  "port": "p",
  "dialect": "postgres",
  "dialectOptions": {
  "ssl": {
  "require": true,
  "rejectUnauthorized": false
  }
  }
  }
- migrations: contains any migration file(s) created via the command line
- models: NOT REQUIRED. DELETE.

To create a new migration run the following command:

- `npx sequelize-cli migration:create --name CUSTOM_MIGRATION_NAME`

This will create a .js file in the migrations folder where you can define up and down methods to adjust the database state.
https://sequelize.org/docs/v6/other-topics/migrations/

To apply a migration run the following command:

- `npx sequelize-cli db:migrate` (defaults to --env development)

To undo a migration run the following command:

- `npx sequelize-cli db:migrate:undo` (reverts the most recent migration)
