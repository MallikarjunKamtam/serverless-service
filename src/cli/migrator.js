const { drizzle } = require("drizzle-orm/neon-serverless");
const schema = require("../db/schema");
const { migrate } = require("drizzle-orm/postgres-js/migrator");
require("dotenv").config();
const { getDatabaseUrl } = require("../lib/secrets");
const { Pool, neonConfig } = require("@neondatabase/serverless");
const ws = require("ws");

async function performMigration() {
  const dbUrl = await getDatabaseUrl();
  if (!dbUrl) {
    return;
  }

  neonConfig.webSocketConstructor = ws;

  const pool = new Pool({ connectionString: dbUrl });

  pool.on("error", (err) => {
    console.log(err);
  });

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const db = await drizzle(client, { schema });

    await migrate(db, { migrationsFolder: "src/migrations" });

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
  } finally {
    client.release();
  }

  await pool.end();
}

if (require.main === module) {
  console.log(process.env.AWS_ACCESS_KEY_ID);
  console.log("running migrations 😊");

  performMigration()
    .then((val) => {
      console.log("Migrations done.... 😁👍");
      process.exit(0);
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
}
