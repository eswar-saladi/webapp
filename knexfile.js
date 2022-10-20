require("dotenv").config();

const DB_NAME = process.env.DB_NAME || "webapp";
const DB_USER = process.env.DB_USER || "postgres";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 5432;
const DB_PASSWORD = process.env.DB_PASSWORD || "postgres";

module.exports = {
  development: {
    client: "pg",
    connection: {
      database: DB_NAME,
      user: DB_USER,
      host: DB_HOST,
      port: DB_PORT,
      password: DB_PASSWORD,
    },
    migrations: {
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      directory: __dirname + "/db/seeds",
    },
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      directory: __dirname + "/db/seeds/production",
    },
  },
};
