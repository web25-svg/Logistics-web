import express from "express";
import {
  createShipmentItem,
  getAllShipmentItems,
  getSingleShipmentItem,
  updateShipmentItem,
  deleteShipmentItem,
} from "../controllers/shipment-item-controller.js";

const router = express.Router();

router.post("/create-shipment-item", createShipmentItem);

router.get("/get-all-shipment-items", getAllShipmentItems);

router.get("/get-single-shipment-item/:id", getSingleShipmentItem);

router.put("/update-shipment-item/:id", updateShipmentItem);

router.delete("/delete-shipment-item/:id", deleteShipmentItem);

export default router;
