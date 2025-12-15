import Term from "../Term Models/Term";
import User from "../User Models/User";


interface Field {  
    code : string; // ex: CS, IT, MECA
    nom : string; // ex: Computer Science, Information Technology, Mechanical Engineering
    semester1: Term,
    semester2: Term,
    active: boolean;
    etudiantsCount?: number;
    etudiants?: User[];
}
export default Field;