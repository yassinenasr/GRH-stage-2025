import React from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaChartLine, FaUniversity, FaBook, FaFeather } from 'react-icons/fa';

function FeaturesBlock() {
  const stats = [
    {
      id: 1,
      number: "+ 0",
      icon: <FaUserGraduate className="w-16 h-16 text-gray-200" />,
      title: "Étudiants",
      subtitle: "L'année Universitaire 2024/2025"
    },
    {
      id: 2,
      number: "+ 0",
      icon: <FaChalkboardTeacher className="w-16 h-16 text-gray-200" />,
      title: "Enseignants Permanents",
      subtitle: "L'année Universitaire 2024/2025"
    },
    {
      id: 3,
      number: "0",
      icon: <FaChartLine className="w-16 h-16 text-gray-200" />,
      title: "Structures De Recehrche",
      subtitle: ""
    },
    {
      id: 4,
      number: "0",
      icon: <FaUniversity className="w-16 h-16 text-gray-200" />,
      title: "Partenaires",
      subtitle: ""
    },
    {
      id: 5,
      number: "0",
      icon: <FaBook className="w-16 h-16 text-gray-200" />,
      title: "Books",
      subtitle: ""
    },
    {
      id: 6,
      number: "0",
      icon: <FaFeather className="w-16 h-16 text-gray-200" />,
      title: "Rare Items Including Letters, Photographs, And Manuscripts",
      subtitle: ""
    }
  ];

  return (
    <section className="relative bg-white py-12 md:py-20">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight">
              ISSAT Kairouan En <br /> Chiffres
            </h2>
          </div>
          <div className="max-w-md mt-6 md:mt-0 text-gray-600 text-sm md:text-base border-l-2 border-black pl-4 md:border-l-0 md:pl-0">
            <p className="border-l-2 border-black pl-4">
              La progression du nombre d'étudiants, du corps enseignant, des partenariats et bien d'autres indicateurs témoignent l'évolution de l'ISSAT Kairouan
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-1 bg-black mb-16"></div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-5xl font-bold text-blue-900">{stat.number}</span>
                <div className="opacity-50">
                  {stat.icon}
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">{stat.title}</h3>
              {stat.subtitle && (
                <p className="text-sm text-gray-500">{stat.subtitle}</p>
              )}
            </div>
          ))}
        </div>

      </div>
    </section >
  );
}

export default FeaturesBlock;
