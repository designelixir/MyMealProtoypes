## Description

This is the Meal Creator application for MyMeal - working prototypes.

Users, such as restuarants and Kayla can build dynamc menus here and then view them from a dedicated public link.

# Development setup
 ` npm install `
 ` brew services start postgresql ` or `brew services restart postgresql@14`
 ` psql postgres `

This sets up a blank database. 

`CREATE DATABASE mymeal`
`\c mymeal `
Confirm the database exists. 

`\q mymeal`

`npm run seed`
`npm install -g sequelize-cli`

`cd server`
`sequelize init --force`

Create an .env file with the following:
`JWT = bigbigtrucks
FAST_REFRESH = true`

`npm run build:dev & npm run start-server`

Problems? 
`killall -9 node` and restart.

