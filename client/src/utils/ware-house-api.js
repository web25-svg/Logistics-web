import Api from "../services/axios.js";

// Item api integraction
export const getAllWareHouses = async () => {
  const response = await Api.get(`/api/v1/get-all-warehouses`);
  return response?.data;
};

export const createWareHouse = async (itemData) => {
  const response = await Api.post(`/api/v1/create-warehouse`, itemData);
  console.log('Response in createContainerItem :', response?.data);
  
  return response?.data;
};

export const updateWareHouse = async (id, itemData) => {
  const response = await Api.put(`/api/v1/update-warehouse/${id}`, itemData);
  return response?.data;
};

export const deleteWareHouse = async (id) => {
  const response = await Api.delete(`/api/v1/delete-warehouse/${id}`);
  return response?.data;
};
