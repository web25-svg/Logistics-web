import Api from "../services/axios.js";
import { toast } from "react-hot-toast";

export const getAllShipments = async () => {
  try {
    const response = await Api.get(`/api/v1/get-all-shipments`);
    console.log("Get all shipments:", response?.data?.shipments[0]);
    return response?.data;
  } catch (error) {
    toast.error(error.response.data.message || "Error in get all shipments");
  }
};

export const getShipmentById = async (id) => {
  try {
    const response = await Api.get(`/api/v1/get-single-shipment/${id}`);
    console.log("Get single shipment response: ", response?.data);
    return response?.data;
  } catch (error) {
    console.error("Error in getShipmentById:", error);
    toast.error(error.response.data.message || "Error in get all shipments");
  }
};

export const createShipment = async (itemData) => {
  try {
    const response = await Api.post(`/api/v1/create-shipment`, itemData);
    toast.success("Shipment created successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error.response.data.message || "Error in create shipment");
  }
};

export const updateShipment = async (id, itemData) => {
  try {
    const response = await Api.put(`/api/v1/update-shipment/${id}`, itemData);
    toast.success("Shipment updated successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error.response.data.message || "Error in update shipment");
  }
};

export const deleteShipment = async (id) => {
  try {
    const response = await Api.delete(`/api/v1/delete-shipment/${id}`);
    toast.success("Shipment deleted successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error.response.data.message || "Error in delete shipment");
  }
};
