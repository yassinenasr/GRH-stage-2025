import React, { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import api from "../services/axiosConfig";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function AuthenticateProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ Add loading
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await api.get("/auth/logout", { withCredentials: true });
    } catch (e) {
      console.error("Logout error", e);
    }
    removeCookie("token", { path: "/" });
    setUserInfo(null);
    setIsAuthenticated(false);
    navigate("/home"); // 👈 safer redirect
  };

  useEffect(() => {
    const verifySession = async () => {
      try {
        const { data } = await api.get("/", { withCredentials: true });
        const { status, userInfo } = data;

        if (status) {
          setUserInfo(userInfo);
          setIsAuthenticated(true);
        } else {
          logOut();
        }
      } catch (error) {
        console.error("Session check failed", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // ✅ End loading regardless
      }
    };

    verifySession();
  }, []);

  return (
    <AuthContext.Provider
  value={{
    isAuthenticated,
    setIsAuthenticated, // ✅ Add this line
    userInfo,
    logOut,
    loading,
  }}
>
  {children}
</AuthContext.Provider>

  );
}

export default AuthenticateProvider;
