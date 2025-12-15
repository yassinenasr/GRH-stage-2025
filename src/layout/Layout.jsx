import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

import Chatbot from "../components/Chatbot";
import AcademicChatbot from "../components/AcademicChatbot";

function Layout({ children }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/auth/login" || location.pathname === "/login";
  const isMenuPage = location.pathname === "/menu";
  const isDashboardPage = location.pathname.startsWith("/dashboard");

  if (isLoginPage || isMenuPage || isDashboardPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <Chatbot />
      <AcademicChatbot />
      <Footer />
    </>
  );
}

export default Layout;
