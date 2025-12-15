import { EntitySchema } from "typeorm";
import Term from "./Term";

const TermDTO = new EntitySchema<Term>({
  name: "Term",
  tableName: "semestre",
    columns: {
    id: {
        primary: true,
        type: "int",
        generated: true,
    },
    nom: {
        type: "varchar",    
        nullable: false,
    },
    active: {
        type: "boolean",
        default: true,
        nullable: false,
    },
  },
  relations: {
    matieres: {
      type: "one-to-many", 
        target: "Subject",
        inverseSide: "semestre",
        cascade: true,
    },
    },
});
export default TermDTO;