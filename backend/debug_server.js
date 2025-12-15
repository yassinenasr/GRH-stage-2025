
try {
  console.log("Starting debug script...");
  const appModule = require('./src/app');
  console.log("Imported app module");
  const { AppDataSource } = appModule;
  console.log("Got AppDataSource");
  
  AppDataSource.initialize()
    .then(() => {
      console.log("Database initialized");
      process.exit(0);
    })
    .catch(err => {
      console.error("Database init failed:", err);
      process.exit(1);
    });
} catch (err) {
  console.error("Synchronous error:", err);
  process.exit(1);
}
