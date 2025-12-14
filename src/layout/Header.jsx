import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ThemeSwitcher from "../components/theme/ThemeSwitcher";
import { RiMenu3Fill, RiSearchLine, RiUser3Line, RiArrowDownSFill, RiCloseLine } from "react-icons/ri";
import buildingHero from "../assets/issat_building_new.jpg";
import logo from "../assets/logo.png";
import logo1 from "../assets/logo1.png";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  TbUser,
  TbLogout2,
  TbLogin2,
  TbChevronDown,
} from "react-icons/tb";
function Header() {
  const [stickNav, setStickNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setStickNav(true);
      } else {
        setStickNav(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${stickNav ? "fixed bg-white/95 backdrop-blur-sm shadow-lg" : "absolute bg-white/90 backdrop-blur-sm shadow-md"
        } z-[100] top-0 w-full transition-all duration-300`}
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-32">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-4 h-full">
            <Link to="/" className="flex items-center gap-4 h-full">
              <img src={logo} alt="ISSAT Logo" className="h-full w-auto object-contain" />
            </Link>
          </div>
          {/* Right Actions Section */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search */}




            {/* Extranet Button */}
            <Link
              className="text-sm md:text-base xl:text-xl mx-2 flex items-center text-gray-800 hover:text-cyan-600 transition-colors"
              to="/auth/login"
            >
              <TbLogin2 className="mr-2" />
              Se Connecter
            </Link>

            {/* Menu Button */}
            <Link
              to="/menu"
              className="flex items-center gap-2 font-bold tracking-widest text-sm transition-colors text-gray-600 hover:text-cyan-500"
            >
              <RiMenu3Fill size={24} />
              <span>MENU</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Link to="/menu" className="text-gray-600 p-2">
              <RiMenu3Fill size={24} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
