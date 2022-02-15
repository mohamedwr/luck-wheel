# Luck Wheel (Node.js + Postgres API)

an alternative API built with Node.js and Postgres for the authentication system

#

## Documentation

- run `npm start` to start a local server on `localhost:8000`
- run `npm run dev` to start the development server on `localhost:8000`

- `src`: javascript API files

- `src/db.sql`: items SQL table schema
- `src/data.example.json`: data JSON file example to follow

- The API must be initialized with proper environment variables in production:

  - `PORT`: port to listen to
  - `HOST`: database instance host
  - `USERNAME`: database instance user
  - `PASSWORD`: database instance password
  - `DATABASE`: database name
  - `DATA`: JSON data, check `src/data.example.json`

- The endpoints are:
  - `post /auth`: the same as the PHP API
  - `all *`: returns void response, can be used to check for the API health

**Notes:**

- `src/db.json` is used to initialize the database instance environment variables when in development
- `src/data.json` is used to intialize data environment variable when in development

#

## Technologies

- Node.js
- [Postgres](https://www.npmjs.com/package/postgres)

#

## LICENSE

This project is under MIT license.  
Consider checking `LICENSE` file

#

### Written with :heart: by Mohamed Waleed
