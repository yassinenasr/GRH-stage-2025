import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import buildingHero from "../../assets/isima_building.jpg";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";

function HeroHome() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${buildingHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-center items-center text-center">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <h1
            className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-wide uppercase drop-shadow-lg"
            data-aos="zoom-y-out"
          >
            Innovation Numérique
          </h1>
          <div className="max-w-3xl mx-auto">
            <p
              className="text-xl md:text-2xl text-white mb-8 font-light tracking-wider drop-shadow-md uppercase"
              data-aos="zoom-y-out"
              data-aos-delay="150"
            >
              Construire l'avenir à travers<br />l'excellence technologique
            </p>
          </div>
        </div>
      </div>

      {/* Slider Navigation Arrows (Visual Only) */}
      <div className="absolute top-1/2 left-4 md:left-8 transform -translate-y-1/2 z-20 text-white/50 hover:text-white transition-colors cursor-pointer border border-white/30 rounded-full p-2 hover:bg-white/10">
        <RiArrowLeftLine size={32} />
      </div>
      <div className="absolute top-1/2 right-4 md:right-8 transform -translate-y-1/2 z-20 text-white/50 hover:text-white transition-colors cursor-pointer border border-white/30 rounded-full p-2 hover:bg-white/10">
        <RiArrowRightLine size={32} />
      </div>

      {/* Scroll Indicator or Bottom Decoration could go here */}
    </section>
  );
}

export default HeroHome;
