// src/utils/api.js
// Mock API functions - replace with actual API calls in a real application

import Api from "../services/axios.js";

export const fetchItems = async () => {
  const response = await Api.get(`/api/v1/get-all-containers`);
  return response?.data;
};

export const createItem = async (itemData) => {
  const response = await Api.post(`/api/v1/create-container`, itemData);
  return response?.data;
};

export const updateItem = async (id, itemData) => {
  const response = await Api.put(`/api/v1/update-container/${id}`, itemData);
  return response?.data;
};

export const deleteItem = async (id) => {
  const response = await Api.delete(`/api/v1/delete-container/${id}`);
  return response?.data;
};
