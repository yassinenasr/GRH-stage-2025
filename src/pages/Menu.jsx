import React from "react";
import { Link } from "react-router-dom";
import { RiCloseLine, RiUser3Line } from "react-icons/ri";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import issatMenuBg from "../assets/issat_menu_bg.jpg";

function Menu() {
    const [activeSubmenu, setActiveSubmenu] = React.useState(null);
    const [selectedCategory, setSelectedCategory] = React.useState('licences');

    // Define programs for each category
    const categoryPrograms = {
        licences: [
            { name: "Automatique et Informatique Industrielle", path: "/programmes/automatique-informatique-industrielle" },
            { name: "Conception et production intégrée", path: "/programmes/conception-production-integree" },
            { name: "Energies nouvelles et renouvelables", path: "/programmes/energies-nouvelles-renouvelables" },
            { name: "Génie Informatique: Systèmes Embarqués & IoT", path: "/programmes/genie-informatique-systemes-embarques-iot" },
            { name: "Systèmes Electriques", path: "/programmes/systemes-electriques" }
        ],
        masteres: [
            { name: "Mastère en Génie Électrique", path: "/programmes/mastere-genie-electrique" },
            { name: "Mastère en Automatique", path: "/programmes/mastere-automatique" },
            { name: "Mastère en Énergies Renouvelables", path: "/programmes/mastere-energies-renouvelables" }
        ],
        master: [
            { name: "Master Recherche en Génie Électrique", path: "/programmes/master-recherche-genie-electrique" },
            { name: "Master Recherche en Automatique", path: "/programmes/master-recherche-automatique" }
        ],
        recherche: [
            { name: "Laboratoire de Recherche", path: "/recherche/laboratoire" },
            { name: "Publications", path: "/recherche/publications" },
            { name: "Projets de Recherche", path: "/recherche/projets" }
        ],
        stages: [
            { name: "Stage de fin d'études", path: "/stages/fin-etudes" },
            { name: "Stage d'été", path: "/stages/ete" },
            { name: "Stage professionnel", path: "/stages/professionnel" }
        ],
        projets: [
            { name: "Projets 2024", path: "/projets/2024" },
            { name: "Projets 2023", path: "/projets/2023" },
            { name: "Projets 2022", path: "/projets/2022" }
        ],
        laureats: [
            { name: "Lauréats 2024", path: "/laureats/2024" },
            { name: "Lauréats 2023", path: "/laureats/2023" },
            { name: "Lauréats 2022", path: "/laureats/2022" }
        ],
        candidature: [
            { name: "Dossier de candidature", path: "/candidature/dossier" },
            { name: "Dates importantes", path: "/candidature/dates" },
            { name: "Conditions d'admission", path: "/candidature/conditions" }
        ],
        vieEtudiante: [
            { name: "Clubs", path: "/vie-etudiante/clubs" },
            { name: "Manifestations", path: "/vie-etudiante/manifestations" },
            { name: "Activités Sportives", path: "/vie-etudiante/activites-sportives" }
        ]
    };

    return (
        <div className="min-h-screen flex flex-col text-white overflow-y-auto">
            {/* Background Image with Overlay */}
            <div
                className="fixed inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: `url(${issatMenuBg})` }}
            >
                <div className="absolute inset-0 bg-blue-900/90"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col min-h-screen">
                {/* Overlay Header */}
                <div className="flex justify-between items-center p-6 md:p-12">
                    {/* Logo in Menu */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <div className="text-3xl md:text-4xl font-bold text-cyan-500 tracking-tighter">
                                <span className="text-cyan-400">i</span>ssat
                            </div>
                        </div>
                        <span className="text-[8px] md:text-[10px] font-semibold tracking-widest uppercase text-white/80">
                            Institut Supérieur des Sciences Appliquées <br />et de Technologie Kairouan
                        </span>
                    </div>

                    {/* Close Button */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-sm md:text-lg font-bold tracking-widest hover:text-cyan-400 transition-colors"
                    >
                        <RiCloseLine size={32} />
                        FERMER
                    </Link>
                </div>

                {/* Menu Content */}
                <div className="flex-1 flex flex-col md:flex-row items-start px-6 md:px-20 py-10">
                    {/* Links Column */}
                    <div className="flex flex-col justify-center space-y-2 md:space-y-3 w-full md:w-1/2">
                        <Link to="/" className="text-1xl md:text-3xl font-bold hover:text-cyan-400 transition-colors w-fit">
                            ISSAT
                        </Link>
                        <div
                            className="relative"
                        >
                            <button
                                onClick={() => setActiveSubmenu(activeSubmenu === 'formation' ? null : 'formation')}
                                className={`text-1xl md:text-3xl font-bold hover:text-cyan-400 transition-colors w-fit text-left ${activeSubmenu === 'formation' ? 'underline decoration-2 underline-offset-8' : ''}`}
                            >
                                Formation
                            </button>
                        </div>
                        <Link to="#" className="text-1xl md:text-3xl font-bold hover:text-cyan-400 transition-colors w-fit">
                            Recherche
                        </Link>
                        <Link to="#" className="text-1xl md:text-3xl font-bold hover:text-cyan-400 transition-colors w-fit">
                            Assurance Qualité
                        </Link>
                        <Link to="#" className="text-1xl md:text-3xl font-bold hover:text-cyan-400 transition-colors w-fit">
                            Entreprises
                        </Link>
                        <div
                            className="relative"
                        >
                            <button
                                onClick={() => setActiveSubmenu(activeSubmenu === 'vieEtudiante' ? null : 'vieEtudiante')}
                                className={`text-1xl md:text-3xl font-bold hover:text-cyan-400 transition-colors w-fit text-left ${activeSubmenu === 'vieEtudiante' ? 'underline decoration-2 underline-offset-8' : ''}`}
                            >
                                Vie Etudiante
                            </button>
                        </div>
                        <Link to="#" className="text-1xl md:text-3xl font-bold hover:text-cyan-400 transition-colors w-fit">
                            International
                        </Link>
                        
                    </div>

                    {/* Submenu Panel */}
                    {activeSubmenu === 'formation' && (
                        <div
                            className="w-full md:w-1/2 pl-0 md:pl-12 mt-8 md:mt-0 transform -translate-x-20"
                        >
                            <h3 className="text-lg md:text-xl font-bold mb-6 text-yellow-400">
                                Organigramme
                            </h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Left Column - Categories */}
                                <div className="flex flex-col space-y-3">
                                    <button
                                        onClick={() => setSelectedCategory('licences')}
                                        className={`text-base md:text-lg hover:text-yellow-400 transition-colors text-left ${selectedCategory === 'licences' ? 'text-yellow-400' : 'text-white'
                                            }`}
                                    >
                                        Licences Unifiées
                                    </button>
                                    <button
                                        onClick={() => setSelectedCategory('masteres')}
                                        className={`text-base md:text-lg hover:text-yellow-400 transition-colors text-left ${selectedCategory === 'masteres' ? 'text-yellow-400' : 'text-white'
                                            }`}
                                    >
                                        Mastères professionnels
                                    </button>
                                    <button
                                        onClick={() => setSelectedCategory('master')}
                                        className={`text-base md:text-lg hover:text-yellow-400 transition-colors text-left ${selectedCategory === 'master' ? 'text-yellow-400' : 'text-white'
                                            }`}
                                    >
                                        Master de Recherche
                                    </button>
                                    <button
                                        onClick={() => setSelectedCategory('recherche')}
                                        className={`text-base md:text-lg hover:text-yellow-400 transition-colors text-left ${selectedCategory === 'recherche' ? 'text-yellow-400' : 'text-white'
                                            }`}
                                    >
                                        Recherche scientifique
                                    </button>
                                    <button
                                        onClick={() => setSelectedCategory('stages')}
                                        className={`text-base md:text-lg hover:text-yellow-400 transition-colors text-left ${selectedCategory === 'stages' ? 'text-yellow-400' : 'text-white'
                                            }`}
                                    >
                                        Déroulement de stages
                                    </button>
                                    <button
                                        onClick={() => setSelectedCategory('projets')}
                                        className={`text-base md:text-lg hover:text-yellow-400 transition-colors text-left ${selectedCategory === 'projets' ? 'text-yellow-400' : 'text-white'
                                            }`}
                                    >
                                        Meilleurs projets
                                    </button>
                                    <button
                                        onClick={() => setSelectedCategory('laureats')}
                                        className={`text-base md:text-lg hover:text-yellow-400 transition-colors text-left ${selectedCategory === 'laureats' ? 'text-yellow-400' : 'text-white'
                                            }`}
                                    >
                                        Lauréats
                                    </button>
                                    <button
                                        onClick={() => setSelectedCategory('candidature')}
                                        className={`text-base md:text-lg hover:text-yellow-400 transition-colors text-left ${selectedCategory === 'candidature' ? 'text-yellow-400' : 'text-white'
                                            }`}
                                    >
                                        Candidature de mastère
                                    </button>
                                </div>

                                {/* Right Column - Programs */}
                                <div className="flex flex-col space-y-3 transform -translate-x-16">
                                    {categoryPrograms[selectedCategory]?.map((program, index) => (
                                        <Link
                                            key={index}
                                            to={program.path}
                                            className="text-base md:text-lg hover:text-cyan-400 transition-colors"
                                        >
                                            {program.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSubmenu === 'vieEtudiante' && (
                        <div
                            className="w-full md:w-1/2 pl-0 md:pl-12 mt-8 md:mt-0 transform -translate-x-20"
                        >
                            <div className="flex flex-col space-y-3">
                                {categoryPrograms['vieEtudiante']?.map((program, index) => (
                                    <Link
                                        key={index}
                                        to={program.path}
                                        className="text-base md:text-lg hover:text-cyan-400 transition-colors"
                                    >
                                        {program.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                </div>


            </div>
        </div>
    );
}

export default Menu;
