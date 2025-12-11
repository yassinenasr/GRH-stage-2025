// Corrected and complete employeeT dashboard page
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AddNewEmployee, deleteEmployee } from "../../services/service";
import {
  FaUsers,
  FaCalendarAlt,
  FaChartBar,
  FaSignOutAlt,
  FaEnvelope,
} from "react-icons/fa";
import {
  getEmployees,
  getCongesByMatricule,
  getEvaluations,
  getDemandes,
  getDemandesCountByMatricule,

} from "../../services/service";
import { toast } from "react-toastify";
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
export default function EmployeeTDashboard() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [conges, setConges] = useState([]);
  const [matricule, setMatricule] = useState(null);
  const [evaluations, setEvaluations] = useState([]);
  const [demandes, setDemandes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logOut } = useAuth();
  const [formData, setFormData] = useState({
    matricule: '',
    nom: '',
    prenom: '',
    email: '',
    password: '',
    poste: '',
    grade: '',
    salaire: '',
    type: '',
  });
const handleSubmitEmployee = async (e) => {
  e.preventDefault();

  const {
    matricule,
    nom,
    prenom,
    email,
    password,
    poste,
    grade,
    salaire,
    type,
  } = formData;

  const employee = {
    matricule,
    nom,
    prenom,
    email,
    mot_de_passe: password,
    poste,
    grade,
    salaire: Number(salaire),
    type,
  };

  try {
    await AddNewEmployee(employee);
    toast.success("Employé ajouté avec succès !");
    closeModal();
    setFormData({
      matricule: '',
      nom: '',
      prenom: '',
      email: '',
      password: '',
      poste: '',
      grade: '',
      salaire: '',
      type: '',
    });

    const updatedEmployees = await getEmployees();
    setEmployees(updatedEmployees);
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'employé :", error);
    toast.error("Erreur lors de l'ajout de l'employé");
  }
};
const handleDeleteEmployee = async (id) => {
    try {
      await deleteEmployee(id); // calls imported service function
      await fetchData();
      alert("Évaluation supprimée !");
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nom || !formData.email || !formData.matricule || !formData.password) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const employeeData = {
      matricule: formData.matricule,
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      mot_de_passe: formData.password,
      poste: formData.poste,
      grade: formData.grade,
      salaire: Number(formData.salaire),
      type: formData.type,
    };

    try {
      await AddNewEmployee(employeeData);
      toast.success("Employé ajouté avec succès !");
      setIsModalOpen(false);
      setFormData({
        matricule: '',
        nom: '',
        prenom: '',
        email: '',
        password: '',
        poste: '',
        grade: '',
        salaire: '',
        type: '',
      });
      const updatedEmployees = await getEmployees();
      setEmployees(updatedEmployees);
    } catch (err) {
      console.error("Erreur lors de l'ajout de l'employé:", err);
      toast.error("Erreur lors de l'ajout de l'employé");
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
const fetchData = async () => {
  try {
    const employeesData = await getEmployees();
    setEmployees(employeesData);

    if (employeesData.length > 0) {
      const firstMatricule = employeesData[0].matricule;
      setMatricule(firstMatricule);
      const congesData = await getCongesByMatricule(firstMatricule);
      setConges(congesData);
      await getDemandesCountByMatricule(firstMatricule);
    }

    const evaluationsData = await getEvaluations();
    setEvaluations(evaluationsData);
    const demandesData = await getDemandes();
    setDemandes(demandesData);
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
};
  useEffect(() => {
    
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-6">Tableau de bord Responsable</h1>
        <nav className="flex flex-col gap-4">
          <button className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded" onClick={() => navigate("/dashboard/responsable")}> <FaUsers /> Mes Données </button>
          <button className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded" onClick={() => navigate("/dashboard/employeeT")}> <FaUsers /> Les employés </button>
          <button className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded" onClick={() => navigate("/dashboard/demandesTR")}> <FaCalendarAlt /> Demandes/Rapports </button>
          <button className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded" onClick={() => navigate("/dashboard/demandesR")}> <FaEnvelope /> Mes demandes </button>
          <button className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded" onClick={() => navigate("/dashboard/perfR")}> <FaChartBar /> Performance des employés </button>
        </nav>
        <div className="mt-auto pt-6">
          <button className="flex items-center gap-2 text-red-300 hover:text-red-500" onClick={() => handleLogout({ logOut })}> <FaSignOutAlt /> Déconnexion </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-6">
        <div className="p-4 bg-white rounded-xl shadow">
          <h1 className="text-2xl font-bold mb-4">Liste des employés</h1>
          <table className="w-full table-auto border mb-6">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th>Matricule</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Poste</th>
                <th>Grade</th>
                <th>Salaire</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-4">Chargement...</td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp.matricule} className="text-center border-t">
                    <td>{emp.matricule}</td>
                    <td>{emp.nom}</td>
                    <td>{emp.prenom}</td>
                    <td>{emp.email}</td>
                    <td>{emp.poste}</td>
                    <td>{emp.grade}</td>
                    <td>{emp.salaire}</td>
                    <td>{emp.type}</td>
                    <td>
                      <button className="rounded text-sm text-red-500" onClick={() => handleDeleteEmployee(emp.matricule)}>
                        Supprimer {emp.nom} {emp.prenom}
                      </button>
                    </td>
                  </tr>
                ))
              )}
              <tr className="text-center border-t">
                <td colSpan="9" className="py-4">
                  <div className="flex justify-center">
                    <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded text-sm" onClick={openModal}>
                      Ajouter un employé
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-blue-600 whitespace-nowrap">Ajouter un nouvel employé</h2>
                <button type="button" onClick={closeModal} className="text-gray-500 hover:text-red-500 text-xl">&times;</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Matricule" name="matricule" value={formData.matricule} onChange={handleChange} />
                <Input label="Nom" name="nom" value={formData.nom} onChange={handleChange} />
                <Input label="Prénom" name="prenom" value={formData.prenom} onChange={handleChange} />
                <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
                <Input label="Mot de passe" name="password" type="password" value={formData.password} onChange={handleChange} />
                <Input label="Poste" name="poste" value={formData.poste} onChange={handleChange} />
                <Input label="Grade" name="grade" value={formData.grade} onChange={handleChange} />
                <Input label="Salaire" name="salaire" type="number" value={formData.salaire} onChange={handleChange} />

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium">Type d'employé</label>
                  <select name="type" value={formData.type} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded">
                    <option value="">Sélectionner un type</option>
                    <option value="employee">Employé</option>
                    <option value="admin">Admin</option>
                    <option value="responsable">Responsable</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded" onClick={handleSubmitEmployee}>
                Ajouter
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

const Input = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 p-2 rounded"
      placeholder={label}
    />
  </div>
);