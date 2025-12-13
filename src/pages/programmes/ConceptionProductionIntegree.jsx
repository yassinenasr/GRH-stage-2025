import React from "react";
import { Link } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";
import semestre1 from "../../assets/programmes/cpi_semestre1.jpg";
import semestre2 from "../../assets/programmes/cpi_semestre2.jpg";
import semestre3 from "../../assets/programmes/cpi_semestre3.jpg";
import semestre4 from "../../assets/programmes/cpi_semestre4.jpg";
import issatMenuBg from "../../assets/issat_menu_bg.jpg";

function ConceptionProductionIntegree() {
    return (
        <div className="min-h-screen bg-gray-50 mt-20">
            {/* Hero Section */}
            <div className="relative h-96 overflow-hidden ">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${issatMenuBg})` }}
                >
                    <div className="absolute inset-0 bg-blue-900/90"></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-white px-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
                        Conception et Production Intégrée
                    </h1>
                    <p className="text-xl md:text-2xl text-cyan-400">
                        Licence - TRONC COMMUN
                    </p>
                </div>

                {/* Back Button */}
                <Link
                    to="/menu"
                    className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white hover:text-cyan-400 transition-colors"
                >
                    <RiArrowLeftLine size={24} />
                    <span className="font-semibold">Retour</span>
                </Link>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Introduction */}
                <div className="mb-12 bg-white rounded-lg shadow-md p-8 border-l-4 border-blue-600">
                    <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6">
                        À propos du programme
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        La Conception et Production Intégrée (CPI) est une formation qui vise à former des techniciens supérieurs et ingénieurs capables de concevoir, développer et optimiser des produits et des systèmes de production.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed mt-4">
                        Cette spécialité combine la conception assistée par ordinateur (CAO), la fabrication assistée par ordinateur (FAO), la gestion de production et l'amélioration continue des processus industriels.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed mt-4">
                        Les diplômés peuvent travailler dans des bureaux d'études, des services de production, la gestion de projets industriels, le contrôle qualité et l'optimisation des processus de fabrication.
                    </p>
                </div>

                {/* Curriculum Grid */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
                        Programme de Formation
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Semestre 1 */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4">
                                <h3 className="text-xl font-bold text-white text-center">
                                    Semestre 1
                                </h3>
                            </div>
                            <div className="p-4">
                                <img
                                    src={semestre1}
                                    alt="Semestre 1 Curriculum"
                                    className="w-full h-auto rounded-md shadow-sm"
                                />
                            </div>
                        </div>

                        {/* Semestre 2 */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4">
                                <h3 className="text-xl font-bold text-white text-center">
                                    Semestre 2
                                </h3>
                            </div>
                            <div className="p-4">
                                <img
                                    src={semestre2}
                                    alt="Semestre 2 Curriculum"
                                    className="w-full h-auto rounded-md shadow-sm"
                                />
                            </div>
                        </div>

                        {/* Semestre 3 */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4">
                                <h3 className="text-xl font-bold text-white text-center">
                                    Semestre 3
                                </h3>
                            </div>
                            <div className="p-4">
                                <img
                                    src={semestre3}
                                    alt="Semestre 3 Curriculum"
                                    className="w-full h-auto rounded-md shadow-sm"
                                />
                            </div>
                        </div>

                        {/* Semestre 4 */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4">
                                <h3 className="text-xl font-bold text-white text-center">
                                    Semestre 4
                                </h3>
                            </div>
                            <div className="p-4">
                                <img
                                    src={semestre4}
                                    alt="Semestre 4 Curriculum"
                                    className="w-full h-auto rounded-md shadow-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Program Information */}
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold text-blue-900 mb-6">
                        Informations sur le diplôme
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="border-l-4 border-cyan-500 pl-4">
                            <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                                Université
                            </p>
                            <p className="text-lg font-semibold text-gray-800">
                                Kairouan
                            </p>
                        </div>
                        <div className="border-l-4 border-cyan-500 pl-4">
                            <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                                Établissement
                            </p>
                            <p className="text-lg font-semibold text-gray-800">
                                ISSAT Kr
                            </p>
                        </div>
                        <div className="border-l-4 border-cyan-500 pl-4">
                            <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                                Domaine
                            </p>
                            <p className="text-lg font-semibold text-gray-800">
                                Sciences et Technologie
                            </p>
                        </div>
                        <div className="border-l-4 border-cyan-500 pl-4">
                            <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                                Mention
                            </p>
                            <p className="text-lg font-semibold text-gray-800">
                                EEA : TRONC COMMUN
                            </p>
                        </div>
                        <div className="border-l-4 border-cyan-500 pl-4 md:col-span-2">
                            <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                                Diplôme
                            </p>
                            <p className="text-lg font-semibold text-gray-800">
                                Licence Appliquée
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConceptionProductionIntegree;
