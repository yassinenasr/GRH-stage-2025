import Term from "../Term Models/Term";

interface Subject {  
    code : string; // ex: CS101, IT202
    nom : string; // ex: Introduction to Computer Science, Data Structures
    credits: number; // ex: 3, 4
    coefficient: number; // ex: 1.0, 1.5
    semestre: Term; 
    active: boolean;

}
export default Subject;