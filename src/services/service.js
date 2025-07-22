import { getRequest,putRequest , deleteRequest , postRequest } from "./client";
const APIS_URL = "http://localhost:3000";
const AUTH_URL = "/login";
export const login = async (email, mot_de_passe) => {
  const result = await postRequest(APIS_URL + AUTH_URL, { email, mot_de_passe }).then((response) => response.result);
  
  localStorage.setItem("matricule", result.employee.matricule);
  
  return result;
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
export const addDemande = async (demande) => {
  return await postRequest(APIS_URL + "/demandes", demande).then(res => res);
}
