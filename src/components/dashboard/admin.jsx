import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaCalendarAlt, FaChartBar, FaSignOutAlt, FaEnvelope } from "react-icons/fa";
import { Doughnut, Bar } from "react-chartjs-2";
import { getEmployees , getCongesByMatricule ,getEvaluations} from "../../services/service"; 
import { getDemandesCountByMatricule } from "../../services/service";
import { getDemandes } from "../../services/service";
import { useAuth } from "../../contexts/AuthenticateProvider";

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
import { logout } from "../../services/service";

export const handleLogout = async ({ logOut }) => {
  try {
    await logout();     // backend logout
    logOut();           // clear local state/context
    window.location.href = "/home"; // full page reload
  } catch (error) {
    console.error("Logout failed", error);
  }
};
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
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [conges, setConges] = useState([]);
  const { logOut } = useAuth(); // ✅ this is needed for logout to work

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
        <h1 className="text-2xl font-bold mb-6">Tableau de bord Admin</h1>
        <nav className="flex flex-col gap-4">
          <button className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded">
            <FaUsers /> Employés
          </button>
          <button className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded" onClick={() => navigate("/dashboard/demandesT")}>
            <FaCalendarAlt /> Demandes/Rapports
          </button>
          <button className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded" onClick={() => navigate("/dashboard/demandes")}>
            <FaEnvelope /> Mes demandes 
          </button>
          <button className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded" onClick={() => navigate("/dashboard/perf")}>
            <FaChartBar /> Performance des employés
          </button>
        </nav>
        <div className="mt-auto pt-6">
         <button
  className="flex items-center gap-2 text-red-300 hover:text-red-500"
  onClick={() => handleLogout({ logOut })}
>
  <FaSignOutAlt /> Déconnexion
</button>

        </div>
      </aside>

      <main className="flex-1 bg-gray-100 p-6">
        <h2 className="text-3xl font-semibold mb-6">Bienvenue, Admin </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow p-4 rounded-xl">
            <h3 className="text-xl font-medium"> Nombre total d’employés</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{employees.length}</p>
          </div>
          <div className="bg-white shadow p-4 rounded-xl">
            <h3 className="text-xl font-medium"> Demandes de congé en attente</h3>
            <p className="text-3xl font-bold text-orange-500 mt-2">{CongeCount}</p>
          </div>
          <div className="bg-white shadow p-4 rounded-xl">
            <h3 className="text-xl font-medium"> Demandes d'augmentation de salaire </h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{AugmentationCount}</p>
          </div>
          <div className="bg-white shadow p-4 rounded-xl">
            <h3 className="text-xl font-medium">Rapports de performance</h3>
            <p className="text-3xl font-bold text-orange-500 mt-2">{evaluations.length}</p>
          </div>
          <div className="bg-white shadow p-4 rounded-xl">
            <h3 className="text-xl font-medium">Jours de congé restants</h3>
            <p className="text-3xl font-bold text-orange-500 mt-2"> 
              {conges.length > 0
      ? conges.reduce((total, c) => total + c.nbjour, 0)
      : "0"}</p>
          </div>
          <div className="bg-white shadow p-4 rounded-xl">
            <h3 className="text-xl font-medium">Demandes totales </h3>
            <p className="text-3xl font-bold text-orange-500 mt-2">{demandesCount}</p>
          </div>

          <div className="dataCard categoryCard bg-white shadow p-4 rounded-xl w-96 mx-auto mb-8">
            <Doughnut
              data={{
                labels: ["Demandes de congé", "Demandes d'augmentation de salaire"],
                datasets: [
                  {
                    data: [8, 34],
                    backgroundColor: ["#FF6384", "#36A2EB"],
                    hoverBackgroundColor: ["#FF6384", "#36A2EB"],
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: {
                    display: true,
                    text: "Statistiques des demandes",
                  },
                },
              }}
            />
          </div>

          <div className="dataCard categoryCard bg-white shadow p-4 rounded-xl w-96 mx-auto mb-8">
            <Bar
              data={{
                labels: ["Employés", "Responsables", "Admins"],
                datasets: [
                  {
                    label: "Nombre d'employés",
      data: [employeeCount, responsableCount, adminCount],
                   backgroundColor: "rgba(75, 192, 192, 0.6)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: {
                    display: true,
                    text: "Répartition des employés par type",
                  },
                },
                scales: {
                  y: { beginAtZero: true },
                },
              }}
            />
          </div>

          <div className="dataCard categoryCard bg-white shadow p-4 rounded-xl w-96 mx-auto mb-8">
            <Doughnut
              data={{
                labels: ["Total des jours de congé acquis", "Solde de congés restants"],
                datasets: [
                  {
                    data: [18, rest],
                    backgroundColor: ["#607D8B", "#3F51B5"],
                    hoverBackgroundColor: ["#455A64", "#303F9F"],
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: {
                    display: true,
                    text: "Bilan des congés : jours acquis et jours restants",
                  },
                },
              }}
            />
          </div>
        </div>

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
            </tr>
          ))
        )}
      </tbody>
    </table>
        </div>
      </main>
    </div>
  );
}
