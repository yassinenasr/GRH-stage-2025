import React from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer>
      <div className="mx-auto px-4 sm:px-6 bg-gray-200">
        <div className="grid sm:grid-cols-12 gap-8 py-8 md:py-12 border-t border-grayshade-50">
          {/* Conditions */}
          <div className="sm:col-span-12 lg:col-span-3">
            <div className="text-sm text-grayshade-400">
              <Link to="#" className="hover:text-grayshade-50 hover:underline transition duration-150 ease-in-out">
                Conditions Générales
              </Link>{" "}
              ·{" "}
              <Link to="#" className="hover:text-grayshade-50 hover:underline transition duration-150 ease-in-out">
                Politique de Confidentialité
              </Link>
            </div>
          </div>

          {/* Fonctionnalités Employé */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-purpleshade-300 font-bold mb-2">Espace Employé</h6>
            <ul className="text-black">
              <li className="mb-2"><Link to="#" className="hover:text-black transition">Faire une demande</Link></li>
              <li className="mb-2"><Link to="#" className="hover:text-black transition">Consulter vos statistiques</Link></li>
              <li className="mb-2"><Link to="#" className="hover:text-black transition">Accéder à vos informations</Link></li>
              <li className="mb-2"><Link to="#" className="hover:text-black transition">Suivre vos demandes</Link></li>
            </ul>
          </div>

          {/* Fonctionnalités RH */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-purpleshade-300 font-bold mb-2">Espace RH</h6>
            <ul className="text-black">
              <li className="mb-2"><Link to="#" className="hover:text-black transition">Gérer les demandes</Link></li>
              <li className="mb-2"><Link to="#" className="hover:text-black transition">Consulter les statistiques</Link></li>
              <li className="mb-2"><Link to="#" className="hover:text-black transition">Suivre les absences</Link></li>
              <li className="mb-2"><Link to="#" className="hover:text-black transition">Gérer le personnel</Link></li>
            </ul>
          </div>

          {/* Informations */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-purpleshade-300 font-bold mb-2">Informations</h6>
            <ul className="text-black">
              <li className="mb-2"><Link to="#" className="hover:text-black transition">Accueil</Link></li>
              <li className="mb-2"><Link to="#" className="hover:text-black transition">À propos</Link></li>
              <li className="mb-2"><Link to="#" className="hover:text-black transition">Notre Équipe</Link></li>
              <li className="mb-2"><Link to="#" className="hover:text-black transition">Tarification</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-3">
            <h6 className="text-purpleshade-300 font-bold mb-2">N’hésitez pas
</h6>
            <p className="text-sm text-grayshade-400 mb-4">
              Recevez les dernières actualités et articles directement par e-mail.
            </p>
            <form>
              <div className="flex flex-wrap mb-4">
                <div className="w-full">
                  <label htmlFor="newsletter" className="sr-only">Email</label>
                  <div className="relative flex items-center max-w-xs">
                    <input
                      id="newsletter"
                      type="email"
                      className="form-input w-full p-4 focus:outline-none px-3 pr-12 text-sm"
                      placeholder="Votre e-mail"
                      required
                    />
                    <button type="submit" className="absolute inset-0 left-auto" aria-label="S’abonner">
                      <span className="absolute inset-0 right-auto w-px -ml-px my-2 bg-grayshade-50" aria-hidden="true"></span>
                      <svg className="w-3 h-3 text-purpleshade-300 mx-3" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="md:flex md:items-center md:justify-between py-4 md:py-8 border-t border-grayshade-50">
          <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0">
            <li className="ml-4">
              <Link to="https://github.com/Zarshenas" target="_blank" className="flex justify-center items-center text-grayshade-400 hover:text-grayshade-50 rounded-full shadow-md transition">
                <FaGithub className="w-8 h-8 p-1" />
              </Link>
            </li>
          </ul>
          <div className="text-sm text-grayshade-400 mr-4">
            Fait avec <span className="text-purpleshade-300">♥</span> par{" "}
            <a className="text-purpleshade-300 hover:underline" href="https://github.com/Zarshenas">
              Yassine Nasr
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
