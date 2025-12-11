import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaCalendarAlt,
  FaChartBar,
  FaSignOutAlt,
  FaEnvelope,
} from "react-icons/fa";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  getEmployees,
  getCongesByMatricule,
  getEvaluations,
  getDemandesCountByMatricule,
  getDemandes,
  logout,
} from "../../services/service";
import { useAuth } from "../../contexts/AuthenticateProvider";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { SpeechBubble } from "react-kawaii";
import EmojiRain from "emoji-rain";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export const handleLogout = async ({ logOut }) => {
  try {
    await logout();
    logOut();
    window.location.href = "/home";
  } catch (error) {
    console.error("Logout failed", error);
  }
};

export default function ResponsableDashboard() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [conges, setConges] = useState([]);
  const [matricule, setMatricule] = useState(null);
  const [evaluations, setEvaluations] = useState([]);
  const [demandesCount, setDemandesCount] = useState(0);
  const [demandes, setDemandes] = useState([]);
  const { logOut } = useAuth();
  const { width, height } = useWindowSize();

  const employeeCount = employees.filter((e) => e.type === "employee").length;
  const responsableCount = employees.filter((e) => e.type === "responsable").length;
  const adminCount = employees.filter((e) => e.type === "admin").length;

  const rest = conges.length > 0 ? conges.reduce((total, c) => total + c.nbjour, 0) : 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeesData = await getEmployees();
        setEmployees(employeesData);

        if (employeesData.length > 0) {
          const firstMatricule = employeesData[0].matricule;
          setMatricule(firstMatricule);

          const congesData = await getCongesByMatricule(firstMatricule);
          setConges(congesData);

          const demandesCountData = await getDemandesCountByMatricule(firstMatricule);
          setDemandesCount(demandesCountData);
        }

        const evaluationsData = await getEvaluations();
        setEvaluations(evaluationsData);

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
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-6">Tableau de bord Responsable</h1>
        <nav className="flex flex-col gap-4">
          <button onClick={() => navigate("/dashboard/responsable")} className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded">
            <FaUsers /> Mes Données
          </button>
          <button onClick={() => navigate("/dashboard/employeeT")} className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded">
            <FaUsers /> Les employés
          </button>
          <button onClick={() => navigate("/dashboard/demandesTR")} className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded">
            <FaCalendarAlt /> Demandes/Rapports
          </button>
          <button onClick={() => navigate("/dashboard/demandesR")} className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded">
            <FaEnvelope /> Mes demandes
          </button>
          <button onClick={() => navigate("/dashboard/perfR")} className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded">
            <FaChartBar /> Performance des employés
          </button>
        </nav>
        <div className="mt-auto pt-6">
          <button className="flex items-center gap-2 text-red-300 hover:text-red-500" onClick={() => handleLogout({ logOut })}>
            <FaSignOutAlt /> Déconnexion
          </button>
        </div>
      </aside>

      {/* MAIN DASHBOARD */}
      <main className="flex-1 bg-gray-100 p-6 relative overflow-hidden">
        {/* 🎉 Fun UI Enhancements */}
       
       

        <h2 className="text-3xl font-semibold mb-6">Bienvenue, Responsable </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow p-4 rounded-xl">
            <h3 className="text-xl font-medium">Nombre total d’employés</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{employees.length}</p>
          </div>
          <div className="bg-white shadow p-4 rounded-xl">
            <h3 className="text-xl font-medium">Nombre total de demandes</h3>
            <p className="text-3xl font-bold text-orange-500 mt-2">{demandes.length}</p>
          </div>
          <div className="bg-white shadow p-4 rounded-xl">
            <h3 className="text-xl font-medium">Nombre total d’évaluations</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{evaluations.length}</p>
          </div>
        </div>

        {/* 📊 Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow p-6 rounded-xl h-80 flex flex-col">
            <h3 className="text-lg font-semibold mb-2 text-center">Statistiques des demandes et des rapports</h3>
            <div className="flex-1 w-full relative">
              <Doughnut
                data={{
                  labels: ["Les Demandes ", "Les Rapports"],
                  datasets: [
                    {
                      data: [demandes.length, evaluations.length],
                      backgroundColor: ["#FF6384", "#36A2EB"],
                      hoverBackgroundColor: ["#FF6384", "#36A2EB"],
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: "top" } },
                }}
              />
            </div>
          </div>

          <div className="bg-white shadow p-6 rounded-xl h-80 flex flex-col">
            <h3 className="text-lg font-semibold mb-2 text-center">Répartition des employés par type</h3>
            <div className="flex-1 w-full relative">
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
                      borderRadius: 5,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: "top" } },
                  scales: { y: { beginAtZero: true } },
                }}
              />
            </div>
          </div>

          <div className="bg-white shadow p-6 rounded-xl h-80 flex flex-col">
            <h3 className="text-lg font-semibold mb-2 text-center">Bilan des congés</h3>
            <div className="flex-1 w-full relative">
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
                  maintainAspectRatio: false,
                  plugins: { legend: { position: "top" } },
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
