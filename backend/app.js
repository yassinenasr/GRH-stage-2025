import express from "express";
import bodyParser from "body-parser";
import { DataSource } from "typeorm";
import Employee from "./entities/Employee.js";
import Evaluation from "./entities/Evaluation.js";
import Conge from "./entities/Conge.js";
import bcrypt from "bcrypt";
import cors from "cors";
import Demande from "./entities/Demande.js";
import { protect } from "./middleware/auth.js";
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, 
    exposedHeaders: ["Authorization"], 
  })
);

app.use((req, res, next) => {
  const publicRoutes = ["/login", "/refresh"];
  if (publicRoutes.includes(req.path)) return next();

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token manquant" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Token invalide" });
    req.user = decoded;
    next();
  });
});
app.use(express.json());
app.use(cookieParser());
const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",       
  password: "yassine13299837",   
  database: "GRH",     
  synchronize: true,           
  entities: [Employee, Evaluation, Conge , Demande],
});
// POST: Submit leave request
function generateAccessToken(user) {
  return jwt.sign({ id: user.id, employee: user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

function generateRefreshToken(user) {
  return jwt.sign({ id: user.id, employee: user }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}
app.post("/conges", async (req, res) => {
  try {
    const {
      employeeName,
      departmentAndPosition,
      startDate,
      endDate,
      totalDays,
      leaveType,
      otherLeaveType,
      leaveReason,
      remarks,
      submissionDate
    } = req.body;

    const congeRepo = AppDataSource.getRepository(Conge);
   
    const newConge = congeRepo.create({
      employeeName,
      matricule: departmentAndPosition,
      startDate,
      endDate,
      totalDays,
      type: leaveType.includes("Autre") ? otherLeaveType : leaveType[0],
      reason: leaveReason,
      remarks,
      submissionDate,
      status: "En attente"
    });

    await congeRepo.save(newConge);
    res.status(201).json({ message: "Demande de congé ajoutée", conge: newConge });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout de la de  mande", error });
  }
});
// get all evaluations
app.get("/evaluations", async (req, res) => {
  try {
    const evaluations = await AppDataSource.getRepository(Evaluation).find({ relations: ["employee"] });
    res.status(200).json({ evaluations });
  }
  catch (error) {
    res.status(500).json({ message: "Error fetching evaluations", error });
  } 
});

// get all demandes 
app.get("/demandes", async (req, res) => {
  try {
    const demandes = await AppDataSource.getRepository(Demande).find({ relations: ["employee"] });
    res.status(200).json({ demandes });
  } catch (error) {
    res.status(500).json({ message: "Error fetching demandes", error });
  }
});
app.get("/demandes/count/:matricule", async (req, res) => {
  const { matricule } = req.params;
  try {
    const count = await AppDataSource.getRepository(Demande)
      .createQueryBuilder("demande")
      .leftJoin("demande.employee", "employee")
      .where("employee.matricule = :matricule", { matricule })
      .getCount();

    res.status(200).json({ count });
  } catch (error) {
    console.error("Erreur lors du comptage des demandes :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

//get demande by matricule
app.get("/demandes/:matricule", async (req, res) => {
  const { matricule } = req.params;
  const demandes = await AppDataSource.getRepository(Demande).find({
    where: { employee: { matricule } },
    relations: ["employee"],
  });
  res.status(200).json({ demandes });
});

// get demande conge by matricule
app.get("/conges/:matricule", async (req, res) => {
  try {
    const { matricule } = req.params;
    const conges = await AppDataSource.getRepository(Conge).find({
      where: { employee: { matricule } },
      relations: ["employee"],
    });
    if (!conges || conges.length === 0) {
      return res.status(404).json({ message: "No conges found for this employee" });
    }
    res.status(200).json({ conges });
  } catch (error) {
    res.status(500).json({ message: "Error fetching conges", error });
  }
});
// get demande by type
app.get("/demandes/type/:type", async (req, res) => {
  const { type } = req.params;
  try {
    const demandes = await AppDataSource.getRepository(Demande)
    .createQueryBuilder("demande")
    .where("demande.type = :type", { type })
    .leftJoinAndSelect("demande.employee", "employee")
    .getMany();
    res.status(200).json({ demandes });
    } catch (error) {
      console.error("Erreur lors du comptage des demandes :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
// Business logic: get all Employees
app.get("/employees", async (req, res) => {
  try {
    const employees = await AppDataSource.getRepository(Employee).find();
    res.status(200).json({ employees });
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error });
  }
});
// Business logic: get Employee by matricule
app.get("/employees/:matricule", async (req, res) => {
  try {
    const { matricule } = req.params;
    const employee = await AppDataSource.getRepository(Employee).findOneBy({ matricule });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ employee });
  } catch (error) {
    res.status(500).json({ message: "Error fetching employee", error });
  }
});
// Business logic: delete Employee by matricule
app.delete("/employees/:matricule", async (req, res) => {
  try {
    const { matricule } = req.params;
    const result = await AppDataSource.getRepository(Employee).delete({ matricule });
    if (result.affected === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error });
  }
});
// Business logic: add Employee
app.post("/employees", async (req, res) => {
  try {
    const { matricule,
    nom,
    prenom,
    email,
    mot_de_passe,
    poste,
    grade,
    salaire,
    type, } = req.body;
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    const employee = new Employee();
    employee.nom = nom;
    employee.prenom = prenom;
    employee.email = email;
    employee.mot_de_passe = hashedPassword;
    employee.matricule = matricule;
    employee.poste = poste;
    employee.grade = grade;
    employee.salaire = salaire; 
    employee.type = type;

    const savedEmployee = await AppDataSource.getRepository(Employee).save(employee);
    res.status(201).json({ message: "Employee added successfully", employee: savedEmployee });
  } catch (error) {
    res.status(500).json({ message: "Error adding employee", error });
  }
});
// Business logic: update Employee by matricule
app.put("/employees/:matricule", async (req, res) => {
  try {
    const { matricule } = req.params;
    const { nom, prenom, email, mot_de_passe, poste, grade, salaire, type } = req.body;
    const employeeRepository = AppDataSource.getRepository(Employee);
    const employee = await employeeRepository.findOneBy({ matricule });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (mot_de_passe) {
      employee.mot_de_passe = await bcrypt.hash(mot_de_passe, 10);
    }
    employee.nom = nom;
    employee.prenom = prenom;
    employee.email = email;
    employee.poste = poste;
    employee.grade = grade;
    employee.salaire = salaire; 
    employee.type = type;

    const updatedEmployee = await employeeRepository.save(employee);
    res.status(200).json({ message: "Employee updated successfully", employee: updatedEmployee });
  } catch (error) {
    res.status(500).json({ message: "Error updating employee", error });
  }
});
// post request to login
app.post("/login", async (req, res) => {
  const { email, mot_de_passe } = req.body;
  try {
    const employee = await AppDataSource.getRepository(Employee).findOneBy({ email });
    if (!employee) {
      return res.status(404).json({ result: { message: "Employee not found", status: 404 } });
    }

    const isPasswordValid = (mot_de_passe == employee.mot_de_passe); // 🔒 tu devrais utiliser bcrypt ici pour production

    if (!isPasswordValid) {
      return res.status(401).json({ result: { message: "Invalid password", status: 401 } });
    }

    const accessToken = generateAccessToken(employee);
    const refreshToken = generateRefreshToken(employee);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    res.status(200).json({ result: { message: "Login successful", status: 200, accessToken  } });
  } catch (error) {
    res.status(500).json({ result: { message: "Error during login: " + error, status: 500 } });
  }
});
//refresh token endpoint
app.post("/refresh", (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired refresh token" });
    }
    const newAccessToken = generateAccessToken(user);
    res.json({ result: { accessToken: newAccessToken } });
  });
});

 // delete evaluation
app.delete("/evaluations/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const evaluationRepository = AppDataSource.getRepository(Evaluation);
    const evaluation = await evaluationRepository.findOneBy({ id: Number(id) });
    if (!evaluation) {
      return res.status(404).json({ message: "Evaluation not found" });
    }
    await evaluationRepository.remove(evaluation);
    res.status(200).json({ message: "Evaluation deleted successfully" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'évaluation :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});
// delete employee
app.delete("/employees/:matricule", async (req, res) => {
  const { matricule } = req.params;
  const employeeRepository = AppDataSource.getRepository(Employee);
  try {
    const employee = await employeeRepository.findOneBy({ matricule });
    if (!employee) {
      return res.status(404).json({ message: "Employé non trouvé" });
    }

    await employeeRepository.remove(employee);
    res.status(200).json({ message: "Employé supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    res.status(500).json({ message: "Erreur lors de la suppression de l'employé" });
  }
});
// modify evaluation
app.put("/evaluations/:id", async (req, res) => {
  const { id } = req.params;
  const evaluationData = req.body;
  try {
    const evaluationRepository = AppDataSource.getRepository(Evaluation);
    const evaluation = await evaluationRepository.findOneBy({ id: Number(id) });
    if (!evaluation) {
      return res.status(404).json({ message: "Évaluation non trouvée" });
    }
    Object.assign(evaluation, evaluationData);
    const updatedEvaluation = await evaluationRepository.save(evaluation);
    res.status(200).json({ message: "Évaluation modifiée avec succès", evaluation: updatedEvaluation });
  } catch (error) {
    console.error("Erreur lors de la modification de l'évaluation :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});
// add evaluation


// backend/routes/employees.js ou dans ton app.js si tout est dans un seul fichier
app.post('/employees', async (req, res) => {
  try {
    // Affiche ce que le frontend envoie
    console.log('Nouveau employé reçu :', req.body);

    const {
      matricule,
      nom,
      prenom,
      email,
      mot_de_passe,
      poste,
      grade,
      salaire,
      type
    } = req.body;

    // Exemple simple : vérification
    if (!matricule || !nom || !prenom || !email || !mot_de_passe) {
      return res.status(400).json({ message: 'Champs requis manquants' });
    }

    // → Insertion dans la base de données ici...

    res.status(201).json({ message: 'Employé ajouté avec succès' });
  } catch (error) {
    console.error('Erreur backend :', error);
    res.status(500).json({ message: 'Erreur réseau ou serveur' });
  }
});
 
app.post("/demandes", async (req, res) => {
  try {
    console.log("Nouvelle demande reçue :", req.body);

    const { typeDemande, etat, idEmployee, dateSoumission } = req.body;

    // Vérification simple des champs requis
    if (!typeDemande || !etat || !idEmployee || !dateSoumission) {
      return res.status(400).json({ message: "Champs requis manquants" });
    }

    // Ici tu peux insérer directement en base (avec TypeORM)
    // Exemple basique sans vérifier l'existence de l'employé
    const nouvelleDemande = AppDataSource.getRepository("Demande").create({
      typeDemande,
      etat,
      dateSoumission,
      employee: { id: idEmployee }, // Utilise la relation via id seulement
    });

    await AppDataSource.getRepository("Demande").save(nouvelleDemande);

    res.status(201).json({ message: "Demande ajoutée avec succès" });
  } catch (error) {
    console.error("Erreur backend :", error);
    res.status(500).json({ message: "Erreur réseau ou serveur" });
  }
});


  // changer etat demande
app.put("/demandesT/:id", async (req, res) => {
  const { id } = req.params;
  const { etat } = req.body;
  const demandeRepository = AppDataSource.getRepository(Demande);

  try {
    const demande = await demandeRepository.findOne({ where: { id: Number(id) } });
    if (!demande) {
      return res.status(404).json({ message: "Demande not found" });
    }
    demande.etat = etat;
    const updatedDemande = await demandeRepository.save(demande);
    res.status(200).json({ message: "Demande updated successfully", demande: updatedDemande });
  } catch (error) {
    console.error('Erreur backend :', error);
    res.status(500).json({ message: 'Erreur réseau ou serveur' });
  }
});
// add new employee
app.post("/employeeT", async (req, res) => {
  const { matricule, nom, prenom, email, mot_de_passe, poste, grade, salaire, type } = req.body;
  const employeeRepository = AppDataSource.getRepository(Employee);
  try {
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    const newEmployee = employeeRepository.create({
      matricule,
      nom,
      prenom,
      email,
      mot_de_passe: hashedPassword,
      poste,
      grade,
      salaire,
      type
    });
    const savedEmployee = await employeeRepository.save(newEmployee);
    res.status(201).json({ message: "Employé ajouté avec succès", employee: savedEmployee });
  } catch (error) {
    console.error("Erreur backend :", error);
    res.status(500).json({ message: "Erreur lors de l'ajout de l'employé" });
  }
});
//add new evaulation
app.post("/perfR", async (req, res) => {
  const { matricule, note, mois, primes } = req.body;
  const evaluationRepository = AppDataSource.getRepository(Evaluation);
  const employeeRepository = AppDataSource.getRepository(Employee);

  try {
    const employee = await employeeRepository.findOne({ where: { matricule } });
    if (!employee) return res.status(404).json({ message: "Employé non trouvé" });

    const newEvaluation = evaluationRepository.create({
      note,
      mois,
      primes,
      employee: employee, // relation
    });

    const saved = await evaluationRepository.save(newEvaluation);
    res.status(201).json({ message: "Évaluation enregistrée", evaluation: saved });

  } catch (error) {
    console.error("Erreur backend :", error);
    res.status(500).json({ message: "Erreur lors de l'ajout de l'évaluation" });
  }
});
// add new demande
app.post("/demandesR", async (req, res) => {
  const { matricule, demande, date, etat } = req.body;
console.log("Reçu :", req.body);

  try {
    const employeeRepository = AppDataSource.getRepository(Employee);
    const employee = await employeeRepository.findOne({ where: { matricule } });

    if (!employee) {
      return res.status(404).json({ message: "Employé non trouvé" });
    }

    const demandeRepository = AppDataSource.getRepository(Demande);
    const newDemande = demandeRepository.create({ matricule, demande, date, etat });
    await demandeRepository.save(newDemande);

    res.status(201).json({ message: "Demande ajoutée avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'ajout de la demande :", error);
    res.status(500).json({ message: "Erreur lors de l'ajout de la demande" });
  }
});




//logout 
app.post('/logout', (req, res) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
    sameSite: 'strict',
  });
  res.status(200).json({ message: 'Logout successful' });
}
);



AppDataSource.initialize()
  .then(() => {
    console.log("✅ Connexion à la base de données réussie.");
  })
  .catch((err) => {
    console.error("❌ Erreur lors de l'initialisation de la base :", err);
  });
app.get("/", (req, res) => {
  res.send("Bienvenue dans l'API RH 👋");
});

export default app;
