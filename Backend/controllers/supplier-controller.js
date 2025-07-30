import db from "../models/index.js";
const Item = db.suppliers;

const createSupplier = async (req, res) => {
  try {
    const { name, address, marka, created_by_user_id, status } = req.body;

    const statusNumber = Number(status);

    if (
      !name ||
      !address ||
      !marka ||
      !created_by_user_id ||
      (statusNumber !== 0 && statusNumber !== 1)
    ) {
      return res.status(400).json({
        message: "All fields are required except status (defaults to 1)",
        example: {
          name: "Item Name",
          address: "Item Address",
          marka: "Item Marka",
          created_by_user_id: 1,
          status: 1,
        },
      });
    }

    const newItem = await Item.create({
      name,
      address,
      marka,
      created_by_user_id,
      status: statusNumber,
    });

    return res.status(201).json({
      message: "Supplier created successfully",
      newItem,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating supplier",
      error: error.message,
    });
  }
};

const getAllSuppliers = async (req, res) => {
  try {
    const items = await Item.findAll({
      order: [["created_at", "DESC"]],
    });

    if (!items || items.length === 0) {
      return res.status(404).json({ message: "No items found" });
    }

    return res.status(200).json({
      message: "Supplier fetched successfully",
      count: items.length,
      items,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching supplier",
      error: error.message,
    });
  }
};

const getSingleSupplier = async (req, res) => {
  const { supplierId } = req.params;
  try {
    const supplier = await Item.findByPk(supplierId);
       
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    return res.status(200).json({
      message: "Supplier fetched successfully",
      supplier,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching supplier",
      error: error.message,
    });
  }
};

const updateSupplier = async (req, res) => {
  const { supplierId } = req.params;
  try {
    const updated = await Item.update(req.body, { where: { id: supplierId } });

    if (!updated || updated[0] === 0) {
      return res
        .status(404)
        .json({ message: "Supplier not found or nothing to update ❌" });
    }

    return res
      .status(200)
      .json({ message: "Supplier updated successfully ✅" });
  } catch (error) {
    return res.status(500).json({ message: "Error ❌", error: error.message });
  }
};

const deleteSupplier = async (req, res) => {
  const { supplierId } = req.params;
  try {
    const deleted = await Item.destroy({ where: { id: supplierId } });

    if (!deleted || deleted[0] === 0) {
      return res
        .status(404)
        .json({ message: "Supplier not found or already deleted ❌" });
    }

    return res
      .status(200)
      .json({ message: "Supplier deleted successfully ✅" });
  } catch (error) {
    return res.status(500).json({ message: "Error ❌", error: error.message });
  }
};

export {
  createSupplier,
  getAllSuppliers,
  getSingleSupplier,
  updateSupplier,
  deleteSupplier,
};
