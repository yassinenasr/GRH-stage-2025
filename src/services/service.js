import { getRequest,putRequest , deleteRequest , postRequest } from "./client";
import CryptoJS from "crypto-js";
import axios from "axios";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
const APIS_URL = "http://localhost:3000";
const AUTH_URL = "/login";

export const login = async (email, mot_de_passe) => {
  const result = await postRequest(APIS_URL + AUTH_URL, { email, mot_de_passe }).then((response) => response.result);

  if (result?.accessToken) {
    const encryptedToken = CryptoJS.AES.encrypt(result.accessToken, SECRET_KEY).toString();
    localStorage.setItem("authToken", encryptedToken);
  }  
  return result?.accessToken;
};
export const logout = async () => {
  try {
    await postRequest(APIS_URL + "/logout", {});
    localStorage.removeItem("authToken");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to logout");
  }
};

export const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      APIS_URL + "/refresh",
      {},
      { withCredentials: true }
    );
    const newAccessToken = response.data.result.accessToken;

    if (newAccessToken) {
      const encryptedToken = CryptoJS.AES.encrypt(newAccessToken, SECRET_KEY).toString();
      localStorage.setItem("authToken", encryptedToken);
      return newAccessToken;
    }
  } catch (error) {
    console.error("Failed to refresh token", error);
    return null;
  }
};
export const changeEtatDemande = async (id) => {
  try {
    // Fix here: remove /api prefix or add base URL
    await putRequest(`${APIS_URL}/demandesT/${id}`, { etat: "accepté" });
    console.log("Mise à jour en base réussie");
  } catch (error) {
    console.error("Erreur mise à jour base :", error);
  }
}
export const changeEtatDemandeN= async (id) => {
  try {
    // Fix here: remove /api prefix or add base URL
    await putRequest(`${APIS_URL}/demandesT/${id}`, { etat: "refusé" });
    console.log("Mise à jour en base réussie");
  } catch (error) {
    console.error("Erreur mise à jour base :", error);
  }
}
export const addNewEvaluation = async (evaluation) => {
  try {
    const response = await postRequest(`${APIS_URL}/perfR`, evaluation);
    return response;
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'évaluation :", error);
    throw error;
  }
};
export const AddNewEmployee = async (employee) => {
  try {
    const response = await postRequest(`${APIS_URL}/employeeT`, employee);
    return response;
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'employé :", error);
    throw error;
  }
};
export const addNewDemande = async (demande) => {
  try {
    const response = await postRequest(`${APIS_URL}/demandes`, demande);
    return response;
  } catch (error) {
    console.error("Erreur lors de l'ajout de la demande :", error.response || error.message);
    throw error;
  }
};


//evaluation
export const deleteEvaluation = async (id) => {
  try {
    await deleteRequest(`${APIS_URL}/evaluations/${id}`);  // <-- fix here
    console.log("Évaluation supprimée avec succès");
  } catch (error) {
    console.error("Erreur lors de la suppression de l'évaluation :", error);
    throw error;
  }
};
export const deleteEmployee = async (matricule) => {
  try {
    await deleteRequest(`${APIS_URL}/employees/${matricule}`);
    console.log("Employé supprimé");
  } catch (error) {
    console.error("Erreur lors de la suppression de l'employé :", error);
    throw error;
  }
};
export const modifyEvaluation = async (employee) => {
  try {
    const response = await putRequest(`${APIS_URL}/evaluations/${employee.id}`, employee);
    return response;
  } catch (error) {
    console.error("Erreur lors de la modification de l'évaluation :", error);
    throw error;
  }
};




export const getEmployees = async () => {
  return await getRequest(APIS_URL+"/employees").then((response) => response.employees);
}
export const getCongesByMatricule = async (matricule) => {
  return await getRequest(APIS_URL+"/conges/"+matricule).then((response) => response.conges);
}
export const getDemandes = async () => {
  return await getRequest(APIS_URL+"/demandes").then((response) => response.demandes);
}
export const getDemandesByMatricule = async (matricule) => {
  return await getRequest(APIS_URL+"/demandes/"+matricule).then((response) => response.demandes);
}
export const getDemandesCountByMatricule = async (matricule) => {
  return await getRequest(APIS_URL + "/demandes/count/" + matricule).then(res => res.count);
};
export const getDemandByType = async (type) => {
  return await getRequest(APIS_URL + "/demandes/type/" + type).then(res => res.demandes);
}
export const getEvaluations = async () => {
  return await getRequest(APIS_URL + "/evaluations").then(res => res.evaluations);
}

