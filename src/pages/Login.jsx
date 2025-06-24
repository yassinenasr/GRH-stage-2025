import React from "react";
import { useFormik } from "formik";
import { loginValidator as validate } from "../utils/helpers/formValidator";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/axiosConfig";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthenticateProvider";
// statique table:employees *// 
let employee = [
  { matricule: 1, nom: " Doe",prenom :"John", email: "johndoe@gmail.com ", motdepasse: "grh123" ,poste:"web dev",grade:"A1" , salaire:"5000", type:"Employee"},
  { matricule: 2, nom: " Smith" ,prenom :"Jane", email: "janesmith@gmail.com ", motdepasse: "grh123" ,poste:"web dev",grade:"A1" , salaire:"5000", type:"Admin"},
  { matricule: 3, nom: " Brown" ,prenom :"Mike", email: "brwonmike@gmail.com" , motdepasse: "grh123" ,poste:"web dev",grade:"A1" , salaire:"5000", type:"Responsable"},
];
function Login() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      const jsonUser = JSON.stringify(values);
      api
        .post("/auth/login", jsonUser, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success("Login successfull!", { duration: 4000 });
            setIsAuthenticated(true);
            setTimeout(() => {
              navigate("/", { replace: true });
            }, 500);
          }
        })
        .catch((err) => {
          if (err.response.status === 404 || err.response.status === 401) {
            toast.error(err.response.data, { duration: 4000 });
          } else {
            toast.error("Somthing went wrong", { duration: 4000 });
            console.log(err.response.data);
          }
        });
    },
  });
  return (
  <div className="min-h-screen bg-gray-200 flex items-center justify-center">
    <div className="shadow-lg p-8 w-full max-w-md bg-gray-100 border border-gray-300 rounded-lg">
      <div className="text-center mb-6">
        <h1 className="text-gray-800 font-extrabold text-4xl">Login</h1>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 text-gray-700 text-black">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="border border-gray-400 rounded-md p-2 w-full focus:outline-none  text-black focus:ring-2 focus:ring-blue-300"
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

        <div className="mb-6 ">
          <label htmlFor="password" className="block mb-1 text-black ">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="border border-gray-400  text-black rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
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
onClick={() => {
  const enteredEmail = formik.values.email.trim().toLowerCase();
  const enteredPassword = formik.values.password;

  const user = employee.find((emp) =>
    emp.email.trim().toLowerCase() === enteredEmail &&
    emp.motdepasse === enteredPassword
  );

  if (user) {
    setIsAuthenticated(true);

    if (user.type === "Admin") {
      navigate("./dashboard/admin", { replace: true });
      toast.success("Login successful!", { duration: 4000 });
    } else if (user.type === "Responsable") {
      navigate("/dashboard/responsable", { replace: true });
      toast.success("Login successful!", { duration: 4000 });
    } else if (user.type === "Employee") {
      navigate("/dashboard/employee", { replace: true });
      toast.success("Login successful!", { duration: 4000 });
    } else {
      toast.error("Unknown user type", { duration: 4000 });
      navigate("/", { replace: true });
    }
  } else {
    toast.error("Invalid email or password", { duration: 4000 });
  }
}}


          className="w-full bg-blue-400 text-white font-bold py-2 px-4 rounded hover:bg-blue-500"
        >
          Login
        </button>
      </form>
    </div>
  </div>
);

}

export default Login;
