const secrets = require("../lib/secrets");
const { drizzle } = require("drizzle-orm/neon-http");
const { neon } = require("@neondatabase/serverless");

async function getDbClient() {
  const dbUrl = await secrets.getDatabaseUrl();

  const sql = neon(dbUrl);
  return sql;
}

async function getDrizzleDbClient() {
  const sql = await getDbClient();
  return drizzle(sql);
}

module.exports.getDbClient = getDbClient;
module.exports.getDrizzleDbClient = getDrizzleDbClient;
