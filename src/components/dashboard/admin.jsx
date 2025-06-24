import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const employees = [
  {
    matricule: 1,
    nom: "Doe",
    prenom: "John",
    email: "johndoe@gmail.com",
    motdepasse: "grh123",
    poste: "web dev",
    grade: "A1",
    salaire: 5000,
    type: "Employee",
    note: 17,
  },
  {
    matricule: 2,
    nom: "Smith",
    prenom: "Jane",
    email: "janesmith@gmail.com",
    motdepasse: "grh123",
    poste: "web dev",
    grade: "A1",
    salaire: 5000,
    type: "Admin",
    note: 19,
  },
  {
    matricule: 3,
    nom: "Brown",
    prenom: "Mike",
    email: "brwonmike@gmail.com",
    motdepasse: "grh123",
    poste: "web dev",
    grade: "A1",
    salaire: 5000,
    type: "Responsable",
    note: 18,
  },
];

export default function AdminDashboard() {
  const barData = {
    labels: employees.map((e) => e.prenom + " " + e.nom),
    datasets: [
      {
        label: "Notes",
        data: employees.map((e) => e.note),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const pieData = {
    labels: ["Admin", "Responsable", "Employee"],
    datasets: [
      {
        data: [
          employees.filter((e) => e.type === "Admin").length,
          employees.filter((e) => e.type === "Responsable").length,
          employees.filter((e) => e.type === "Employee").length,
        ],
        backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe"],
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">GRH Admin Dashboard</h1>

      <table className="w-full table-auto border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Nom</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Grade</th>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Salaire</th>
            <th className="border px-4 py-2">Note</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e.matricule}>
              <td className="border px-4 py-2">{e.prenom} {e.nom}</td>
              <td className="border px-4 py-2">{e.email}</td>
              <td className="border px-4 py-2">{e.grade}</td>
              <td className="border px-4 py-2">{e.type}</td>
              <td className="border px-4 py-2">{e.salaire}</td>
              <td className="border px-4 py-2">{e.note}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Notes des employés</h2>
          <Bar data={barData} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Répartition des rôles</h2>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
}
