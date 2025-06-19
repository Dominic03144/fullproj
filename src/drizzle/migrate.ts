import "dotenv/config";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db, client } from "./db"; // Fixed import

async function migration() {
    console.log("==================Migration Start==================");
    await migrate(db, { migrationsFolder: __dirname + "/migrations" });
    await client.end();
    console.log("==================Migration Done==================");
    process.exit(0);    
}

migration().catch((e) => {
    console.error(e);
    process.exit(1); // Use exit code 1 on error
});
