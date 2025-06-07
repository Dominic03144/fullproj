import "dotenv/config"
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema";

const migrationClient = new Client({
    connectionString: process.env.DATABASE_URL,
});

async function migration(){
     await migrationClient.connect();
     const nodeDb = drizzle(migrationClient, { schema });
     console.log("==================Migration Start==================");
     await migrate(nodeDb, { migrationsFolder: __dirname + "/migrations" });
     await migrationClient.end();
     console.log("==================Migration Done==================");
     process.exit(0);    
}

migration().catch((e) => {
    console.log(e)
    process.exit(0)
})