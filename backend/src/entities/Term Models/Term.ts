import { Column } from "typeorm";
import Subject from "../Subject models/Subject";

interface Term {  
    id : number;
    nom : string; // ex: Term 1, Term 2
    matieres: Subject[]; // ex: ["CS101", "MA101", "PH101"]
    active: boolean;
}
export default Term;