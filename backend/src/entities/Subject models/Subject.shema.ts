import { EntitySchema } from "typeorm";
import Subject from "./Subject.js";
const SubjectDTO = new EntitySchema<Subject>({
  name: "Subject",
  tableName: "matiere",
    columns: {
    code: {
      primary: true,
      type: "varchar", 
    },
    nom: {
      type: "varchar",
        nullable: false,
    },
    credits: {
      type: "int",
        nullable: false,
    },
    coefficient: {
        type: "float",
        nullable: false,
    },
    active: {
        type: "boolean",
        default: true,
    },
    },
    relations: {
    semestre: {
        target: "Term",
        type: "many-to-one",
        joinColumn: {
        name: "semestre_id",
        referencedColumnName: "id"
        }
    }
    }
});
export default SubjectDTO;