import express from "express";
import bodyParser from "body-parser";
import { DataSource } from "typeorm";
import Employee from "./entities/Employee.js";
import Evaluation from "./entities/Evaluation.js";
import Conge from "./entities/Conge.js";
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";
import Demande from "./entities/Demande.js";
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
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
    res.status(500).json({ message: "Erreur lors de l'ajout de la demande", error });
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
app.post("/login", async (req, res) =>
  {
    const { email, mot_de_passe } = req.body;
    try {
      const employee = await AppDataSource.getRepository(Employee).findOneBy({ email });
      if (!employee) {
        return res.status(404).json({  result: { message: "Employee not found" , status: 404 } });
      }
      // const isPasswordValid = await bcrypt.compare(mot_de_passe, employee.mot_de_passe);
            const isPasswordValid =  (mot_de_passe == employee.mot_de_passe);
      if (!isPasswordValid) {
        return res.status(401).json({  result : { message: "Invalid password", status: 401 } });
      }
      res.status(200).json({result :{ message: "Login successful", status : 200 ,employee }});
    } catch (error) {
      res.status(500).json({ result : { message: "Error during login: "+error,status:500 } });
    }
  }
);
// add demande 
app.post("/demandes", async (req, res) => {
  const { matricule, demande } = req.body;
  const employeeRepository = AppDataSource.getRepository(Employee);
  const employee = await employeeRepository.findOneBy({ matricule });
  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }
  const demandeRepository = AppDataSource.getRepository(Demande);
  const newDemande = demandeRepository.create({
    employee,
    type: demande.type,
    date: new Date(),
    status: "En attente",
  });
  try {
    const savedDemande = await demandeRepository.save(newDemande);
    res.status(201).json({ message: "Demande added successfully", demande: savedDemande });
  } catch (error) {
    res.status(500).json({ message: "Error adding demande", error });
  }
});






























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
