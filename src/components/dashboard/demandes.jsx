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
import {
  getDemandesByMatricule,
  logout,
  
} from "../../services/service";
import { useAuth } from "../../contexts/AuthenticateProvider";

export const handleLogout = async ({ logOut }) => {
  try {
    await logout(); // backend logout
    logOut(); // clear local state/context
    window.location.href = "/home"; // full page reload
  } catch (error) {
    console.error("Logout failed", error);
  }
};

export default function Demandes() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logOut } = useAuth();

  const [formData, setFormData] = useState({
    employeeName: "",
    startDate: "",
    endDate: "",
    totalDays: "",
    leaveType: [],
    otherLeaveType: "",
    leaveReason: "",
    remarks: "",
    submissionDate: new Date().toISOString().split("T")[0],
    approvedCheck: false,
  });

  const [demandes, setDemandes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "leaveType") {
      const updatedTypes = checked
        ? [...formData.leaveType, value]
        : formData.leaveType.filter((item) => item !== value);
      setFormData({ ...formData, leaveType: updatedTypes });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchData = async () => {
    try {
      const employeeMatricule = localStorage.getItem("matricule");
      const data = await getDemandesByMatricule(employeeMatricule);
      setDemandes(data);
    } catch (error) {
      console.error("Erreur lors du chargement des demandes :", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.approvedCheck) {
      toast.error("Veuillez cocher la case d'approbation");
      return;
    }

    try {
      await addCongeDemande(formData);
      toast.success("Demande de congé soumise avec succès !");
      closeModal();
      setFormData({
        employeeName: "",
        startDate: "",
        endDate: "",
        totalDays: "",
        leaveType: [],
        otherLeaveType: "",
        leaveReason: "",
        remarks: "",
        submissionDate: new Date().toISOString().split("T")[0],
        approvedCheck: false,
      });
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la soumission !");
    }
  };

  useEffect(() => {
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
          <button
            className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded"
            onClick={() => navigate("/dashboard/admin")}
          >
            <FaUsers /> Employés
          </button>
          <button
            className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded"
            onClick={() => navigate("/dashboard/demandesT")}
          >
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

        <div className="overflow-x-auto">
          <table className="w-full mt-6 table-auto border-collapse border border-gray-300 rounded-md shadow-md">
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
                    <td className="border px-4 py-2">
                      {d.employee?.matricule}
                    </td>
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
        </div>

        <div className="mt-6">
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            onClick={openModal}
          >
            Demander un congé
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-3xl">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
                onClick={closeModal}
              >
                ×
              </button>
              <h2 className="text-2xl font-bold mb-4">
                Formulaire de demande de congé
              </h2>
              <form
                onSubmit={handleSubmit}
                className="space-y-4 max-h-[80vh] overflow-y-auto"
              >
                <input
                  type="text"
                  name="employeeName"
                  placeholder="Nom de l'employé"
                  value={formData.employeeName}
                  onChange={handleChange}
                  className="w-full border p-2"
                />

                <div className="flex gap-4">
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full border p-2"
                  />
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full border p-2"
                  />
                </div>

                <input
                  type="number"
                  name="totalDays"
                  placeholder="Nombre total de jours"
                  value={formData.totalDays}
                  onChange={handleChange}
                  className="w-full border p-2"
                />

                <div>
                  <label>Type de congé :</label>
                  {["Exceptionnel", "Maternité", "Maladie", "Autre"].map(
                    (type) => (
                      <label key={type} className="block">
                        <input
                          type="checkbox"
                          name="leaveType"
                          value={type}
                          checked={formData.leaveType.includes(type)}
                          onChange={handleChange}
                        />{" "}
                        {type}
                      </label>
                    )
                  )}
                  {formData.leaveType.includes("Autre") && (
                    <input
                      type="text"
                      name="otherLeaveType"
                      placeholder="Précisez"
                      value={formData.otherLeaveType}
                      onChange={handleChange}
                      className="w-full border p-2 mt-2"
                    />
                  )}
                </div>

                <textarea
                  name="leaveReason"
                  placeholder="Motif du congé"
                  value={formData.leaveReason}
                  onChange={handleChange}
                  className="w-full border p-2"
                />
                <textarea
                  name="remarks"
                  placeholder="Remarques"
                  value={formData.remarks}
                  onChange={handleChange}
                  className="w-full border p-2"
                />

                <label className="block">
                  <input
                    type="checkbox"
                    name="approvedCheck"
                    checked={formData.approvedCheck}
                    onChange={handleChange}
                  />{" "}
                  <strong>
                    Je comprends que cette demande est soumise à approbation.
                  </strong>
                </label>

                <input
                  type="hidden"
                  name="submissionDate"
                  value={formData.submissionDate}
                />

                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded"
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
