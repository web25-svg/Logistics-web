import Api from "../services/axios.js";

// Item api integraction
export const getAllClients = async () => {
  const response = await Api.get(`/api/v1/get-all-clients`);
  return response?.data;
};

export const createClient = async (itemData) => {
  const response = await Api.post(`/api/v1/create-client`, itemData);
  console.log('Response in createContainerItem :', response?.data);
  
  return response?.data;
};

export const updateClient = async (id, itemData) => {
  const response = await Api.put(`/api/v1/update-client/${id}`, itemData);
  return response?.data;
};

export const deleteClient = async (id) => {
  const response = await Api.delete(`/api/v1/delete-client/${id}`);
  return response?.data;
};
