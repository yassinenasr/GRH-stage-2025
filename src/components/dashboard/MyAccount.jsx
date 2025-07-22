import React, { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaUserTag,
  FaBuilding,
  FaCalendar,
} from "react-icons/fa";
import { getEmployees } from "../../services/service";

export default function MyAccount() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Récupérer matricule depuis localStorage (connecté)
  const matricule = localStorage.getItem("matricule");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des employés :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  // Trouver l'employé connecté
  const selectedEmployee = employees.find(emp => emp.matricule === matricule);

  if (loading) return <p>Chargement...</p>;
  if (!selectedEmployee) return <p>Employé non trouvé.</p>;

  // Extraire les infos pour affichage
  const fullName = `${selectedEmployee.nom} ${selectedEmployee.prenom}`;
  const firstName = selectedEmployee.prenom || "";
  const role = selectedEmployee.type || "N/A";
  const email = selectedEmployee.email || "N/A";
  const phone = selectedEmployee.matricule || "N/A";
  const department = selectedEmployee.poste || "N/A";
  const joinDate = selectedEmployee.grade || "N/A";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-4xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Avatar & Name */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-5xl font-bold text-blue-600 mb-4">
            {firstName.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{fullName}</h2>
          <p className="text-sm text-gray-500 capitalize">{role}</p>
        </div>

        {/* Info section */}
        <div className="flex flex-col justify-center space-y-4 " >
          <InfoRow icon={<FaEnvelope />} label="Email " value={email} />
          <InfoRow icon={<FaPhone />} label="Matricule" value={phone} />
          <InfoRow icon={<FaUserTag />} label="Rôle" value={role.toUpperCase()} />
          <InfoRow icon={<FaBuilding />} label="Département" value={department.toUpperCase()} />
          <InfoRow icon={<FaCalendar />} label="Grade" value={joinDate} />
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex justify-center gap-4 mt-6 w-full font-bold">
  Proud to have {selectedEmployee.nom} {selectedEmployee.prenom} as part of our team!
</div>

      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center space-x-3 text-gray-700">
      <div className="text-blue-500 text-xl">{icon}</div>
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-base">{value}</p>
      </div>
    </div>
  );
}
