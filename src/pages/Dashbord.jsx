import React from "react";
import { useAuth } from "../contexts/AuthenticateProvider";
import { TbUser, TbLogout2 } from "react-icons/tb";
import { CiShoppingTag } from "react-icons/ci";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Dashbord() {
  const navigate = useNavigate();
  const {
    logOut,
    userInfo: { firstName, lastName },
  } = useAuth();

  const handleLogout = () => {
    logOut(); 
    navigate("/", { replace: true }); 
  };
  return (
    <div className="  bg-lightColor-300 dark:bg-grayshade-300 flex flex-col xl:flex-row justify-between text-black dark:text-white">
      {/* <aside className="xl:w-3/12 w-full min-w-max h-max p-14 bg-lightColor-100 dark:bg-grayshade-500 rounded-xl">
        <ul className="flex flex-col font-bold text-2xl [&>li]:list [&>a]:list [&>li]:p-4 [&>a]:p-4">
          <Link to={"my-account"}>
            <TbUser className="mr-2" />
            <li>Profil</li>
          </Link>

          <Link to={"my-orders"}>
            <CiShoppingTag className="mr-2" />
            <li>Dashboard</li>
          </Link>

          <hr className="mt-2 pt-2 border-t border-grayshade-200 dark:border-grayshade-200" />
          <li onClick={() => logOut()}>
            <TbLogout2 className="mr-2" />
            <span>Logout</span>
          </li>
        </ul>
      </aside> */}
      <div className=" w-full   bg-lightColor-100 dark:bg-grayshade-500 rounded-xl">
        <div className="text-3xl ">
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
