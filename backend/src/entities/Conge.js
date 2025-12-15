import { EntitySchema } from "typeorm";

const Conge = new EntitySchema({
  name: "Conge",
  tableName: "conges",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    nbjour: { type: "int" },
    datedeb: { type: "varchar" },
    datefin: { type: "varchar" },
    motif: { type: "varchar" },
    type: { type: "varchar" }, // Exceptionnelle / Maladie / etc.
  },
  relations: {
    employee: {
      target: "Employee",
      type: "many-to-one",
      joinColumn: {
        name: "idEmployee",
      },
    },
  },
});

export default Conge;