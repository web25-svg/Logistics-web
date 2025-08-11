import db from "../models/index.js";
const ShipmentItem = db.shipment_items;

const createShipmentItem = async (req, res) => {
  try {
    const {
      shipment_id,
      item_id,
      cargo_type_id,
      cartons_quantity,
      weight,
      cbm,
      per_quantity,
      specification,
      packing_remarks,
      brand_type,
      created_by_user_id,
      container_id,
      shipment_client_status_id,
    } = req.body;

    // Required fields validation
    if (
      !shipment_id ||
      !item_id ||
      !cargo_type_id ||
      !cartons_quantity ||
      !weight ||
      !cbm ||
      !per_quantity ||
      !specification ||
      !packing_remarks ||
      !brand_type ||
      !created_by_user_id
    ) {
      return res.status(400).json({
        message: "Missing required fields ❌",
        required_fields: [
          "shipment_id",
          "item_id",
          "cargo_type_id",
          "cartons_quantity",
          "weight",
          "cbm",
          "per_quantity",
          "specification",
          "packing_remarks",
          "brand_type",
          "created_by_user_id",
        ],
      });
    }

    const newItem = await ShipmentItem.create({
      shipment_id,
      item_id,
      cargo_type_id,
      cartons_quantity,
      weight,
      cbm,
      per_quantity,
      specification,
      packing_remarks,
      brand_type,
      created_by_user_id,
      container_id: container_id || null,
      shipment_client_status_id: shipment_client_status_id || null,
      created_at: new Date(),
    });

    return res.status(201).json({
      message: "Shipment item created successfully ✅",
      newItem,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating shipment item ❌",
      error: error.message,
    });
  }
};

const getAllShipmentItems = async (req, res) => {
  try {
    const shipmentItems = await ShipmentItem.findAll({
      where: {
        deleted_at: null,
      },
      include: [
        { model: db.items, as: "item" },
        { model: db.containers, as: "container" },
        { model: db.shipments, as: "shipment" },
        { model: db.users, as: "created_by_user" },
      ],
    });

    return res.status(200).json({
      message: "Fetched all shipment items ✅",
      shipmentItems,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching shipment items ❌",
      error: error.message,
    });
  }
};

const getSingleShipmentItem = async (req, res) => {
  try {
    const { id } = req.params;

    const shipmentItem = await ShipmentItem.findByPk(id, {
      where: {
        deleted_at: null,
      },
      include: [
        { model: db.items, as: "item" },
        { model: db.containers, as: "container" },
        { model: db.shipments, as: "shipment" },
        { model: db.users, as: "created_by_user" },
      ],
    });

    if (!shipmentItem) {
      return res.status(404).json({
        message: "Shipment item not found ❌",
      });
    }

    return res.status(200).json({
      shipmentItem,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching shipment item ❌",
      error: error.message,
    });
  }
};

const updateShipmentItem = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await ShipmentItem.update(
      {
        ...req.body,
        updated_at: new Date(),
      },
      {
        where: {
          id,
          deleted_at: null,
        },
      }
    );

    if (updated[0] === 0) {
      return res.status(404).json({
        message: "Shipment item not found or no changes made ❌",
      });
    }

    return res.status(200).json({
      message: "Shipment item updated successfully ✅",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating shipment item ❌",
      error: error.message,
    });
  }
};

const deleteShipmentItem = async (req, res) => {
  try {
    const { id } = req.params;

    const [affectedRows] = await ShipmentItem.update(
      {
        deleted_at: new Date(),
      },
      {
        where: {
          id,
          deleted_at: null,
        },
      }
    );

    if (!affectedRows) {
      return res.status(404).json({
        message: "Shipment item not found ❌",
      });
    }

    return res.status(200).json({
      message: "Shipment item soft-deleted successfully ✅",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting shipment item ❌",
      error: error.message,
    });
  }
};

export {
  createShipmentItem,
  getAllShipmentItems,
  getSingleShipmentItem,
  updateShipmentItem,
  deleteShipmentItem,
};
