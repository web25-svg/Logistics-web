import Api from "../services/axios.js";

// Item api integraction
export const getAllContainerItems = async () => {
  const response = await Api.get(`/api/v1/get-all-items`);
  return response?.data;
};

export const createContainerItem = async (itemData) => {
  const response = await Api.post(`/api/v1/create-item`, itemData);
  console.log('Response in createContainerItem :', response?.data);
  
  return response?.data;
};

export const updateContainerItem = async (id, itemData) => {
  const response = await Api.put(`/api/v1/update-item/${id}`, itemData);
  return response?.data;
};

export const deleteContainerItem = async (id) => {
  const response = await Api.delete(`/api/v1/delete-item/${id}`);
  return response?.data;
};
