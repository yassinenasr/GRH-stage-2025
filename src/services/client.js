import axios from 'axios';

export const getRequest =async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    } 
}

export const postRequest = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    // Check if the server responded with a result object
    if (error.response && error.response.data && error.response.data.result) {
      throw error.response.data.result;
    } else {
      // Generic fallback
      throw { message: "Erreur réseau ou serveur", status: 500 };
    }
  }
};

export const deleteRequest =async (url) => {
    return axios.delete(url)
        .then(response => response.data)
        .catch(error => {
            console.error('Error deleting data:', error);
            throw error;
        });
}
export const putRequest =async (url,data) =>{
    return axios.put(url, data)
        .then(response => response.data)
        .catch(error => {
            console.error('Error updating data:', error);
            throw error;
        });
}