import React, { useState, useRef, useEffect } from "react";
import Transition from "../../utils/transitions/Transition.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import illustration1 from "../../assets/illustration1.svg";
import illustration2 from "../../assets/illustration2.svg";
import illustration3 from "../../assets/illustration3.svg";

import { FaBoltLightning } from "react-icons/fa6";
import { IoPaperPlane } from "react-icons/io5";
import { BiSolidMoon } from "react-icons/bi";

function Features() {
  const [tab, setTab] = useState(1);

  const tabs = useRef(null);

  const heightFix = () => {
    if (tabs.current.children[tab]) {
      tabs.current.style.height =
        tabs.current.children[tab - 1].offsetHeight + "px";
    }
  };

  useEffect(() => {
    heightFix();
    AOS.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  return (
    <section className="relative bg-gray-200 " style={ {borderTop: "2px solid #000000ff"}}>
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div
        className="absolute inset-0 bg-gray-200 dark:bg-grayshade-400 pointer-events-none mb-16"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-0 -top-11 m-auto w-px p-px h-20 bg-gray-200 "></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2 mb-4 text-purpleshade-400 text-3xl font-extrabold">Les fonctionnalités de notre plateforme</h1>
            <p className="text-xl text-black">
                                Des requêtes simples et explicatives pour faciliter l’utilisation de notre système de gestion des ressources humaines (GRH).

            </p>
          </div>

          {/* Section content */}
          <div className="md:grid md:grid-cols-12 md:gap-6">
            {/* Content */}
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6"
              data-aos="fade-right"
            >
              
              {/* Tabs buttons */}
              <div className="mb-8 md:mb-0">
                <a
                  className={`flex items-center text-lg p-5 rounded border-4 transition duration-300 ease-in-out mb-3 ${
                    tab !== 1
                       ? "bg-grayshade-200 text-white dark:bg-grayshade-500 border-purpleshade-400 shadow-md  hover:shadow-lg"
                      : "bg-grayshade-200 text-white dark:bg-grayshade-500 border-purpleshade-400"
                  }`}
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(1);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1">
Notre Platforme GRH                     </div>
                    <div className="text-grayshade-50">
                         Notre plateforme est simple et intuitive : vous y trouverez une page d’accueil générale, une section “À propos” présentant les informations sur les développeurs et les technologies utilisées, ainsi qu’un tableau de bord personnalisé accessible après connexion pour chaque employé.

                    </div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-lightColor-300 dark:bg-grayshade-300 rounded-full shadow flex-shrink-0 ml-3">
                    <FaBoltLightning className="text-grayshade-500 dark:text-white" />
                  </div>
                </a>
                <a
                  className={`flex items-center text-lg p-5 rounded border-4 transition duration-300 ease-in-out mb-3 ${
                    tab !== 2
                      ? "bg-grayshade-200 text-white dark:bg-grayshade-500 border-purpleshade-400 shadow-md  hover:shadow-lg"
                      : "bg-grayshade-200 text-white dark:bg-grayshade-500 border-purpleshade-400"
                  }`}
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(2);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1">
Connexion vers la tableau de bord                    </div>
                    <div className="text-grayshade-50">
                         La connexion dépend de votre rôle (Admin, Employé ou Responsable), chaque profil dispose de son propre tableau de bord personnalisé.

                    </div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-lightColor-300 dark:bg-grayshade-300 rounded-full shadow flex-shrink-0 ml-3">
                    <IoPaperPlane className="text-grayshade-500 dark:text-white" />
                  </div>
                </a>
                <a
                  className={`flex items-center text-lg p-5 rounded border-4 transition duration-300 ease-in-out mb-3 ${
                    tab !== 3
                      ? "bg-grayshade-200 text-white dark:bg-grayshade-500 border-purpleshade-400 shadow-md  hover:shadow-lg"
                      : "bg-grayshade-200 text-white dark:bg-grayshade-500 border-purpleshade-400"
                  }`}
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(3);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1">
Tableau de bord                   </div>
                    <div className="text-grayshade-50">
                      Employee : peut trouver son informations personnelle et ses demandes de congés ou augmentation de salaire et aussi il peut faire les demandes, 
    RH : peut trouver son informations personnelle et ses demandes de congés ou augmentation de salaire et aussi il peut faire les demandes et aussi il trouve tous les statisques des employee et leur demande et il peut accepter ou refuser, 
    Responsable : peut faire tous les actions employee et RH mais les demandes de RH il peut accepter ou refuser juste lui meme.
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-lightColor-300 dark:bg-grayshade-300 rounded-full shadow flex-shrink-0 ml-3">
                    <BiSolidMoon className="text-grayshade-500 dark:text-white" />
                  </div>
                </a>
              </div>
            </div>

            {/* Tabs items */}
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1 align-middle"
              data-aos="zoom-y-out"
              ref={tabs}
            >
              <div className="relative flex flex-col text-center lg:text-right h-full justify-center">
                {/* Item 1 */}
                <Transition
                  show={tab === 1}
                  appear={true}
                  className="w-full"
                  enter="transition ease-in-out duration-700 transform order-first"
                  enterStart="opacity-0 translate-y-16"
                  enterEnd="opacity-100 translate-y-0"
                  leave="transition ease-in-out duration-300 transform absolute"
                  leaveStart="opacity-100 translate-y-0"
                  leaveEnd="opacity-0 -translate-y-16"
                >
                  <div className="relative inline-flex flex-col">
                    <img
                      className="mx-auto rounded"
                      src={illustration2}
                      width="500"
                      alt="Features bg"
                    />
                  </div>
                </Transition>
                {/* Item 2 */}
                <Transition
                  show={tab === 2}
                  appear={true}
                  className="w-full"
                  enter="transition ease-in-out duration-700 transform order-first"
                  enterStart="opacity-0 translate-y-16"
                  enterEnd="opacity-100 translate-y-0"
                  leave="transition ease-in-out duration-300 transform absolute"
                  leaveStart="opacity-100 translate-y-0"
                  leaveEnd="opacity-0 -translate-y-16"
                >
                  <div className="relative inline-flex flex-col">
                    <img
                      className="mx-auto rounded"
                      src={illustration3}
                      width="500"
                      alt="Features bg"
                    />
                  </div>
                </Transition>
                {/* Item 3 */}
                <Transition
                  show={tab === 3}
                  appear={true}
                  className="w-full"
                  enter="transition ease-in-out duration-700 transform order-first"
                  enterStart="opacity-0 translate-y-16"
                  enterEnd="opacity-100 translate-y-0"
                  leave="transition ease-in-out duration-300 transform absolute"
                  leaveStart="opacity-100 translate-y-0"
                  leaveEnd="opacity-0 -translate-y-16"
                >
                  <div className="relative inline-flex flex-col">
                    <img
                      className="mx-auto rounded"
                      src={illustration1}
                      width="500"
                      alt="Features bg"
                    />
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
