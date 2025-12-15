import dotenv from "dotenv";
dotenv.config();

import app, { AppDataSource } from "./app";

// process.on('uncaughtException', ...); // Remove debug handlers later or keep them for safety
// process.on('unhandledRejection', ...);

const PORT = process.env.PORT || 3537;

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connected successfully");

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
    server.on('error', (e) => {
      console.error("❌ Server failed to start:", e);
    });
  })
  .catch((error) => {
    console.error("❌ Error during Data Source initialization:", error);
    process.exit(1);
  });
