
import app, { AppDataSource } from "./src/app";

console.log("Starting debug script...");

async function start() {
    try {
        console.log("Initializing database...");
        await AppDataSource.initialize();
        console.log("Database initialized successfully");

        console.log("App type:", typeof app);
        console.log("App keys:", Object.keys(app));
        console.log("App listen type:", typeof app.listen);

        if (typeof app.listen === 'function') {
            console.log("Attempting to listen on 3537...");
            const server = app.listen(3537, () => {
                console.log("Server started on 3537");
                server.close();
                process.exit(0);
            });
            server.on('error', (e) => {
                console.error("Server error:", e);
                process.exit(1);
            });
        } else {
            console.error("app.listen is not a function!");
            process.exit(1);
        }

    } catch (error) {
        console.error("❌ Database init failed:", error);
        process.exit(1);
    }
}

start();
