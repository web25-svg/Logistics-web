import express from "express";
import {
  createShipment,
  getAllShipments,
  getSingleShipment,
  updateShipment,
  deleteShipment,
} from "../controllers/shipment-controller.js";
import upload from "../middleware/multer-middleware.js";

const router = express.Router();

router.post(
  "/create-shipment",
  upload.fields([{ name: "air_way_bill_image", maxCount: 1 }]),
  createShipment
);

router.get("/get-all-shipments", getAllShipments);

router.get("/get-single-shipment/:shipmentId", getSingleShipment);

router.put(
  "/update-shipment/:shipmentId",
  upload.fields([{ name: "air_way_bill_image", maxCount: 1 }]),
  updateShipment
);

router.delete("/delete-shipment/:shipmentId", deleteShipment);

export default router;
