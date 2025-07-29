import express from "express";
import {
  createItem,
  getAllItems,
  getSingleItem,
  updateItem,
  deleteItem,
} from "../controllers/item-controller.js";

const router = express.Router();

router.post("/create-item", createItem);
router.get("/get-all-items", getAllItems);
router.get("/get-single-item/:itemId", getSingleItem);
router.put("/update-item/:itemId", updateItem);
router.delete("/delete-item/:itemId", deleteItem);

export default router;
