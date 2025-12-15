import { EntitySchema } from "typeorm";
import UserType from "./type";
import NiveauEtude from "./niveau";
import User from "./User";

const UserDTO = new EntitySchema<User>({
  name: "User",
  tableName: "users",
  columns: {
    cin: {
      primary: true,
      type: "varchar",
    },
    nom: {
      type: "varchar",
      nullable: false,
    },
    prenom: {
      type: "varchar",
      nullable: false,
    },
    email: {
      type: "varchar",
      unique: true,
      nullable: false,
    },
    mot_de_passe: {
      type: "varchar",
      nullable: false,
    },
    type: { 
      type: "enum",
      enum: UserType,
      default: UserType.ETUDIANT,
      nullable: false,
    },
    niveau_etude: {
      type: "enum",
      enum:NiveauEtude,
      nullable: true, 
    },
  },
  relations: {
    filiere: {
      type: "many-to-one",
      target: "Field",
        joinColumn: { 
            name: "filiere_id",
            referencedColumnName: "code"
         },
      nullable: true,
    },
  },
});
export default UserDTO;