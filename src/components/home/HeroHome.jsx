import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import AbstractDesign from "../../assets/AbstractDesign.svg";

function HeroHome() {
  useEffect(() => {
    AOS.init();
  }, []);

  return ( 
    <section className="relative overflow-hidden  bg-gray-200">
      {/* Background Image */}
      

   <div
  className="absolute xl:left-1/2 lg:left-1/3 hidden lg:block transform -translate-x-1/2 bottom-0 pointer-events-none -z-30 text-gray-300"
  aria-hidden="true"
>
  <svg
    width="1200"
    height="490"
    viewBox="0 0 1360 578"
    xmlns="http://www.w3.org/2000/svg"
    className="fill-current"
    role="img"
    aria-label="Background decorative circles"
  >
    <g fillRule="evenodd">
      <circle cx="1232" cy="128" r="128" fill="currentColor" />
      <circle cx="155" cy="443" r="64" fill="currentColor" />
    </g>
  </svg>
</div>



      <div className="max-w-6xl mx-auto px-4 sm:px-6 ">
        <div className="pt-28 pb-16 md:pt-36 md:pb-20 lg:pt-44">
          <div className="text-center pb-12 md:pb-16">
            <h1
              className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 border-color-black"
              data-aos="zoom-y-out"
            >
              Gestion RH{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-black to-black dark:to-grayshade-400 ">
                GRH
              </span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p
                className="text-xl text-black mb-8"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                Un système RH intelligent pour simplifier la gestion des employés, automatiser les processus et améliorer la productivité.
              </p>
              <div
  className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center sm:space-x-6 space-y-4 sm:space-y-0"
  data-aos="zoom-y-out"
  data-aos-delay="300"
>
  <Link
    to="/login"
    className="btn w-full sm:w-auto px-8 py-3 rounded-lg font-semibold text-black bg-white hover:bg-purple-700 shadow-lg transition duration-300 ease-in-out"
  >
    Se Connecter
  </Link>
  <Link
    to="/about"
    className="btn w-full sm:w-auto px-8 py-3 rounded-lg font-semibold text-white bg-black hover:bg-black shadow-md transition duration-300 ease-in-out"
  >
    Learn more
  </Link>
</div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroHome;
