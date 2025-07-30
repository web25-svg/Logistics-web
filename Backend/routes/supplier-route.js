import express from "express";
import {
  createSupplier,
  getAllSuppliers,
  getSingleSupplier,
  updateSupplier,
  deleteSupplier,
} from "../controllers/supplier-controller.js";

const router = express.Router();

router.post("/create-supplier", createSupplier);

router.get("/get-all-suppliers", getAllSuppliers);

router.get("/get-single-supplier/:supplierId", getSingleSupplier);

router.put("/update-supplier/:supplierId", updateSupplier);

router.delete("/delete-supplier/:supplierId", deleteSupplier);

export default router;