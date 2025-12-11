import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaCalendarAlt,
  FaChartBar,
  FaSignOutAlt,
  FaEnvelope,
} from "react-icons/fa";
import {
  getDemandes,
  getEvaluations,
  changeEtatDemande,
  changeEtatDemandeN,
  deleteEvaluation,
  modifyEvaluation,
  logout,
} from "../../services/service";
import { useAuth } from "../../contexts/AuthenticateProvider";

export const handleLogout = async ({ logOut }) => {
  try {
    await logout();
    logOut();
    window.location.href = "/home";
  } catch (error) {
    console.error("Logout failed", error);
  }
};

export default function DemandesTR() {
  const navigate = useNavigate();
  const [demandes, setDemandes] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const { logOut } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [note, setNote] = useState("");
  const [mois, setMois] = useState("");
  const [primes, setPrimes] = useState("");
  const [matricule, setMatricule] = useState("");
  const [selectedEvalId, setSelectedEvalId] = useState(null);

  const fetchData = async () => {
    try {
      const demandesData = await getDemandes();
      setDemandes(demandesData.data || demandesData);

      const evaluationsData = await getEvaluations();
      setEvaluations(evaluationsData.data || evaluationsData);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
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
      console.error("Erreur lors du refus :", error);
    }
  };

  const handleDeleteEvaluation = async (id) => {
    try {
      await deleteEvaluation(id);
      await fetchData();
      alert("Évaluation supprimée !");
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const openModal = (evaluation) => {
    setNote(evaluation.note);
    setMois(evaluation.mois?.slice(0, 7)); // pour input type="month"
    setPrimes(evaluation.primes);
    setMatricule(evaluation.employee?.matricule);
    setSelectedEvalId(evaluation.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNote("");
    setMois("");
    setPrimes("");
    setMatricule("");
    setSelectedEvalId(null);
  };

  const ModifyEvaluation = async (e) => {
    e.preventDefault();

    if (!selectedEvalId) {
      alert("ID de l'évaluation introuvable.");
      return;
    }

    try {
      const updatedEvaluation = {
        id: selectedEvalId,
        note,
        mois,
        primes,
        employee: { matricule },
      };

      await modifyEvaluation(updatedEvaluation);
      alert("Évaluation modifiée avec succès !");
      closeModal();
      await fetchData();
    } catch (error) {
      console.error("Erreur lors de la modification de l'évaluation :", error);
      alert("Erreur lors de la modification.");
    }
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-6">Tableau de bord Responsable</h1>
        <nav className="flex flex-col gap-4">
          <button onClick={() => navigate("/dashboard/responsable")} className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded"><FaUsers /> Mes Données</button>
          <button onClick={() => navigate("/dashboard/employeeT")} className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded"><FaUsers /> Les employés</button>
          <button onClick={() => navigate("/dashboard/demandesTR")} className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded"><FaCalendarAlt /> Demandes/Rapports</button>
          <button onClick={() => navigate("/dashboard/demandesR")} className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded"><FaEnvelope /> Mes demandes</button>
          <button onClick={() => navigate("/dashboard/perfR")} className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded"><FaChartBar /> Performance des employés</button>
        </nav>
        <div className="mt-auto pt-6">
          <button onClick={() => handleLogout({ logOut })} className="flex items-center gap-2 text-red-300 hover:text-red-500"><FaSignOutAlt /> Déconnexion</button>
        </div>
      </aside>

      <main className="flex-1 bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4">Demandes de congé et augmentations</h1>
        {/* Tableau des demandes */}
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
              <tr><td colSpan="6" className="text-center py-4">Aucune demande trouvée</td></tr>
            ) : (
              demandes.map((d) => (
                <tr key={d.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2 text-center">{d.id}</td>
                  <td className="border px-4 py-2">{d.employee?.matricule}</td>
                  <td className="border px-4 py-2">{d.typeDemande}</td>
                  <td className="border px-4 py-2">{new Date(d.dateSoumission).toLocaleDateString("fr-FR")}</td>
                  <td className={`border px-4 py-2 font-semibold ${
                    d.etat === "accepté"
                      ? "text-green-600"
                      : d.etat === "refusé"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}>{d.etat}</td>
                  <td className="border px-4 py-2 text-center space-x-2">
                    <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded text-sm" onClick={() => handleAccept(d.id)} disabled={d.etat === "accepté"}>Accepter</button>
                    <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-sm" onClick={() => handleRefus(d.id)} disabled={d.etat === "refusé"}>Refuser</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <h1 className="text-2xl font-bold mb-4 mt-6">Rapports de performance</h1>
        {/* Tableau des évaluations */}
        <table className="w-full mt-6 table-auto border-collapse border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2 text-center">#</th>
              <th className="border px-4 py-2">Matricule</th>
              <th className="border px-4 py-2">Note</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Primes</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {evaluations.length === 0 ? (
              <tr><td colSpan="6" className="text-center py-4">Aucun rapport trouvé</td></tr>
            ) : (
              evaluations.map((e) => (
                <tr key={e.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2 text-center">{e.id}</td>
                  <td className="border px-4 py-2">{e.employee?.matricule}</td>
                  <td className="border px-4 py-2">{e.note}</td>
                  <td className="border px-4 py-2">{new Date(e.mois).toLocaleDateString("fr-FR")}</td>
                  <td className="border px-4 py-2">{e.primes}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded text-sm" onClick={() => openModal(e)}>Modifier</button>
                    <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-sm" onClick={() => handleDeleteEvaluation(e.id)}>Supprimer</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Modal pour modification */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
              <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">✕</button>
              <h3 className="text-xl font-bold mb-4">Modifier l’évaluation</h3>
              <form className="flex flex-col gap-3" onSubmit={ModifyEvaluation}>
                <label>
                  Matricule :
                  <input type="text" value={matricule} onChange={(e) => setMatricule(e.target.value)} required className="border p-2 rounded w-full" />
                </label>
                <label>
                  Note :
                  <input type="number" min="0" max="20" value={note} onChange={(e) => setNote(e.target.value)} required className="border p-2 rounded w-full" />
                </label>
                <label>
                  Prime :
                  <input type="number" min="0" value={primes} onChange={(e) => setPrimes(e.target.value)} required className="border p-2 rounded w-full" />
                </label>
                <label>
                  Mois :
                  <input type="month" value={mois} onChange={(e) => setMois(e.target.value)} required className="border p-2 rounded w-full" />
                </label>
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Modifier</button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
