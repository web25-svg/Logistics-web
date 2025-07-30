import db from "../models/index.js";
const warehouse = db.warehouse;


const createWarehouse = async (req, res) => {
  try {
    const { name, address, created_by_user_id, status } = req.body;

    const statusNumber = Number(status);

    if (
      !name ||
      !address ||
      !created_by_user_id ||
      (statusNumber !== 0 && statusNumber !== 1)
    ) {
      return res.status(400).json({
        message: "All fields are required except status (defaults to 1)",
        example: {
          name: "Main Warehouse",
          address: "Some Address",
          created_by_user_id: 123456,
          status: 1,
        },
      });
    }

    const newItem = await warehouse.create({
      name,
      address,
      created_by_user_id,
      status: statusNumber,
    });

    return res.status(201).json({
      message: "Warehouse created successfully ✅",
      newItem,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating warehouse ❌",
      error: error.message,
    });
  }
};

const getAllWarehouses = async (req, res) => {
  try {
    const items = await warehouse.findAll({
      // where: { deleted_at: null },
      // order: [["created_at", "DESC"]],
    });

    if (!items || items.length === 0) {
      return res.status(404).json({ message: "No warehouses found" });
    }

    return res.status(200).json({
      message: "Warehouses fetched successfully ✅",
      count: items.length,
      items,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching warehouses ❌",
      error: error.message,
    });
  }
};

const getSingleWarehouse = async (req, res) => {
  const { warehouseId } = req.params;
  try {
    const item = await warehouse.findOne({
      where: { id: warehouseId},
    });

    if (!item) {
      return res.status(404).json({ message: "Warehouse not found ❌" });
    }

    return res.status(200).json({
      message: "Warehouse fetched successfully ✅",
      item,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching warehouse ❌",
      error: error.message,
    });
  }
};

const updateWarehouse = async (req, res) => {
  const { warehouseId } = req.params;
  try {
    const updated = await warehouse.update(req.body, {
      where: { id: warehouseId }
    });

    if (!updated || updated[0] === 0) {
      return res
        .status(404)
        .json({ message: "Warehouse not found or nothing to update ❌" });
    }

    return res
      .status(200)
      .json({ message: "Warehouse updated successfully ✅" });
  } catch (error) {
    return res.status(500).json({ message: "Error ❌", error: error.message });
  }
};

const deleteWarehouse = async (req, res) => {
  const { warehouseId } = req.params;
  try {
    const deleted = await warehouse.destroy(
      { where: { id: warehouseId } }
    );

    if (!deleted || deleted[0] === 0) {
      return res
        .status(404)
        .json({ message: "Warehouse not found or already deleted ❌" });
    }

    return res
      .status(200)
      .json({ message: "Warehouse deleted successfully ✅" });
  } catch (error) {
    return res.status(500).json({ message: "Error ❌", error: error.message });
  }
};

export {
  createWarehouse,
  getAllWarehouses,
  getSingleWarehouse,
  updateWarehouse,
  deleteWarehouse,
};
