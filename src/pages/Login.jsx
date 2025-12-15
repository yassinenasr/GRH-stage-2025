import React, { useState } from "react";
import { useFormik } from "formik";
import { loginValidator as validate } from "../utils/helpers/formValidator";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthenticateProvider";
import { login } from "../services/service";
import buildingHero from "../assets/issat_building_new.jpg";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { jwtDecode } from 'jwt-decode';

function Login() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("etudiant");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
 onSubmit: async (values) => {
  try {
    const enteredEmail = values.email.trim().toLowerCase();
    const enteredPassword = values.password;

    const token = await login(enteredEmail, enteredPassword);
    let type;
    try {
      const decoded = jwtDecode(token);
      type = decoded.employee.type;
      
      // *Ajout ici : stockage de l'id et du matricule dans localStorage*
      localStorage.setItem('userId', decoded.id);
      localStorage.setItem('matricule', decoded.employee.cin);
     

      setIsAuthenticated(true);
    } catch (error) {
      console.error("Invalid JWT:", error);
      return null;
    }
    toast.success("Connexion réussie !", { duration: 3000 });
    if (type === "administration") {
      navigate("/dashboard/admin", { replace: true });
    } else if (type === "etudiant") {
      navigate("/dashboard/employee", { replace: true });
    } else {
      toast.error("Type d'utilisateur inconnu", { duration: 3000 });
      navigate("/", { replace: true });
    }
  } catch (error) {
    toast.error(error.message || "Erreur de connexion", { duration: 4000 });
  }
}

  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row min-h-[500px]">

        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-blue-900 mb-4">Se connecter</h1>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full px-4 py-2 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 transition-all text-black"
                placeholder="Email d'utilisateur"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email || ""}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <input
                id="password"
                name="password"
                type="password"
                className="w-full px-4 py-2 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 transition-all text-black"
                placeholder="Mot de passe"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password || ""}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 text-sm mt-4"
            >
              Se connecter
            </button>
          </form>
        </div>

        {/* Right Side - Info */}
        <div
          className="w-full md:w-1/2 bg-cover bg-center p-8 text-white flex flex-col justify-center items-center text-center relative overflow-hidden"
          style={{ backgroundImage: `url(${buildingHero})` }}
        >
          <div className="absolute inset-0 bg-blue-900/60"></div>
          <div className="relative z-10 max-w-sm">
            <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">BIENVENU</h2>
            <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">À L'ISSAT KAIROUAN</h3>
            <p className="text-blue-100 mb-6 leading-relaxed text-sm">
              L'Institut Supérieur des Sciences Appliquées et de Technologie de Kairouan (ISSAT Kairouan ou ISSATKR) est un établissement public d'enseignement supérieur rattaché à l'Université de Kairouan. Il propose diverses formations dans les domaines des sciences et technologies
            </p>
            <div className="border-t border-white/20 w-full pt-4">
              <p className="text-xs font-medium mb-3">Suivez-nous sur nos réseaux sociaux</p>
              <div className="flex justify-center gap-3">
                <a href="https://www.facebook.com/profile.php?id=100063744103153" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
                  <FaFacebookF size={14} />
                </a>
                <a href="https://www.youtube.com/@universitekairouan-gz7fi" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors">
                  <FaYoutube size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
