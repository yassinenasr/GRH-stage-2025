import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import { Doughnut, Bar } from "react-chartjs-2";
import { useLocation } from "react-router-dom";

import { getEmployees, getCongesByMatricule, getDemandesByMatricule } from "../../services/service";
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
import { useAuth } from '../../contexts/AuthenticateProvider';
export const handleLogout = async ({ logOut }) => {
  try {
    await logout();     // backend logout
    logOut();           // clear local state/context
    window.location.href = "/home"; // full page reload
  } catch (error) {
    console.error("Logout failed", error);
  }
};
export default function EmployeeDashboard() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [conges, setConges] = useState([]);
  const [matricule, setMatricule] = useState(null);
 const [demandes, setDemandes] = useState([]);
const [demandesAcceptees, setDemandesAcceptees] = useState([]);
const [demandesEnAttente, setDemandesEnAttente] = useState([]);
const [demandesRefusees, setDemandesRefusees] = useState([]);
const { logOut } = useAuth(); // ✅ this is needed for logout to work
const employeeMatricule = localStorage.getItem("matricule");
const [demandeConge, setDemandesConge] = useState([]);
const [demandeAug, setDemandesAug] = useState([]);
useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getDemandesByMatricule(employeeMatricule);

      setDemandesConge(data.filter(d => d.type === "congé"));
      setDemandesAug(data.filter(d => d.type === "augmentation de salaire"));

    } catch (error) {
      console.error("Erreur lors du chargement des demandes :", error);
    }
  };

  if (employeeMatricule) {
    fetchData();
  }

  if (location.state?.submitted) {
    toast.success("Demande de congé soumise avec succès !");
  }
}, [location, employeeMatricule]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getDemandesByMatricule(employeeMatricule);

      setDemandesAcceptees(data.filter(d => d.etat === "accepté"));
      setDemandesEnAttente(data.filter(d => d.etat === "en attente"));
      setDemandesRefusees(data.filter(d => d.etat === "refusé"));

    } catch (error) {
      console.error("Erreur lors du chargement des demandes :", error);
    }
  };

  if (employeeMatricule) {
    fetchData();
  }

  if (location.state?.submitted) {
    toast.success("Demande de congé soumise avec succès !");
  }
}, [location, employeeMatricule]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getDemandesByMatricule(employeeMatricule);
      setDemandes(data);
    } catch (error) {
      console.error("Erreur lors du chargement des demandes :", error);
    }
  };

  if (employeeMatricule) {
    fetchData();
  }

  if (location.state?.submitted) {
    toast.success("Demande de congé soumise avec succès !");
  }
}, [location, employeeMatricule]);

  useEffect(() => {
    const storedMatricule = localStorage.getItem("matricule");
    if (!storedMatricule) {
      navigate("/login");
    } else {
      setMatricule(storedMatricule);
    }
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des employés :", error);
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (!matricule) return;
    const fetchConges = async () => {
      try {
        const data = await getCongesByMatricule(matricule);
        setConges(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des congés :", error);
      }
    };
    fetchConges();
  }, [matricule]);

  const selectedEmployee = employees.find(emp => emp.matricule === matricule);
  const totalJours = conges.reduce((total, c) => total + c.nbjour, 0);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-6">Tableau de bord Employé</h1>
        <nav className="flex flex-col gap-4">
          <button className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded" onClick={() => navigate("/dashboard/employee")}>
            <FaUsers /> Profile Employé
          </button>
          <button className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded" onClick={() => navigate("/dashboard/demandesE")}>
            <FaEnvelope /> Mes demandes
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

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        <h2 className="text-3xl font-semibold mb-6">Bienvenue, employé(e)</h2>

        {selectedEmployee ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white shadow p-4 rounded-xl">
              <h3 className="text-xl font-medium">Matricule :</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">{selectedEmployee.matricule}</p>
            </div>
            <div className="bg-white shadow p-4 rounded-xl">
              <h3 className="text-xl font-medium">Email :</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">{selectedEmployee.email}</p>
            </div>
            <div className="bg-white shadow p-4 rounded-xl">
              <h3 className="text-xl font-medium">Poste :</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">{selectedEmployee.poste}</p>
            </div>
            <div className="bg-white shadow p-4 rounded-xl">
              <h3 className="text-xl font-medium">Grade :</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">{selectedEmployee.grade}</p>
            </div>
            <div className="bg-white shadow p-4 rounded-xl">
              <h3 className="text-xl font-medium">Salaire :</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">{selectedEmployee.salaire}</p>
            </div>
            <div className="bg-white shadow p-4 rounded-xl">
              <h3 className="text-xl font-medium">Type :</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">{selectedEmployee.type}</p>
            </div>
            <div className="bg-white shadow p-4 rounded-xl">
              <h3 className="text-xl font-medium">Nombre total de demandes :</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">{demandes.length}</p>
            </div>
            <div className="bg-white shadow p-4 rounded-xl">
              <h3 className="text-xl font-medium">Jours de congé  :</h3>
              <p className="text-3xl font-bold text-orange-500 mt-2">{totalJours}</p>
            </div>
          </div>
        ) : (
          <p>Chargement des informations de l'employé...</p>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow p-4 rounded-xl w-96 mx-auto mb-8" style={{ height: 320 }}>
            <Doughnut
              data={{
                labels: ["Demandes de congé", "Demandes d'augmentation de salaire"],
                datasets: [{ data: [demandeConge.length, demandeAug.length], backgroundColor: ["#FF6384", "#36A2EB"] }],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "top" },
                  title: { display: true, text: "Statistiques des demandes" },
                },
              }}
            />
          </div>

          <div className="bg-white shadow p-4 rounded-xl w-96 mx-auto mb-8" style={{ height: 320 }}>
            <Bar
              data={{
                labels: ["Accepté", "En attente", "Refusé"],
                datasets: [{
                  label: "Nombre de demandes",
                  data: [demandesAcceptees.length, demandesEnAttente.length , demandesRefusees.length],
                  backgroundColor: ["rgba(54, 162, 235, 0.7)", "rgba(255, 206, 86, 0.7)", "rgba(255, 99, 132, 0.7)"],
                  borderRadius: 5,
                }],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "top" },
                  title: { display: true, text: "Répartition des demandes selon leur statut" },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.parsed.y} demande${context.parsed.y > 1 ? "s" : ""}`,
                    },
                  },
                },
                scales: {
                  y: { beginAtZero: true, title: { display: true, text: "Nombre de demandes" } },
                  x: { title: { display: true, text: "Statut de la demande" } },
                },
              }}
            />
          </div>

          <div className="bg-white shadow p-4 rounded-xl w-96 mx-auto mb-8" style={{ height: 320 }}>
            <Doughnut
              data={{
                labels: ["Total des jours de congé acquis", "Solde de congés restants"],
                datasets: [{ data: [18, totalJours], backgroundColor: ["#607D8B", "#3F51B5"] }],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "top" },
                  title: { display: true, text: "Bilan des congés : jours acquis et restants" },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.label}: ${context.parsed} jour${context.parsed > 1 ? "s" : ""}`,
                    },
                  },
                },
              }}
            />
          </div>
        </div>

      </main>
    </div>
  );
}
