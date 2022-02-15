const postgres = require("postgres");

if (process.env.NODE_ENV !== "production") {
  Object.assign(process.env, require("./db.json"));
}

const sql = postgres({
  host: process.env.HOST,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  max: 3
});

async function fetchPhone(phone) {
  try {
    const query =
      await sql`SELECT random, stamp FROM items WHERE phone = ${phone}`;
    if (query.count === 0) {
      return null;
    }
    return query[0];
  } catch (error) {
    throw error;
  }
}

async function addPhone(phone, random, index, item) {
  try {
    const stamp = Math.floor(Date.now() / 1000);
    const query =
      await sql`INSERT INTO items (phone, random, index, item, stamp) VALUES (${phone}, ${random}, ${index}, ${item}, ${stamp})`;
    if (query.count !== 1) {
      throw new Error("Record failed to be inserted!");
    }
    return stamp;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  fetchPhone,
  addPhone
};
