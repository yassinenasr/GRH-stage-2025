import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { DataSource } from "typeorm";
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import UserDTO from "./entities/User Models/User.shema";
import SubjectDTO from "./entities/Subject models/Subject.shema";
import TermDTO from "./entities/Term Models/Term.shema";
import FieldDTO from "./entities/Field Models/Field.shema";
import User from "./entities/User Models/User.shema";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    exposedHeaders: ["Authorization"],
  })
);

// Debug middleware
app.use((req, res, next) => {
  console.log(`[DEBUG] Incoming request: ${req.method} ${req.path}`);
  next();
});

// ========== ROUTES PUBLIQUES (OBLIGATOIRE : AVANT LE MIDDLEWARE AUTH) ==========
console.log("[DEBUG] Registering /login route");
app.post("/login", async (req, res) => {
  const { email, mot_de_passe } = req.body;
  console.log(`[DEBUG] Login attempt for email: ${email}`);

  try {
    const user = await AppDataSource.getRepository(UserDTO).findOneBy({ email });
    console.log("DB returned user:", user); // For debugging

    if (!user)
      return res.status(404).json({ result: { message: "user not found", status: 404 } });

    const isPasswordValid = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!isPasswordValid)
      return res.status(401).json({ result: { message: "Invalid password", status: 401 } });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({ result: { message: "Login successful", status: 200, accessToken } });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ result: { message: "Error during login: " + error, status: 500 } });
  }
});




app.post("/addUser", async (req: Request, res: Response) => {
  try {
    await AppDataSource.initialize();

    const data = req.body;
    const hashedPassword = await bcrypt.hash(data.mot_de_passe, 10);

    const user = AppDataSource.getRepository(UserDTO).create({
      ...data,
      mot_de_passe: hashedPassword,
    });

    await AppDataSource.getRepository(UserDTO).save(user);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding user" });
  }
});
//get user by cin
app.get("/user/:cin", async (req: Request, res: Response) => {
  try {
    const cin = req.params.cin;
    const user = await AppDataSource.getRepository(UserDTO).findOneBy({ cin });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving user" });

  }});
// Tu peux ajouter d'autres routes publiques ici : /refresh, /logout, etc.

// ========== MIDDLEWARE D'AUTHENTIFICATION (maintenant que /login existe) ==========
app.use((req: Request, res: Response, next: NextFunction) => {
  const publicRoutes = ["/login", "/refresh", "/", "/addUser"];
  if (publicRoutes.includes(req.path)) {
    return next();
  }

  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token manquant" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token invalide" });
    }
    (req as any).user = decoded;
    next();
  });
});

// ========== TES AUTRES ROUTES PROTÉGÉES (décommente-les plus tard) ==========
// app.get("/employees", ...)
// app.post("/conges", ...)
// etc.

// ========== JWT HELPERS ==========
function generateAccessToken(user: any) {
  return jwt.sign(
    { id: user.id, employee: user },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "15m" }
  );
}

function generateRefreshToken(user: any) {
  return jwt.sign(
    { id: user.id },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: "7d" }
  );
}
// ========== DATABASE & START SERVER ==========
// ========== DATABASE CONFIGURATION ==========
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "yassine13299837",
  database: "GRH",
  synchronize: true,
  logging: false,
  entities: [UserDTO, SubjectDTO, TermDTO, FieldDTO],
});

export default app;


// ========== ROUTES ==========

// ---- HOME
/*app.get("/", (_req: Request, res: Response) => {
  res.send("Bienvenue dans l'API RH 👋");
});

// ---- LOGIN
app.post("/login", async (req: Request, res: Response) => {
  const { email, mot_de_passe } = req.body;

  try {
    const employee = await AppDataSource.getRepository(Employee).findOneBy({ email });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const validPassword = await bcrypt.compare(mot_de_passe, employee.mot_de_passe);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const accessToken = generateAccessToken(employee);
    const refreshToken = generateRefreshToken(employee);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: "Login error", error });
  }
});

// ---- REFRESH TOKEN
app.post("/refresh", (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
    (err, decoded) => {
      if (err) return res.sendStatus(403);
      const newAccessToken = generateAccessToken(decoded);
      res.json({ accessToken: newAccessToken });
    }
  );
});

// ---- LOGOUT
app.post("/logout", (_req: Request, res: Response) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Logout successful" });
});

// ---- EMPLOYEES CRUD
app.get("/employees", async (_req, res) => {
  const employees = await AppDataSource.getRepository(Employee).find();
  res.json(employees);
});

app.post("/employees", async (req, res) => {
  const data = req.body;
  const hashedPassword = await bcrypt.hash(data.mot_de_passe, 10);

  const employee = AppDataSource.getRepository(Employee).create({
    ...data,
    mot_de_passe: hashedPassword,
  });

  await AppDataSource.getRepository(Employee).save(employee);
  res.status(201).json(employee);
});

app.put("/employees/:matricule", async (req, res) => {
  const repo = AppDataSource.getRepository(Employee);
  const employee = await repo.findOneBy({ matricule: req.params.matricule });

  if (!employee) return res.sendStatus(404);

  Object.assign(employee, req.body);
  await repo.save(employee);

  res.json(employee);
});

app.delete("/employees/:matricule", async (req, res) => {
  await AppDataSource.getRepository(Employee).delete({ matricule: req.params.matricule });
  res.json({ message: "Employee deleted" });
});

// ---- CONGES
app.post("/conges", async (req, res) => {
  const conge = AppDataSource.getRepository(Conge).create({
    ...req.body,
    status: "En attente",
  });
  await AppDataSource.getRepository(Conge).save(conge);
  res.status(201).json(conge);
});

// ---- EVALUATIONS
app.get("/evaluations", async (_req, res) => {
  const evaluations = await AppDataSource.getRepository(Evaluation).find({
    relations: ["employee"],
  });
  res.json(evaluations);
});

app.post("/evaluations", async (req, res) => {
  const evaluation = AppDataSource.getRepository(Evaluation).create(req.body);
  await AppDataSource.getRepository(Evaluation).save(evaluation);
  res.status(201).json(evaluation);
});

app.delete("/evaluations/:id", async (req, res) => {
  await AppDataSource.getRepository(Evaluation).delete(Number(req.params.id));
  res.json({ message: "Evaluation deleted" });
});

// ---- DEMANDES
app.get("/demandes", async (_req, res) => {
  const demandes = await AppDataSource.getRepository(Demande).find({
    relations: ["employee"],
  });
  res.json(demandes);
});

app.post("/demandes", async (req, res) => {
  const demande = AppDataSource.getRepository(Demande).create(req.body);
  await AppDataSource.getRepository(Demande).save(demande);
  res.status(201).json(demande);
});

app.put("/demandes/:id", async (req, res) => {
  const repo = AppDataSource.getRepository(Demande);
  const demande = await repo.findOneBy({ id: Number(req.params.id) });
  if (!demande) return res.sendStatus(404);

  Object.assign(demande, req.body);
  await repo.save(demande);
  res.json(demande);
});
*/
// ========== START ==========
