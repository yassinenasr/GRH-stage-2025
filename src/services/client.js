import axios from "axios";
import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export const getDecryptedToken = () => {
  const encryptedToken = localStorage.getItem("authToken");
  if (!encryptedToken) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Failed to decrypt token:", error);
    return null;
  }
};

const api = axios.create({
  baseURL: "http://localhost:3537", // backend
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});


api.interceptors.request.use((config) => {
  const token = getDecryptedToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getRequest = async (url) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const postRequest = async (url, data) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data?.result) {
      throw error.response.data.result;
    } else {
      throw { message: "Erreur réseau ou serveur", status: 500 };
    }
  }
};

export const deleteRequest = async (url) => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};

export const putRequest = async (url, data) => {
  try {
    const response = await api.put(url, data);
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};
