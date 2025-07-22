import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

import { SiReactrouter, SiTailwindcss, SiReact, SiExpress } from "react-icons/si";
import { FaNode, FaLinkedin, FaGithub, FaDatabase, FaChartPie } from "react-icons/fa";
import { Link } from "react-router-dom";

function About() {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className="flex flex-col-reverse items-center justify-center pt-20 bg-gray-200 dark:bg-darkColor-100">
      <div className="w-3/4 [&>p]:text-lg [&>p]:lg:text-xl [&>h1]:lg:text-3xl">
        <h1 className="text-3xl mt-6 mb-3 font-extrabold text-purpleshade-300">
          À propos du développeur
        </h1>
        <p className=" text-grayshade-200 dark:text-lightColor-300">
          Bonjour ! Je suis{" "}
          <span className="font-semibold text-purpleshade-300">
            Yassine Nasr
          </span>
          , le développeur de cette plateforme de Gestion des Ressources Humaines (GRH).
          Mon objectif est de proposer une application moderne, intuitive et facile d'utilisation pour gérer efficacement les employés et les ressources d'une entreprise.
        </p>

        <h1 className="text-xl mt-6 mb-3 font-extrabold text-purpleshade-300">
          Qu'est-ce qu'un système GRH ?
        </h1>
        <p className="text-grayshade-200 dark:text-lightColor-300">
          Un système de Gestion des Ressources Humaines (GRH) permet de gérer les informations relatives aux employés : 
          <br />- Gestion des congés <br />
          - Suivi des présences <br />
          - Gestion des salaires <br />
          - Suivi des performances <br />
          - Gestion des recrutements <br />
          Cette application facilite toutes ces tâches via une interface claire et des fonctionnalités adaptées.
        </p>

        <h1 className="text-xl mt-6 mb-3 font-extrabold text-purpleshade-300">
          Technologies utilisées
        </h1>
        <p className="text-grayshade-200 dark:text-lightColor-300">
          Pour développer cette application, j'ai utilisé les technologies suivantes afin d'assurer une expérience fluide et moderne :
        </p>
        <div className="flex text-4xl md:text-[60px] justify-evenly my-8 text-grayshade-50 ">
          <span data-aos="zoom-in">
            <SiReact className="hover:text-[#149ECA] transition-all ease duration-300" />
          </span>
          <span data-aos="zoom-in">
            <SiReactrouter className="hover:text-[#F44250] transition-all ease duration-300" />
          </span>
          <span data-aos="zoom-in">
            <SiTailwindcss className="hover:text-[#38BDF8] transition-all ease duration-300" />
          </span>
          <span data-aos="zoom-in">
            <FaChartPie className="hover:text-[#FF6384] transition-all ease duration-300" title="Chart.js" />
          </span>
        </div>

        <h1 className="text-xl mt-6 mb-3 font-extrabold text-purpleshade-300">
          Côté backend
        </h1>
        <p className="text-grayshade-200 dark:text-lightColor-300">
          Le backend est développé avec Node.js et Express.js pour gérer les requêtes serveur et la logique métier. 
          Les données sont stockées dans une base PostgreSQL, administrée via PgAdmin.
        </p>
        <div className="flex text-4xl md:text-[60px] justify-evenly my-8 text-grayshade-50">
          <span data-aos="zoom-in">
            <FaNode className="hover:text-[#57A646] transition-all ease duration-300" />
          </span>
          <span data-aos="zoom-in">
            <SiExpress className="hover:text-black transition-all ease duration-300" />
          </span>
          <span data-aos="zoom-in">
            <FaDatabase className="hover:text-[#336791] transition-all ease duration-300" title="PgAdmin / PostgreSQL" />
          </span>
        </div>

        <h1 className="text-xl mt-6 mb-3 font-extrabold text-purpleshade-300">
          Contact
        </h1>
        <p className="text-grayshade-200 dark:text-lightColor-300">
          N'hésitez pas à me contacter pour toute suggestion ou question ! 
          Vous pouvez me retrouver sur mes réseaux :
        </p>
        <div className="flex text-4xl md:text-[60px] justify-evenly my-8 text-grayshade-50">
          <Link to={"https://www.linkedin.com/in/ali-zarshenas-siza"} target="_blank" data-aos="zoom-in">
            <FaLinkedin className="hover:text-[#0077b5]  transition-all ease duration-300" />
          </Link>
          <Link to={"https://github.com/Zarshenas"} target="_blank" data-aos="zoom-in">
            <FaGithub className="hover:text-black dark:hover:text-white  transition-all ease duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
