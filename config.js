const dotenv = require("dotenv");

dotenv.config();

const { PRODUCTION_PORT } = process.env;

const PORT = process.env.NODE_ENV === "production" ? PRODUCTION_PORT : 3000;

module.exports = {
  PORT,
};
