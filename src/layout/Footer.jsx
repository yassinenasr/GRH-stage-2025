import React from "react";
import { Link } from "react-router-dom";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCertificate } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* Col 1: Logo & Contact */}
          <div>
            <div className="mb-6">
              {/* Placeholder for SIMA Logo */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">S</div>
                <span className="text-2xl font-bold text-blue-900">ISSAT</span>
              </div>
              <p className="text-xs text-blue-900 mt-1">Institut Supérieur des Sciences Appliquées et de Technologie de Kairouan</p>
            </div>

            <div className="text-sm text-gray-600 space-y-3">
              <div className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-1 text-blue-900" />
                <p>Institut Supérieur des Sciences Appliquées et de Technologie de Kairouan<br />Campus Universitaire Route périphérique Dar El Amen Kairouan, 3100</p>
              </div>
              <div className="flex items-center gap-2">
                <FaPhone className="text-blue-900" />
                <p>+216 77 27 37 96</p>
              </div>
              <div className="flex items-center gap-2">
                <FaPhone className="text-blue-900" />
                <p>+216 77 27 38</p>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-blue-900" />
                <p> issatkr@issatkr.rnu.tn</p>
              </div>
            </div>
          </div>

          {/* Col 2: Institut */}
          <div>
            <h3 className="text-blue-900 font-bold mb-4">Institut</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><Link to="#" className="hover:text-blue-600">Loi de création</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Politique d'assurance qualité</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Organigramme</Link></li>
              <li><Link to="#" className="hover:text-blue-600">En Chiffres</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Enseignants</Link></li>
            </ul>
          </div>

          {/* Col 3: Départements */}
          <div>
            <h3 className="text-blue-900 font-bold mb-4">Départements</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><Link to="#" className="hover:text-blue-600">Département Informatique</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Département physique</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Département mathématique</Link></li>
            </ul>
          </div>

          {/* Col 4: Formations */}
          <div>
            <h3 className="text-blue-900 font-bold mb-4">Formations</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><Link to="#" className="hover:text-blue-600">Licenses</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Mastères</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Stages</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Lauréats</Link></li>
            </ul>
          </div>

        </div>

        {/* Middle Section: Certification & Main Links */}
        <div className="border-t border-gray-100 py-8 flex flex-col md:flex-row justify-between items-center gap-8">

          {/* Certification */}
          <div className="flex items-center gap-4">
            <div>
              <h4 className="text-blue-900 font-bold text-lg">ISIMA est Certifié</h4>
              <h4 className="text-blue-900 font-bold text-lg">ISO 9001 et 21001</h4>
            </div>
            <div className="flex gap-2">
              {/* ISO Placeholders */}
              <div className="flex flex-col items-center">
                <FaCertificate className="text-4xl text-blue-700" />
                <span className="text-xs font-bold text-blue-900">ISO 9001</span>
              </div>
              <div className="flex flex-col items-center">
                <FaCertificate className="text-4xl text-blue-700" />
                <span className="text-xs font-bold text-blue-900">ISO 21001</span>
              </div>
            </div>
          </div>

          {/* Main Links */}
          <div className="flex gap-8 md:gap-16">
            <Link to="#" className="text-blue-900 font-bold hover:text-blue-700">Enseignants</Link>
            <Link to="#" className="text-blue-900 font-bold hover:text-blue-700">Etudiants</Link>
            <Link to="#" className="text-blue-900 font-bold hover:text-blue-700">Pré-inscriptions en ligne</Link>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-100 pt-8 flex flex-wrap justify-center gap-8 text-sm text-gray-600">
          <Link to="#" className="hover:text-blue-600">Accès informations</Link>
          <span>•</span>
          <Link to="#" className="hover:text-blue-600">Plan du site</Link>
          <span>•</span>
          <Link to="#" className="hover:text-blue-600">Liens utiles</Link>
          <span>•</span>
          <Link to="#" className="hover:text-blue-600">Contact</Link>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
