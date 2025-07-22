import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUsers, FaCalendarAlt, FaChartBar, FaSignOutAlt, FaEnvelope } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { getDemandesByMatricule } from "../../services/service";
export default function Demandes() {
  const navigate = useNavigate();
  const location = useLocation();
  const [demandes, setDemandes] = useState([]);
  // Fake employee matricule - replace with actual user context or login
const employeeMatricule = localStorage.getItem("matricule");
useEffect(() => {
  const fetchData = async () => {
    try {
      const employeeMatricule = localStorage.getItem("matricule");
      const data = await getDemandesByMatricule(employeeMatricule);
      setDemandes(data);
    } catch (error) {
      console.error("Erreur lors du chargement des demandes :", error);
    }
  };

  fetchData();

  if (location.state?.submitted) {
    toast.success("Demande de congé soumise avec succès !");
  }
}, [location]);


  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-6">Tableau de bord Admin</h1>
        <nav className="flex flex-col gap-4">
          <button className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded" onClick={() => navigate("/dashboard/admin")}>
            <FaUsers /> Employés
          </button>
          <button className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded" onClick={() => navigate("/dashboard/demandesT")}>
            <FaCalendarAlt /> Demandes de congé et augmentations
          </button>
          <button className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded" onClick={() => navigate("/dashboard/demandes")}>
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

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4">Mes Demandes</h1>

        <table className="w-full mt-6 table-auto border-collapse border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2 text-center">#</th>
              <th className="border px-4 py-2">Matricule</th>
              <th className="border px-4 py-2">Type de demande</th>
              <th className="border px-4 py-2">Date de soumission</th>
              <th className="border px-4 py-2">État</th>
            </tr>
          </thead>
          <tbody>
            {demandes.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Aucune demande trouvée
                </td>
              </tr>
            ) : (
              demandes.map((d) => (
                <tr key={d.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2 text-center">{d.id}</td>
<td className="border px-4 py-2">{d.employee?.matricule}</td>
                  <td className="border px-4 py-2">{d.typeDemande}</td>
                  <td className="border px-4 py-2">
                    {new Date(d.dateSoumission).toLocaleDateString("fr-FR")}
                  </td>
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
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="mt-6">
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            onClick={() => navigate("/dashboard/congeform")}
          >
            Demander un congé
          </button>
        </div>
      </main>
    </div>
  );
}
