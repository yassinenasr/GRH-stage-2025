import { EntitySchema } from "typeorm";
import Field from "./Field";

const FieldDTO = new EntitySchema<Field>({
  name: "Field",
  tableName: "filiere",
  columns: {
    code: {
      primary: true,
      type: "varchar",
    },
    nom: {
      type: "varchar",
      nullable: false,
    },
    active: {
      type: "boolean",
      default: true,
    },},
  relations: {
    semester1: {
      target: "Term",
      type: "many-to-one",
      joinColumn: {
        name: "semester1_id",
        referencedColumnName: "id"
      }
    },
    semester2: {
      target: "Term",
      type: "many-to-one",
      joinColumn: {
        name: "semester2_id",
        referencedColumnName: "id"
      }
    },
    etudiants: {
      target: "User",
      type: "one-to-many",
      inverseSide: "filiere",
    },

  }
});
export default FieldDTO;