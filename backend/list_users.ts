import { AppDataSource } from "./src/app";
import UserDTO from "./src/entities/User Models/User.shema";

async function listUsers() {
    try {
        await AppDataSource.initialize();
        console.log("Database connected");
        const users = await AppDataSource.getRepository(UserDTO).find();
        console.log("Users found:", users);
        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

listUsers();
