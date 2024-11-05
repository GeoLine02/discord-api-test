require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER || "discord",
    password: process.env.DB_PASSWORD || "oRakVRh5pnRc74qHOYxelt6aXNutZ6QG",
    database: process.env.DB_NAME || "discord_b70e",
    host:
      process.env.DB_HOST ||
      "dpg-csl8jvg8fa8c73bsns4g-a.oregon-postgres.render.com",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  test: {
    username: process.env.DB_USER || "discord",
    password: process.env.DB_PASSWORD || "oRakVRh5pnRc74qHOYxelt6aXNutZ6QG",
    database: process.env.DB_NAME || "discord_b70e",
    host:
      process.env.DB_HOST ||
      "dpg-csl8jvg8fa8c73bsns4g-a.oregon-postgres.render.com",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  production: {
    use_env_variable: "DATABASE_URL", // Prefer using the DATABASE_URL directly in production
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
