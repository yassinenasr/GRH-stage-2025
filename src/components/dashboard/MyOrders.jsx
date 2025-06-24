import React, { useEffect, useState } from "react";
import api from "../../services/axiosConfig";
import { useAuth } from "../../contexts/AuthenticateProvider";
import EmptyOrders from "../EmptyOrders";
import { TailSpin } from "react-loader-spinner";

const MyOrders = () => {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    const getOrders = async () => {
      api.get("/user/myorders").then(({ data, status }) => {
        if (status === 204) setIsloading(false);
        setOrders(data);
        setIsloading(false);
      });
    };
    if (isAuthenticated) getOrders();
  }, []);

  return (
    "hello"
  );
};

export default MyOrders;
