import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaCalendarAlt, FaChartBar, FaSignOutAlt, FaEnvelope } from "react-icons/fa";
import { getDemandes, getEvaluations } from "../../services/service";
async function ChangeY(etat, index) {
  // copier tableau (immutabilité)
  const newDemandes = [...demandes];

  // modifier l’état de la demande ciblée
  if (newDemandes[index].etat === "en attente") {
    newDemandes[index].etat = "accepté";
  }

  // mettre à jour le state (cela déclenchera un rerender)
  setDemandes(newDemandes);

   try {
    await axios.put(`/api/demandes/${id}`, { etat: "accepté" });
    console.log("Mise à jour en base réussie");
  } catch (error) {
    console.error("Erreur mise à jour base :", error);
  }
}
export default function DemandesT() {
  const navigate = useNavigate();
  const [demandes, setDemandes] = useState([]);
  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const demandesData = await getDemandes();
        console.log("Demandes récupérées :", demandesData);
        setDemandes(demandesData.data || demandesData);

        const evaluationsData = await getEvaluations(); // Note the ()
        console.log("Evaluations récupérées :", evaluationsData);
        setEvaluations(evaluationsData.data || evaluationsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des demandes ou évaluations :", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-6">Tableau de bord Admin</h1>
        <nav className="flex flex-col gap-4">
          <button
            className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded"
            onClick={() => navigate("/dashboard/admin")}
          >
            <FaUsers /> Employés
          </button>
          <button className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded">
            <FaCalendarAlt /> Demandes de congé et augmentations
          </button>
          <button
            className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded"
            onClick={() => navigate("/dashboard/demandes")}
          >
            <FaEnvelope /> Mes demandes
          </button>
          <button className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded">
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
                <td colSpan="6" className="text-center py-4">
                  Aucune demande trouvée
                </td>
              </tr>
            ) : (
              demandes.map((d) => (
                <tr key={d.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2 text-center">{d.id}</td>
                  <td className="border px-4 py-2">{d.employee?.matricule}</td>
                  <td className="border px-4 py-2">{d.typeDemande}</td>
                  <td className="border px-4 py-2">{new Date(d.dateSoumission).toLocaleDateString("fr-FR")}</td>
                  <td
                    className={`border px-4 py-2 font-semibold ${
                      d.etat === "accepté"
                        ? "text-green-600"
                        : d.etat === "refusé"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {d.etat}
                  </td>
                  <td className="border px-4 py-2 text-center space-x-2">
                    
                    <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded text-sm"  onClick={() => ChangeY(d.etat, i)}
>
                      Accepter
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-sm">
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
              <th className="border px-4 py-2">Date de soumission</th>
              <th className="border px-4 py-2">Primes</th>
            </tr>
          </thead>
          <tbody>
            {evaluations.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Aucun rapport trouvé
                </td>
              </tr>
            ) : (
              evaluations.map((e) => (
                <tr key={e.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2 text-center">{e.id}</td>
                  <td className="border px-4 py-2">{e.employee?.matricule}</td>
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
