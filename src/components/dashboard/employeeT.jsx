import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaCalendarAlt, FaChartBar, FaSignOutAlt, FaEnvelope } from "react-icons/fa";
import { Doughnut, Bar } from "react-chartjs-2";
import { getEmployees , getCongesByMatricule ,getEvaluations} from "../../services/service"; 
import { getDemandesCountByMatricule } from "../../services/service";
import { getDemandes } from "../../services/service";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);
// function EmployeesTable() {
//   const [employees, setEmployees] = useState([]);

//   useEffect(() => {
//     // Fetch employees once component mounts
//     getEmployees()
//       .then(data => {
//         setEmployees(data);
//       })
//       .catch(err => {
//         console.error("Failed to fetch employees:", err);
//       });
//   }, []);   }
export default function EmployeeTDashboard() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [conges, setConges] = useState([]);
  const [matricule, setMatricule] = useState(null);
  const [evaluations, setEvaluations] = useState([]);
  const [demandesCount, setDemandesCount] = useState(0);
  const employeeCount = employees.filter((e) => e.type === "employee").length;
  const responsableCount = employees.filter((e) => e.type === "responsable").length;
  const adminCount = employees.filter((e) => e.type === "admin").length;
  const [demandes, setDemandes] = useState([]);
  const CongeCount = demandes.filter((d) => d.type === "congé").length;
  const AugmentationCount = demandes.filter((d) => d.type === "augmentation de salaire").length;

 // <-- déclaration du matricule
const rest=  conges.length > 0
      ? conges.reduce((total, c) => total + c.nbjour, 0)
      : "0";
      useEffect(() => {
  const fetchData = async () => {
    try {
      // Récupération des employés
      const employeesData = await getEmployees();
      setEmployees(employeesData);

      if (employeesData.length > 0) {
        const firstMatricule = employeesData[0].matricule;
        setMatricule(firstMatricule);

        // Récupération des congés avec le matricule du premier employé
        const congesData = await getCongesByMatricule(firstMatricule);
        setConges(congesData);

        // Récupération du nombre total de demandes avec le matricule
        const demandesCountData = await getDemandesCountByMatricule(firstMatricule);
        setDemandesCount(demandesCountData);
      }

      // Récupération des évaluations
      const evaluationsData = await getEvaluations();
      setEvaluations(evaluationsData);

      // Récupération des demandes globales (toutes)
      const demandesData = await getDemandes();
      setDemandes(demandesData);

    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  fetchData();
}, []);


 
  return (
    <div className="min-h-screen flex">
       <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">
              <h1 className="text-2xl font-bold mb-6">Tableau de bord Responsable</h1>
              <nav className="flex flex-col gap-4">
                <button className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded" onClick={() => navigate("/dashboard/responsable")}>
                  <FaUsers /> Mes Données
                </button>
                <button className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded" onClick={() => navigate("/dashboard/employeeT")}>
                  <FaUsers /> Les employés
                </button>
                <button className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded" onClick={() => navigate("/dashboard/demandesTR")}>
                  <FaCalendarAlt /> Demandes/Rapports
                </button>
                <button className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded" onClick={() => navigate("/dashboard/demandesR")}>
                  <FaEnvelope /> Mes demandes 
                </button>
                <button className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded" onClick={() => navigate("/dashboard/perfR")}>
                  <FaChartBar /> Performance des employés
                </button>
              </nav>
              <div className="mt-auto pt-6">
                <button className="flex items-center gap-2 text-red-300 hover:text-red-500">
                  <FaSignOutAlt /> Déconnexion
                </button>
              </div>
            </aside>

      <main className="flex-1 bg-gray-100 p-6">
       <div className="p-4 bg-white rounded-xl shadow">
          <h1 className="text-2xl font-bold mb-4">Liste des employés</h1>

          <table className="w-full table-auto border mb-6">
      <thead>
        <tr className="bg-gray-200">
          <th>Matricule</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Email</th>
          <th>Poste</th>
          <th>Grade</th>
          <th>Salaire</th>
          <th>Type</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {employees.length === 0 ? (
          <tr><td colSpan="8" className="text-center">Chargement...</td></tr>
        ) : (
          employees.map((emp) => (
            <tr key={emp.matricule} className="text-center border-t">
              <td>{emp.matricule}</td>
              <td>{emp.nom}</td>
              <td>{emp.prenom}</td>
              <td>{emp.email}</td>
              <td>{emp.poste}</td>
              <td>{emp.grade}</td>
              <td>{emp.salaire}</td>
              <td>{emp.type}</td>
              <td> <button className="   rounded text-sm text-red-500">
        Supprimer {emp.nom}  {emp.prenom}
      </button></td>
            </tr>
          ))
        )}
        <tr className="text-center border-t">
  <td colSpan="8" className="py-4">
    <div className="flex justify-center gap-4">
      <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded text-sm" onClick={() => navigate("/dashboard/add-employee")}>
        Ajouter un employé
      </button>
      
    </div>
  </td>
</tr>

      </tbody>
    </table>
        </div>
      </main>
    </div>
  );
}
