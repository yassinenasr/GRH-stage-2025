import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthenticateProvider";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/service";
import {
  TbUser,
  TbLogout2,
  TbLogin2,
  TbChevronDown,
} from "react-icons/tb";
import { useCartCunsumer } from "../contexts/CartProvider";

const UserActions = () => {
  const [dropDown, setDropDown] = useState(false);
  const { logOut, isAuthenticated, userInfo, loading } = useAuth();
  const {
    cartState: { ordersCount },
  } = useCartCunsumer();

  const ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setDropDown(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout(); // backend: clear session
      logOut();       // context: clear state + cookie
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // 🟡 Avoid UI flicker: Wait for auth check to complete
  if (loading) {
    return null; // or return a spinner if you prefer
  }

  return (
    <div className="flex items-center font-semibold z-20 text-black dark:text-white">
      {isAuthenticated ? (
        <>
          <button className="relative mr-2 xl:mr-4">
            <div
              ref={ref}
              onClick={() => setDropDown((prev) => !prev)}
              className="flex items-center bad dark:bg-grayshade-500 xl:px-4 px-2 text-sm xl:text-base"
            >
              <TbUser className="text-2xl xl:text-2xl" />
              <p className="hidden xl:block ml-2">
                Bienvenue{" "}
                <span className="dark:text-purpleshade-100 text-purpleshade-400">
                  {userInfo?.firstName}
                </span>
              </p>
              <TbChevronDown className="ml-1" />
            </div>

            <ul
              className={`${
                dropDown ? "block" : "hidden"
              } xl:w-full w-max bad dark:bg-grayshade-500 absolute p-4 -right-10 top-[48px] xl:right-0 xl:left-0 z-50`}
            >
              <Link to="/dashboard/admin">
                <li>Tableau de bord</li>
              </Link>
              <Link to="/dashboard/my-account">
                <li>Mon compte</li>
              </Link>
              <hr className="mt-2 pt-2 border-t border-grayshade-200 dark:border-grayshade-200" />
              <li
                onClick={handleLogout}
                className="cursor-pointer flex items-center mt-2"
              >
                <TbLogout2 className="mr-2" />
                <span>Déconnexion</span>
              </li>
            </ul>
          </button>
        </>
      ) : (
        <>
          <Link
            className="text-sm md:text-base xl:text-xl mx-2 flex items-center text-gray-800 dark:text-white"
            to="/auth/login"
          >
            <TbLogin2 className="mr-2" />
            Se Connecter
          </Link>
        </>
      )}
    </div>
  );
};

export default UserActions;
