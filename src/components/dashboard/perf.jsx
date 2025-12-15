import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserByCin } from "../../services/service";
import { FaUserGraduate } from "react-icons/fa";
import { IoMdSchool } from "react-icons/io";

const perf = () => {
  const { cin } = useParams();
  const navigate = useNavigate();

  

 

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <div className="flex items-end gap-1 mb-6 border-b px-4 pt-4 bg-white shadow-sm">
        <button
          onClick={() => navigate("/dashboard/admin")}
          className="px-4 py-2 text-gray-500 hover:text-blue-600 text-sm"
        >
          Accueil
        </button>
        <div className="px-4 py-2 text-gray-800 font-medium text-sm bg-white border rounded-t-lg">
          Détails de l'étudiant :
          {" "}Doe Son
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* LEFT CARD */}
        <div className="w-full md:w-1/4">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center border">
            <div className="w-32 h-32 rounded-full mx-auto mb-4 border shadow">
              <img
                src="C:\Users\yassi\OneDrive\Bureau\GRH\MTC-PROJECT\src\assets\man.jpg"
                alt="profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>

            <h2 className="text-xl font-bold">
              Doe Son
            </h2>

            <div className={`mt-2 font-medium ${
              "text-green-600" 
            }`}>
             🏢 Administration
            </div>

            <div className="text-left mt-6 space-y-3 border-t pt-4">
              <div className="flex justify-between">
                <span className="text-gray-500">CIN :</span>
                <span className="font-semibold">U123457</span>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full md:w-3/4">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="border-b px-6 py-4 bg-blue-50 text-blue-600 font-medium">
              ℹ️ Informations générales
            </div>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <span className="text-gray-600 font-medium">Nom & Prénom :</span>
                <span className="md:col-span-2 font-semibold">
                  Doe Son
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <span className="text-gray-600 font-medium">CIN :</span>
                <span className="md:col-span-2">U123457</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <span className="text-gray-600 font-medium">Email :</span>
                <span className="md:col-span-2">
                 son.doe@test.com
                  <span className="text-green-600 ml-2 text-sm">(Vérifié)</span>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <span className="text-gray-600 font-medium">Type :</span>
                <span className="md:col-span-2 capitalize font-semibold">
                  
                 🏢 Administration
                </span>
              </div>

             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default perf;
