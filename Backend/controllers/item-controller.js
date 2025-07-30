import db from "../models/index.js";
const Item = db.items;

const createItem = async (req, res) => {
  try {
    const {
      item_unique_key,
      name,
      mark,
      packing_description,
      cargo_type_id,
      brand_type,
      created_by_user_id,
      status,
    } = req.body;

    // Convert and validate
    const statusNumber = Number(status);
    const allowedBrands = ["Branded", "Non-Branded"];

    if (
      !item_unique_key ||
      !name ||
      !mark ||
      !packing_description ||
      !cargo_type_id ||
      !brand_type ||
      !created_by_user_id ||
      (statusNumber !== 0 && statusNumber !== 1) ||
      !allowedBrands.includes(brand_type)
    ) {
      return res.status(400).send(`
        ❌ Required parameters are missing or invalid.

        ✅ Example body:
        {
          "item_unique_key": 101,
          "name": "T-shirt",
          "mark": "TS100",
          "packing_description": "Packed in box",
          "cargo_type_id": 1,
          "brand_type": "Branded",
          "created_by_user_id": 1,
          "status": 1
        }
      `);
    }

    const newItem = await Item.create({
      item_unique_key,
      name,
      mark,
      packing_description,
      cargo_type_id,
      brand_type,
      created_by_user_id,
      status: statusNumber,
    });

    return res.status(200).json({
      message: "Item created successfully ✅",
      newItem,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error ❌",
      error: error.message,
    });
  }
};

const getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll({});
    if (!items || items.length === 0) {
      return res.status(404).json({ message: "No items found ❌" });
    }
    return res.status(200).json({
      message: "Items fetched successfully ✅",
      items,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error ❌", error: error.message });
  }
};

const getSingleItem = async (req, res) => {
  const { itemId } = req.params;
  try {
    const item = await Item.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found ❌" });
    }
    return res.status(200).json({
      message: "Item found ✅",
      item,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error ❌", error: error.message });
  }
};

const updateItem = async (req, res) => {
  const { itemId } = req.params;
  try {
    const updated = await Item.update(
      {
        ...req.body,
        updated_at: new Date(),
      },
      {
        where: { id: itemId, deleted_at: null },
      }
    );
    if (!updated || updated[0] === 0) {
      return res
        .status(404)
        .json({ message: "Item not found or nothing to update ❌" });
    }
    return res.status(200).json({ message: "Item updated successfully ✅" });
  } catch (error) {
    return res.status(500).json({ message: "Error ❌", error: error.message });
  }
};

const deleteItem = async (req, res) => {
  const { itemId } = req.params;
  try {
    const [affectedRows] = await Item.update(
      { deleted_at: new Date() },
      { where: { id: itemId, deleted_at: null } }
    );

    if (affectedRows === 0) {
      return res.status(404).json({ message: "Item not found ❌" });
    }

    return res.status(200).json({ message: "Item deleted successfully ✅" });
  } catch (error) {
    return res.status(500).json({ message: "Error ❌", error: error.message });
  }
};

export { createItem, getAllItems, getSingleItem, updateItem, deleteItem };
