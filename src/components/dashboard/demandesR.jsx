import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaCalendarAlt,
  FaChartBar,
  FaSignOutAlt,
  FaEnvelope,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { getDemandesByMatricule, logout, addNewDemande } from "../../services/service";
import { useAuth } from "../../contexts/AuthenticateProvider";

export const handleLogout = async ({ logOut }) => {
  try {
    await logout();
    logOut();
    localStorage.removeItem("employeeId");
    localStorage.removeItem("matricule");
    window.location.href = "/home";
  } catch (error) {
    console.error("Logout failed", error);
  }
};

export default function DemandesR() {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  const location = useLocation();

  const [demandes, setDemandes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [typeDemande, setTypeDemande] = useState("congé");

  // Parse employeeId as number, null if invalid
  const [employeeId, setEmployeeId] = useState(() => {
    const id = localStorage.getItem("employeeId");
    return id && !isNaN(Number(id)) ? Number(id) : null;
  });

  const matricule = localStorage.getItem("matricule") || "";

  useEffect(() => {
    if (!employeeId) {
      toast.error("Utilisateur non connecté ou ID employé manquant");
      return;
    }

    const fetchDemandes = async () => {
      try {
        const data = await getDemandesByMatricule(matricule);

        setDemandes(data);
      } catch (error) {
        console.error("Erreur lors du chargement des demandes :", error);
        toast.error("Erreur lors du chargement des demandes");
      }
    };

    fetchDemandes();

    if (location.state?.submitted) {
      toast.success("Demande de congé soumise avec succès !");
    }
  }, [employeeId, location]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmitDemande = async (e) => {
    e.preventDefault();

    if (!employeeId) {
      toast.error("Utilisateur non connecté ou ID employé manquant");
      return;
    }

    if (!typeDemande) {
      toast.error("Veuillez sélectionner un type de demande");
      return;
    }

    try {
      const newDemande = {
        typeDemande,
        etat: "en attente",
        idEmployee: employeeId,
      };

      await addNewDemande(newDemande);

      toast.success("Demande soumise avec succès !");
      closeModal();

      // Refresh demandes list
      const updatedDemandes = await getDemandesByMatricule(employeeId);
      setDemandes(updatedDemandes);
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
      toast.error("Erreur lors de la soumission de la demande");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-6">Tableau de bord Responsable</h1>
        <nav className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/dashboard/responsable")}
            className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded"
          >
            <FaUsers /> Mes Données
          </button>
          <button
            onClick={() => navigate("/dashboard/employeeT")}
            className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded"
          >
            <FaUsers /> Les employés
          </button>
          <button
            onClick={() => navigate("/dashboard/demandesTR")}
            className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded"
          >
            <FaCalendarAlt /> Demandes/Rapports
          </button>
          <button
            onClick={() => navigate("/dashboard/demandesR")}
            className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded"
          >
            <FaEnvelope /> Mes demandes
          </button>
          <button
            onClick={() => navigate("/dashboard/perfR")}
            className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded"
          >
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
                  <td className="border px-4 py-2">{d.employee?.matricule || matricule}</td>
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
            onClick={openModal}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Demander
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                ✕
              </button>
              <h3 className="text-xl font-bold mb-4">Nouvelle demande</h3>
              <form onSubmit={handleSubmitDemande} className="flex flex-col gap-3">
                <label>
                  Matricule :
                  <input
                    type="text"
                    value={matricule}
                    className="border p-2 rounded w-full bg-gray-200 cursor-not-allowed"
                  />
                </label>

                <label>
                  Type de demande :
                  <select
                    value={typeDemande}
                    onChange={(e) => setTypeDemande(e.target.value)}
                    className="border p-2 rounded w-full"
                    required
                  >
                    <option value="congé">Congé</option>
                    <option value="augmentation de salaire">Augmentation de salaire</option>
                  </select>
                </label>
                

                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Soumettre
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
