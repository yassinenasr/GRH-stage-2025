import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaUsers, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';
import { addNewDemande } from '../../services/service';
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
const CongeFormE = () => {
  const navigate = useNavigate();
        const { logOut } = useAuth(); // ✅ this is needed for logout to work
  
  const [formData, setFormData] = useState({
    employeeName: '',
    matricule: '',
    typeDemande: '',
    startDate: '',
    endDate: '',
    totalDays: '',
    leaveType: [],
    otherLeaveType: '',
    leaveReason: '',
    remarks: '',
    submissionDate: new Date().toISOString().split('T')[0],
    approvedCheck: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'leaveType') {
      const updatedTypes = checked
        ? [...formData.leaveType, value]
        : formData.leaveType.filter((item) => item !== value);
      setFormData({ ...formData, leaveType: updatedTypes });
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const SubmitDemande = async () => {
    const data = {
      employeeName: formData.employeeName,
      matricule: formData.matricule,
      typeDemande: formData.typeDemande,
      submissionDate: formData.submissionDate,
    };
    try {
      await addDemande(data);
      console.log("Demande enregistrée : ", data);
    } catch (error) {
      console.error("Erreur ajout demande : ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.approvedCheck) {
      toast.error("Veuillez cocher la case d'approbation");
      return;
    }

    try {
      await SubmitDemande();
      toast.success("Demande enregistrée avec succès !");
      navigate("/dashboard/demandesE");
    } catch (err) {
      toast.error("Erreur lors de la soumission !");
    }
  };

  return (
    <div className="min-h-screen flex">
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
          <button className="flex items-center gap-2 text-red-300 hover:text-red-500" onClick={() => handleLogout({ logOut })}>
            <FaSignOutAlt /> Déconnexion
          </button>
        </div>
      </aside>

      <main className="flex-1 bg-gray-100 p-6 flex justify-center items-center">
        <form onSubmit={handleSubmit} className="p-4 max-w-3xl bg-white rounded shadow space-y-4">
          <h2 className="text-2xl font-bold mb-4">Formulaire de demande</h2>

          <input type="text" name="employeeName" placeholder="Nom de l'employé" value={formData.employeeName} onChange={handleChange} className="w-full border p-2" />

          <input type="text" name="matricule" placeholder="Matricule" value={formData.matricule} onChange={handleChange} className="w-full border p-2" />

          <select name="typeDemande" value={formData.typeDemande} onChange={handleChange} className="w-full border p-2">
            <option value="">Type de Demande</option>
            <option value="conge">Congé</option>
            <option value="aug">Augmentation de salaire</option>
          </select>

          <input type="date" name="submissionDate" value={formData.submissionDate} className="w-full border p-2" readOnly />

          <label className="flex gap-2">
            <input type="checkbox" name="approvedCheck" checked={formData.approvedCheck} onChange={handleChange} />
            J’accepte que cette demande soit soumise.
          </label>

          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Soumettre</button>
        </form>
      </main>
    </div>
  );
};

export default CongeFormE;
