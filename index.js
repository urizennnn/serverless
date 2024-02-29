const serverless = require("serverless-http");
const express = require("express");
const app = express();

const { neon ,neonConfig} = require("@neondatabase/serverless");

async function clientDB() {
  neonConfig.fetchConnectionCache=true
  const sql = neon(process.env.DATABASE_URL)
  return sql
}


app.get("/", async (req, res, next) => {
  const sql = await clientDB()
  const [results] = await sql`select now()`
  return res.status(200).json({
    message: "Hello from root!",
    results:results.now
  });
});

app.get("/path", (req, res, next) => {
  return res.status(200).json({
    message: "hello from path"
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});


module.exports.handler = serverless(app);