import Api from "../services/axios.js";
import { toast } from "react-hot-toast";

export const getAllShipmentItems = async () => {
  try {
    const response = await Api.get(`/api/v1/get-all-shipment-items`);
    return response?.data;
  } catch (error) {
    toast.error(error.response.data.message || "Error in get all shipments item");
  }
};

export const createShipmentItem = async (itemData) => {
  try {
    const response = await Api.post(`/api/v1/create-shipment-item`, itemData);
    toast.success("Shipment item created successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error.response.data.message || "Error in create shipment item");
  }
};

export const updateShipmentItem = async (_id, itemData) => {
  try {
    const response = await Api.put(`/api/v1/update-shipment-item/${_id}`, itemData);
    toast.success("Shipment updated successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error.response.data.message || "Error in update shipment item");
  }
};

export const deleteShipmentItem = async (_id) => {
  try {
    const response = await Api.delete(`/api/v1/delete-shipment-item/${_id}`);
    toast.success("Shipment item deleted successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error.response.data.message || "Error in delete shipment item");
  }
};