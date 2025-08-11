import express from "express";
import {
  createPort,
  getAllPorts,
  getSinglePort,
  updatePort,
  deletePort,
} from "../controllers/air-port-controller.js";

const router = express.Router();

// Routes
router.post("/create-air-port", createPort);
router.get("/get-all-air-ports", getAllPorts);
router.get("/get-single-air-port/:portId", getSinglePort);
router.put("/update-air-port/:portId", updatePort);
router.delete("/delete-air-port/:portId", deletePort);

export default router;
