import { EntitySchema } from "typeorm";

const Demande = new EntitySchema({
  name: "Demande",
  tableName: "demandes",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    typeDemande: { 
      type: "enum",
      enum: ["congé", "augmentation de salaire"],
      default: "congé",
    },
    etat: {
      type: "enum",
      enum: ["accepté", "en attente", "refusé"],
      default: "en attente",
    },
    dateSoumission: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    employee: {
      target: "Employee",
      type: "many-to-one",
      joinColumn: {
        name: "idEmployee",
      },
      nullable: false,
    },
  },
});

export default Demande;
