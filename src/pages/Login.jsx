import React from "react";
import { useFormik } from "formik";
import { loginValidator as validate } from "../utils/helpers/formValidator";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthenticateProvider";
import { login } from "../services/service";
import CryptoJS from "crypto-js";
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

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
      
      // **Ajout ici : stockage de l'id et du matricule dans localStorage**
      localStorage.setItem("employeeId", decoded.employee.id);
      localStorage.setItem("matricule", decoded.employee.matricule);

      setIsAuthenticated(true);
    } catch (error) {
      console.error("Invalid JWT:", error);
      return null;
    }
    toast.success("Connexion réussie !", { duration: 3000 });
    if (type === "admin") {
      navigate("/dashboard/admin", { replace: true });
    } else if (type === "responsable") {
      navigate("/dashboard/responsable", { replace: true });
    } else if (type === "employee") {
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
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="shadow-lg p-8 w-full max-w-md bg-gray-100 border border-gray-300 rounded-lg">
        <div className="text-center mb-6">
          <h1 className="text-gray-800 font-extrabold text-4xl">Login</h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-1 text-gray-700 text-black"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="border border-gray-400 rounded-md p-2 w-full focus:outline-none text-black focus:ring-2 focus:ring-blue-300"
              placeholder="Enter your email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <span className="text-red-500 text-sm">
              {formik.touched.email && formik.errors.email
                ? `*${formik.errors.email}`
                : null}
            </span>
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block mb-1 text-black">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="border border-gray-400 text-black rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter your password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <span className="text-red-500 text-sm">
              {formik.touched.password && formik.errors.password
                ? `*${formik.errors.password}`
                : null}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-400 text-white font-bold py-2 px-4 rounded hover:bg-blue-500"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
