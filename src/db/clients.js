const secrets = require("../lib/secrets");

const { neon } = require("@neondatabase/serverless");

async function getDbClient() {
  const dbUrl = await secrets.getDatabaseUrl();

  const sql = neon(dbUrl);
  return sql;
}

module.exports.getDbClient = getDbClient;
