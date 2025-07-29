import express from "express";
import {
  createContainer,
  findAllContainer,
  getSingleUser,
  updateContainer,
  deleteContainer

} from "../controllers/container-controller.js";

const router = express.Router();

router.post("/create-container", createContainer);
router.get("/get-all-containers", findAllContainer);
router.get("/get-single-container/:containerId", getSingleUser);
router.put("/update-container/:containerId", updateContainer);
router.delete("/delete-container/:containerId", deleteContainer);

export default router;
