import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaUsers, FaEnvelope, FaSignOutAlt , FaCalendarAlt, FaChartBar, FaFileAlt
 } from 'react-icons/fa';
import { addNewDemande  } from '../../services/service';
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
const Aform = () => {
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
      await addNewDemande (data);
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
               <button className="flex items-center gap-2 text-red-300 hover:text-red-500"  onClick={() => handleLogout({ logOut })}>
                 <FaSignOutAlt /> Déconnexion
               </button>
             </div>
           </aside>

      <main className="flex-1 bg-gray-100 p-6 flex justify-center items-center">
        <form onSubmit={handleSubmit} className="p-4 max-w-3xl bg-white rounded shadow space-y-4">
          <h2 className="text-2xl font-bold mb-4">Ajouter un nouveau employé</h2>
                      <input type="text" name="matricule" placeholder="Matricule" value={formData.matricule} onChange={handleChange} className="w-full border p-2" />

          <input type="text" name="employeeName" placeholder="Nom " value={formData.employeeName} onChange={handleChange} className="w-full border p-2" />
        <input type="text" name="employeeName" placeholder="Prénom" value={formData.employeeName} onChange={handleChange} className="w-full border p-2" />
        <input type="email" name="employeeName" placeholder="Email" value={formData.employeeName} onChange={handleChange} className="w-full border p-2" />
        <input type="password" name="employeeName" placeholder="Mot de passe" value={formData.employeeName} onChange={handleChange} className="w-full border p-2" />
                <input type="text" name="employeeName" placeholder="Poste" value={formData.employeeName} onChange={handleChange} className="w-full border p-2" />
                <input type="text" name="employeeName" placeholder="Grade" value={formData.employeeName} onChange={handleChange} className="w-full border p-2" />
                <input type="number" name="employeeName" placeholder="Salaire" value={formData.employeeName} onChange={handleChange} className="w-full border p-2" />

          <select name="typeDemande" value={formData.typeDemande} onChange={handleChange} className="w-full border p-2">
            <option value="">Type d'employé </option>
            <option value="conge">employee</option>
            <option value="aug">admin</option>
                        <option value="aug">responsable</option>
          </select>


          

          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded w-full border p-2"onClick={
            () => {
                toast.success("Employé ajouté avec succès !");}
          }>Ajouter</button>
        </form>
      </main>
    </div>
  );
};

export default Aform;
