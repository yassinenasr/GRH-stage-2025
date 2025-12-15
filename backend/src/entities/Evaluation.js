import { EntitySchema } from "typeorm";
const Evaluation = new EntitySchema({
  name: "Evaluation",
  tableName: "evaluations",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    note: { type: "float" },
    mois: { type: "varchar" },
    primes: { type: "float" },
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
export default Evaluation;