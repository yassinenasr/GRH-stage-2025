import { EntitySchema } from "typeorm";
const Employee = new EntitySchema({
  name: "Employee",
  tableName: "employees",
  columns: {
    matricule: {
      primary: true,
      type: "varchar",
    },
    nom: { type: "varchar" },
    prenom: { type: "varchar" },
    email: { type: "varchar" },
    mot_de_passe: { type: "varchar" },
    poste: { type: "varchar" },
    grade: { type: "varchar" },
    salaire: { type: "float" },
    type: { type: "varchar" }, // Admin / Employee / Responsable
  },
  relations: {
    evaluations: {
      target: "Evaluation",
      type: "one-to-many",
      inverseSide: "employee",
    },
    conges: {
      target: "Conge",
      type: "one-to-many",
      inverseSide: "employee",
    },
  },
});
export default Employee;