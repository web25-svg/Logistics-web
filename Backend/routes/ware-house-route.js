import express from "express";
import {
  createWarehouse,
  getAllWarehouses,
  getSingleWarehouse,
  updateWarehouse,
  deleteWarehouse,
} from "../controllers/ware-house-controller.js";

const router = express.Router();

router.post("/create-warehouse", createWarehouse);

router.get("/get-all-warehouses", getAllWarehouses);

router.get("/get-single-warehouse/:warehouseId", getSingleWarehouse);

router.put("/update-warehouse/:warehouseId", updateWarehouse);

router.delete("/delete-warehouse/:warehouseId", deleteWarehouse);

export default router;
