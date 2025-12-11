import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaCalendarAlt,
  FaChartBar,
  FaSignOutAlt,
  FaEnvelope,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import { getDemandesByMatricule, addNewDemande, logout } from "../../services/service";
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

export default function DemandesE() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [demandes, setDemandes] = useState([]);
  const [formData, setFormData] = useState({
    typeDemande: "congé",
    dateSoumission: new Date().toISOString().slice(0, 10),
  });

  const navigate = useNavigate();
  const { logOut } = useAuth();
  const location = useLocation();
  const employeeMatricule = localStorage.getItem("matricule");
  const idEmployee = localStorage.getItem("idEmployee"); // must be stored at login

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fetchData = async () => {
    try {
      const data = await getDemandesByMatricule(employeeMatricule);
      setDemandes(data);
    } catch (error) {
      console.error("Erreur lors du chargement des demandes :", error);
    }
  };

  useEffect(() => {
    fetchData();

    if (location.state?.submitted) {
      toast.success("Demande de congé soumise avec succès !");
    }
  }, [location]);

  const handleFormChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const demandePayload = {
      typeDemande: formData.typeDemande,
      etat: "en attente",
      idEmployee,
    };

    try {
      await addNewDemande(demandePayload);
      toast.success("Demande ajoutée avec succès !");
      closeModal();
      fetchData(); // refresh demandes
    } catch (error) {
      toast.error("Échec de l'ajout de la demande");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-6">Tableau de bord Employé</h1>
        <nav className="flex flex-col gap-4">
          <button
            className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded"
            onClick={() => navigate("/dashboard/employee")}
          >
            <FaUsers /> Profile Employé
          </button>
          <button
            className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded"
            onClick={() => navigate("/dashboard/demandesE")}
          >
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
            onClick={openModal}
          >
            Demander un congé
          </button>
        </div>

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
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                 <label>
    Matricule :
    <input
      type="text"
      value={employeeMatricule}
      readOnly
      className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed"
    />
  </label>
                <label>
                  Type de demande :
                  <select
                    name="typeDemande"
                    className="border p-2 rounded w-full"
                    value={formData.typeDemande}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="congé">Congé</option>
                    <option value="augmentation de salaire">Augmentation de salaire</option>
                  </select>
                </label>

                <label>
                  Date de soumission :
                  <input
                    type="month"
                    name="dateSoumission"
                    className="border p-2 rounded w-full"
                    value={formData.dateSoumission.slice(0, 7)}
                    onChange={handleFormChange}
                    required
                  />
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
