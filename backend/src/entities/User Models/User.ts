import NiveauEtude from "./niveau";
import UserType from "./type";
import Field from "../Field Models/Field";
interface User {
  cin: string;
  nom: string;
  prenom: string;
  email: string;
  mot_de_passe: string;
  type:UserType;
  niveau_etude: NiveauEtude;
  filiere:Field;
}
export default User;
