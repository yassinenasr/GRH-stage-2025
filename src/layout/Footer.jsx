import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-6 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Top Section - 4 colonnes plus serrées */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

          {/* Col 1: Logo & Contact */}
          <div className="flex flex-col items-start">
            {/* Logo - très peu de marge en dessous */}
            <div className="mb-2">
              <Link to="/" className="flex items-center">
                <img 
                  src={logo} 
                  alt="ISSAT Logo" 
                  className="h-24 w-auto object-contain" 
                />
              </Link>
            </div>

            {/* Contacts - espacement réduit */}
            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-blue-900 flex-shrink-0" />
                <p>Campus Universitaire Route périphérique Dar El Amen Kairouan, 3100</p>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-blue-900 flex-shrink-0" />
                <p>+216 77 27 37 96 - +216 77 27 38</p>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-blue-900 flex-shrink-0" />
                <p>issatkr@issatkr.rnu.tn</p>
              </div>
            </div>
          </div>

          {/* Col 2: Institut */}
          <div className="flex flex-col items-start">
            <h3 className="text-blue-900 font-bold mb-4">Institut</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><Link to="#" className="hover:text-blue-600">Mot de direction</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Présentation</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Organigramme</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Conseil scientifique</Link></li>
            </ul>
          </div>

          

          {/* Col 4: Formations */}
          <div className="flex flex-col items-start">
            <h3 className="text-blue-900 font-bold mb-4">Etudiant</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><Link to="#" className="hover:text-blue-600">Licenses</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Clubs</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Manifestations</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Activités sportives</Link></li>
            </ul>
          </div>

          {/* Col 3: Départements */}
          <div className="flex flex-col items-start">
            <h3 className="text-blue-900 font-bold mb-4">Départements</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><Link to="#" className="hover:text-blue-600">Département Mécanique</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Département Electrique</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Département Mathématique, Physique et Informatique</Link></li>
            </ul>
          </div>

        </div>

        {/* Middle Section (à compléter plus tard) */}
        <div className="border-t border-gray-100 py-6 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Certification, réseaux sociaux, copyright, etc. */}
        </div>

      </div>
    </footer>
  );
}

export default Footer;