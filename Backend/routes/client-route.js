import express from "express";
import {
  getAllClients,
  getSingleClient,
  createClient,
  updateClient,
  deleteClient,
} from "../controllers/client-controller.js";

const router = express.Router();

router.post("/create-client", createClient);
router.get("/get-all-clients", getAllClients); 
router.get("/get-single-client/:clientId", getSingleClient); 
router.put("/update-client/:clientId", updateClient);
router.delete("/delete-client/:clientId", deleteClient);

export default router;
