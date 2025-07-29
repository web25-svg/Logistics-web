// src/utils/api.js

import Api from "../services/axios.js";


// Container api integraction
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


// Item api integraction
export const getAllContainerItems = async () => {
  const response = await Api.get(`/api/v1/get-all-items`);
  return response?.data;
};

export const createContainerItem = async (itemData) => {
  const response = await Api.post(`/api/v1/create-item`, itemData);
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
