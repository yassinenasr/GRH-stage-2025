import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaCalendarAlt, FaChartBar, FaSignOutAlt, FaEnvelope } from "react-icons/fa";
import { getDemandes, getEvaluations, changeEtatDemande, logout, changeEtatDemandeN } from "../../services/service";
import { useAuth } from '../../contexts/AuthenticateProvider';

export const handleLogout = async ({ logOut }) => {
  try {
    await logout();
    logOut();
    window.location.href = "/home";
  } catch (error) {
    console.error("Logout failed", error);
  }
};

export default function DemandesT() {
  const navigate = useNavigate();
  const [demandes, setDemandes] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const { logOut } = useAuth();

  const fetchData = async () => {
    try {
      const demandesData = await getDemandes();
      setDemandes(demandesData.data || demandesData);

      const evaluationsData = await getEvaluations();
      setEvaluations(evaluationsData.data || evaluationsData);
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAccept = async (id) => {
    try {
      await changeEtatDemande(id);
      await fetchData();
      alert("Demande acceptée !");
    } catch (error) {
      console.error("Erreur lors de l'acceptation :", error);
    }
  };
  const handleRefus = async (id) => {
    try {
      await changeEtatDemandeN(id);
      await fetchData();
      alert("Demande refusée !");
    } catch (error) {
      console.error("Erreur lors de refus :", error);
    }
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-6">Tableau de bord Admin</h1>
        <nav className="flex flex-col gap-4">
          <button onClick={() => navigate("/dashboard/admin")} className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded">
            <FaUsers /> Employés
          </button>
          <button className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded">
            <FaCalendarAlt /> Demandes de congé et augmentations
          </button>
          <button onClick={() => navigate("/dashboard/demandes")} className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded">
            <FaEnvelope /> Mes demandes
          </button>
          <button className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded">
            <FaChartBar /> Performance des employés
          </button>
        </nav>
        <div className="mt-auto pt-6">
          <button onClick={() => handleLogout({ logOut })} className="flex items-center gap-2 text-red-300 hover:text-red-500">
            <FaSignOutAlt /> Déconnexion
          </button>
        </div>
      </aside>

      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Demandes de congé et augmentations</h1>

        <table className="w-full mt-6 table-auto border-collapse border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2 text-center">#</th>
              <th className="border px-4 py-2">Matricule</th>
              <th className="border px-4 py-2">Type de demande</th>
              <th className="border px-4 py-2">Date de soumission</th>
              <th className="border px-4 py-2">État</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {demandes.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">Aucune demande trouvée</td>
              </tr>
            ) : (
              demandes.map((d) => (
                <tr key={d.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2 text-center">{d.id}</td>
                  <td className="border px-4 py-2">{d.employee?.matricule || "N/A"}</td>
                  <td className="border px-4 py-2">{d.typeDemande || d.type || "N/A"}</td>
                  <td className="border px-4 py-2">{new Date(d.dateSoumission || d.date).toLocaleDateString("fr-FR")}</td>
                  <td className={`border px-4 py-2 font-semibold ${
                      d.etat === "accepté" ? "text-green-600" :
                      d.etat === "refusé" ? "text-red-600" :
                      "text-yellow-600"
                    }`}>
                    {d.etat || d.status || "En attente"}
                  </td>
                  <td className="border px-4 py-2 text-center space-x-2">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded text-sm"
                      onClick={() => handleAccept(d.id)}
                      disabled={d.etat === "accepté" || d.status === "accepté"}
                    >
                      Accepter
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-sm"
                      disabled={d.etat === "refusé" || d.status === "refusé"}
                      onClick={() => handleRefus(d.id)}
                      title="Fonction Refuser non implémentée"
                    >
                      Refuser
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <h1 className="text-2xl font-bold mb-4 mt-6">Rapports de performance</h1>

        <table className="w-full mt-6 table-auto border-collapse border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2 text-center">#</th>
              <th className="border px-4 py-2">Matricule</th>
              <th className="border px-4 py-2">Note</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Primes</th>
            </tr>
          </thead>
          <tbody>
            {evaluations.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">Aucun rapport trouvé</td>
              </tr>
            ) : (
              evaluations.map((e) => (
                <tr key={e.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2 text-center">{e.id}</td>
                  <td className="border px-4 py-2">{e.employee?.matricule || "N/A"}</td>
                  <td className="border px-4 py-2">{e.note}</td>
                  <td className="border px-4 py-2">{new Date(e.mois).toLocaleDateString("fr-FR")}</td>
                  <td className="border px-4 py-2">{e.primes}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}
