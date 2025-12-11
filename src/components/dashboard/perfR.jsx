import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaCalendarAlt, FaChartBar, FaSignOutAlt, FaEnvelope } from "react-icons/fa";
import { Doughnut, Bar } from "react-chartjs-2";
import { getEmployees, getCongesByMatricule } from "../../services/service"; 
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
import { addNewEvaluation } from "../../services/service"; // à adapter selon ton chemin


import { toast } from 'react-hot-toast';
export const handleLogout = async ({ logOut }) => {
  try {
    await logout();     // backend logout
    logOut();           // clear local state/context
    window.location.href = "/home"; // full page reload
  } catch (error) {
    console.error("Logout failed", error);
  }
};
export default function PerfRDashboard() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [conges, setConges] = useState([]);
  const [matricule, setMatricule] = useState(null);
const [rating, setRating] = useState("");
const [comment, setComment] = useState("");
const [isModalOpen, setIsModalOpen] = useState(false);
const [note, setNote] = useState("");
const [mois, setMois] = useState("");
const [primes, setPrimes] = useState("");
const { logOut } = useAuth(); // ✅ this is needed for logout to work
const openModal = () => {
  setIsModalOpen(true);
};

const closeModal = () => {
  setIsModalOpen(false);
};
const handleSubmitEvaluation = async (e) => {
  e.preventDefault();
  const evaluation = {
    matricule,
    note: parseFloat(note),
    mois,
    primes: parseFloat(primes),
  };

  try {
    await addNewEvaluation(evaluation);
    toast.success("Évaluation envoyée avec succès !");
    console.log("Évaluation envoyée avec succès !");
    closeModal();
    setNote("");
    setMois("");
    setPrimes("");
    setMatricule("");
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'évaluation :", error);
    toast.error("Erreur lors de l'envoi de l'évaluation");
  }
};

  const rest = conges.length > 0
    ? conges.reduce((total, c) => total + c.nbjour, 0)
    : 0;

  const selectedEmployee = employees.find(emp => emp.matricule === matricule);

  // Load employees list
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
        if (data.length > 0) {
          setMatricule(data[0].matricule); // initial selection
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des employés :", error);
      }
    };
    fetchEmployees();
  }, []);

  // Load congés for selected matricule
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
                <button className="flex items-center gap-2 text-red-300 hover:text-red-500" onClick={() => handleLogout({ logOut })}>
                  <FaSignOutAlt /> Déconnexion
                </button>
              </div>
            </aside>

      <main className="flex-1 bg-gray-100 p-6">

        <h2 className="text-3xl font-semibold mb-6">Bienvenue, Admin</h2>

        {/* Employee selector */}
        <label htmlFor="selectEmp" className="block font-medium mb-2">
          Choisir un employé :
        </label>
        <select
          id="selectEmp"
          value={matricule || ""}
          onChange={e => setMatricule(e.target.value)}
          className="border rounded p-2 mb-6"
        >
          {employees.map(emp => (
            <option key={emp.matricule} value={emp.matricule}>
              {emp.nom} {emp.prenom} ({emp.matricule})
            </option>
          ))}
        </select>

        {/* Employee info cards */}
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
              <h3 className="text-xl font-medium">Nombre total de demandes  :</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">{employees.length}</p>
            </div>
            <div className="bg-white shadow p-4 rounded-xl">
              <h3 className="text-xl font-medium">Jours de congé restants :</h3>
              <p className="text-3xl font-bold text-orange-500 mt-2">
                {conges.length > 0 ? conges.reduce((total, c) => total + c.nbjour, 0) : "0"}
              </p>
            </div>
            <div className="bg-white shadow p-6 rounded-xl">
  <h3 className="text-xl font-semibold text-gray-800">Évaluation de l'employé :</h3>
  
  <div className="mt-4">
    <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-200" onClick={ openModal }>
      Noter l’employé
    </button>
  </div>
</div>

          </div>
        ) : (
          <p>Chargement des informations de l'employé...</p>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

  <div
    className="dataCard categoryCard bg-white shadow p-4 rounded-xl w-96 mx-auto mb-8"
    style={{ height: 320 }}
  >
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
        maintainAspectRatio: false, // important ici aussi
        plugins: {
          legend: { position: "top" },
          title: { display: true, text: "Statistiques des demandes" },
        },
      }}
      style={{ width: "100%", height: "100%" }}
    />
  </div>

  <div
    className="dataCard categoryCard bg-white shadow p-4 rounded-xl w-96 mx-auto mb-8"
    style={{ height: 320 }}
  >
    <Bar
      data={{
        labels: ["Accepté", "En attente", "Refusé"],
        datasets: [
          {
            label: "Nombre de demandes",
            data: [20, 5, 3],
            backgroundColor: [
              "rgba(54, 162, 235, 0.7)",
              "rgba(255, 206, 86, 0.7)",
              "rgba(255, 99, 132, 0.7)",
            ],
            borderColor: [
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(255, 99, 132, 1)",
            ],
            borderWidth: 1,
            borderRadius: 5,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "top" },
          title: {
            display: true,
            text: "Répartition des demandes selon leur statut",
            font: { size: 18, weight: "bold" },
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: (context) =>
                `${context.parsed.y} demande${context.parsed.y > 1 ? "s" : ""}`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1 },
            title: { display: true, text: "Nombre de demandes" },
          },
          x: {
            title: { display: true, text: "Statut de la demande" },
          },
        },
      }}
      style={{ width: "100%", height: "100%" }}
    />
  </div>

  <div
    className="dataCard categoryCard bg-white shadow p-4 rounded-xl w-96 mx-auto mb-8"
    style={{ height: 320 }}
  >
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
        plugins: {
          legend: { position: "top" },
          title: {
            display: true,
            text: "Bilan des congés : jours acquis et jours restants",
            font: { size: 16, weight: "bold" },
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: (context) => {
                const label = context.label || "";
                const value = context.parsed || 0;
                return `${label}: ${value} jour${value > 1 ? "s" : ""}`;
              },
            },
          },
        },
      }}
      style={{ width: "100%", height: "100%" }}
    />
  </div>

</div>
<main className="flex-1 bg-gray-100 p-6">
  {/* ... ton code existant des cartes et graphiques ... */}

  {/* Ici on place le Modal */}
  {isModalOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={closeModal}
        >
          ✕
        </button>
        <h3 className="text-xl font-bold mb-4">Évaluer l’employé</h3>
        <form onSubmit={handleSubmitEvaluation} className="flex flex-col gap-3">
          <label>
    Matricule :
    <input
      type="text"
      value={matricule}
      onChange={(e) => setMatricule(e.target.value)}
      required
      className="border p-2 rounded w-full"
    />
  </label>
  <label>
    Note :
    <input
      type="number"
      min="0"
      max="20"
      value={note}
      onChange={(e) => setNote(e.target.value)}
      required
      className="border p-2 rounded w-full"
    />
  </label>
  <label>
    Prime :
    <input
      type="number"
      min="0"
      value={primes}
      onChange={(e) => setPrimes(e.target.value)}
      required
      className="border p-2 rounded w-full"
    />
  </label>
  <label>
    Mois :
    <input
      type="month"
      value={mois}
      onChange={(e) => setMois(e.target.value)}
      required
      className="border p-2 rounded w-full"
    />
  </label>
  <button
    type="submit"
    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
    onClick={handleSubmitEvaluation}
  >
    Soumettre
  </button>
</form>

      </div>
    </div>
  )}

</main>   {/* ← Fermeture du main */}


      </main>
    </div>
  );
  
}
