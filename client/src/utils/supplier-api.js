import Api from "../services/axios.js";

// Supplier api integraction
export const getAllSuppliers = async () => {
  const response = await Api.get(`/api/v1/get-all-suppliers`);
  return response?.data;
};

export const createSupplier = async (itemData) => {
  const response = await Api.post(`/api/v1/create-supplier`, itemData);
  console.log('Response in createContainerItem :', response?.data);
  
  return response?.data;
};

export const updateSupplier = async (id, itemData) => {
  const response = await Api.put(`/api/v1/update-supplier/${id}`, itemData);
  return response?.data;
};

export const deleteSupplier = async (id) => {
  const response = await Api.delete(`/api/v1/delete-supplier/${id}`);
  return response?.data;
};
