import React from "react";
import { useAuth } from "../contexts/AuthenticateProvider";
import { TbUser, TbLogout2 } from "react-icons/tb";
import { CiShoppingTag } from "react-icons/ci";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Dashbord() {
  const navigate = useNavigate();
  const { logOut, userInfo } = useAuth();

  const firstName = userInfo?.firstName ;
  const lastName = userInfo?.lastName || "";

  const handleLogout = () => {
    logOut(); 
    navigate("/", { replace: true }); 
  };

  return (
    <div className="bg-lightColor-300 dark:bg-grayshade-300 flex flex-col xl:flex-row justify-between text-black dark:text-white">
      <div className="w-full bg-lightColor-100 dark:bg-grayshade-500 rounded-xl">
        <div className="text-3xl">
          <p>
            <span className="text-purpleshade-400 font-extrabold">
              {firstName} {lastName}
            </span>
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashbord;
