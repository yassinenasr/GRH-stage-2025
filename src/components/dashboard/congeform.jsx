import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaUsers, FaCalendarAlt, FaChartBar, FaSignOutAlt, FaEnvelope } from 'react-icons/fa';
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
const CongeForm = () => {
  const navigate = useNavigate();
      const { logOut } = useAuth(); // ✅ this is needed for logout to work
  
  const [formData, setFormData] = useState({
    employeeName: '',
    departmentAndPosition: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.approvedCheck) {
      toast.error("Veuillez cocher la case d'approbation");
      return;
    }

    try {
      await addCongeDemande(formData);
      toast.success("Demande de congé soumise avec succès !");
      navigate("/dashboard/demandes");
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la soumission !");
    }
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-6">Tableau de bord Admin</h1>
        <nav className="flex flex-col gap-4">
          <button className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded" onClick={() => navigate("/dashboard/admin")}><FaUsers /> Employés</button>
          <button className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded"><FaCalendarAlt /> Demandes de congé</button>
          <button className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded" onClick={() => navigate("/dashboard/demandes")}><FaEnvelope /> Mes demandes</button>
          <button className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded"><FaChartBar /> Performance des employés</button>
        </nav>
        <div className="mt-auto pt-6">
          <button className="flex items-center gap-2 text-red-300 hover:text-red-500"   onClick={() => handleLogout({ logOut })} ><FaSignOutAlt /> Déconnexion</button>
        </div>
      </aside>

      <main className="flex-1 bg-gray-100 p-6">
        <h2 className="text-2xl font-bold mb-4">Formulaire de demande de congé</h2>
        <form onSubmit={handleSubmit} className="p-4 max-w-3xl bg-white rounded shadow space-y-4">
          <input type="text" name="employeeName" placeholder="Nom de l'employé" value={formData.employeeName} onChange={handleChange} className="w-full border p-2" />
          <input type="text" name="departmentAndPosition" placeholder="Matricule" value={formData.departmentAndPosition} onChange={handleChange} className="w-full border p-2" />

          <div className="flex gap-4">
            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full border p-2" />
            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full border p-2" />
          </div>

          <input type="number" name="totalDays" placeholder="Nombre total de jours" value={formData.totalDays} onChange={handleChange} className="w-full border p-2" />

          <div>
            <label>Type de congé :</label>
            {["Exceptionnel", "Maternité", "Maladie", "Autre"].map((type) => (
              <label key={type} className="block">
                <input
                  type="checkbox"
                  name="leaveType"
                  value={type}
                  checked={formData.leaveType.includes(type)}
                  onChange={handleChange}
                /> {type}
              </label>
            ))}
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

          <textarea name="leaveReason" placeholder="Motif du congé" value={formData.leaveReason} onChange={handleChange} className="w-full border p-2" />
          <textarea name="remarks" placeholder="Remarques" value={formData.remarks} onChange={handleChange} className="w-full border p-2" />

          <label>
            <input type="checkbox" name="approvedCheck" checked={formData.approvedCheck} onChange={handleChange} />
            {' '} <strong>Je comprends que cette demande est soumise à approbation.</strong>
          </label>

          <input type="date" name="submissionDate" value={formData.submissionDate} onChange={handleChange} className="w-full border p-2" readOnly />

          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Soumettre</button>
        </form>
        
      </main>
    </div>
  );
};

export default CongeForm;
