import db from "../models/index.js";
const Shipment = db.shipments;
const ShipmentItem = db.shipment_items;
// const { Shipment, ShipmentItem } = db;

const createShipment = async (req, res) => {
  try {
    const {
      shipment_tracking_id,
      recipt_no,
      recieved_from,
      marka,
      client_id,
      fully_loading_date,
      created_by_user_id,
      status,
      total_kgs,
      total_cartons,
      total_cbm,
      rate,
      total_receivable_amount,
      description,
      receiving_airport_id,
      // shipment_items,
    } = req.body;

    const statusNumber = Number(status);

    let shipmentItems = [];
    if (req.body.shipment_items) {
      shipmentItems = JSON.parse(req.body.shipment_items);
    }

    const fileUploadPath = req.files?.air_way_bill_image?.[0]?.filename || null;

    // ✅ Step 1: Create Shipment
    const newShipment = await Shipment.create({
      shipment_tracking_id,
      recipt_no,
      recieved_from,
      marka,
      client_id,
      fully_loading_date,
      created_by_user_id,
      status: statusNumber,
      air_way_bill_image: fileUploadPath,
      total_kgs,
      total_cartons,
      total_cbm,
      rate,
      total_receivable_amount,
      description,
      receiving_airport_id,
      created_at: new Date(),
    });

    // ✅ Step 2: If shipment_items array exists, insert them with shipment_id
    if (shipmentItems && shipmentItems.length > 0) {
      const shipmentItemsWithID = shipmentItems.map((item) => ({
        ...item,
        shipment_id: newShipment.id, // 🔗 add relation
        created_at: new Date(),
      }));
      console.log("shipmentItemsWithID: ", shipmentItemsWithID);

      await ShipmentItem.bulkCreate(shipmentItemsWithID);
    }

    return res.status(201).json({
      message: "Shipment + Shipment items created successfully ✅",
      shipment: newShipment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error creating shipment ❌",
      error: error.message,
    });
  }
};

const getAllShipments = async (req, res) => {
  try {
    const shipments = await Shipment.findAll({
      where: { deleted_at: null },
      include: [
        {
          model: db.ports,
          as: "receiving_airport",
          attributes: ["id", "name"], // sirf zaruri fields
        },
        {
          model: db.shipment_items,
          as: "shipment_items",
          include: [
            {
              model: db.items,
              as: "item",
              // attributes: ["id", "name", "description"],
            },
          ],
        },

        {
          model: db.clients,
          as: "client",
          // attributes: ["id", "name", "email"], // Jo fields chahiye, ya hata bhi sakte ho attributes
        },
        {
          model: db.users,
          as: "created_by_user",
          // attributes: ["id", "username", "email"], // Jo fields chahiye
        },
      ],
      order: [["created_at", "DESC"]], // latest pehle
    });

    if (shipments.length === 0) {
      return res.status(404).json({
        message: "No shipments found ❌",
        shipments: [],
      });
    }

    return res.status(200).json({
      message: "Fetched all shipments successfully ✅",
      shipments,
    });
  } catch (error) {
    console.error("Error fetching shipments:", error);
    return res.status(500).json({
      message: "Error fetching shipments ❌",
      error: error.message,
    });
  }
};

const getSingleShipment = async (req, res) => {
  try {
    const { shipmentId } = req.params;

    const shipment = await Shipment.findOne({
      where: { id: shipmentId, deleted_at: null },
      include: [
        {
          model: db.ports,
          as: "receiving_airport",
          attributes: ["id", "name"],
        },
        {
          model: db.shipment_items,
          as: "shipment_items",
          include: [
            {
              model: db.items,
              as: "item",
              // attributes if needed
            },
            // no client or user here
          ],
        },
        {
          model: db.clients,
          as: "client",
          // attributes: ["id", "name", "email"],
        },
        {
          model: db.users,
          as: "created_by_user",
          // attributes: ["id", "username", "email"],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    if (!shipment) {
      return res.status(404).json({
        message: "Shipment not found ❌",
      });
    }

    return res.status(200).json({
      shipment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching shipment ❌",
      error: error.message,
    });
  }
};

const updateShipment = async (req, res) => {
  const { shipmentId } = req.params;
  const t = await db.connection.transaction();

  try {
    const {
      shipment_tracking_id,
      recipt_no,
      recieved_from,
      marka,
      client_id,
      fully_loading_date,
      created_by_user_id,
      status,
      total_kgs,
      total_cartons,
      total_cbm,
      receiving_airport_id,
      rate,
      total_receivable_amount,
      description,
      shipment_items,
    } = req.body;

    const statusNumber = Number(status);

    // If shipment_items is string (JSON), parse it
    let shipmentItems = shipment_items;
    if (typeof shipment_items === "string") {
      shipmentItems = JSON.parse(shipment_items);
    }

    const fileUploadPath = req.files?.air_way_bill_image?.[0]?.filename || undefined;

    // Step 1: Update Shipment main record
    const updateFields = {
      shipment_tracking_id,
      recipt_no,
      recieved_from,
      marka,
      client_id,
      fully_loading_date,
      created_by_user_id,
      status: statusNumber,
      total_kgs,
      total_cartons,
      total_cbm,
      receiving_airport_id,
      rate,
      total_receivable_amount,
      description,
      updated_at: new Date(),
    };

    if (fileUploadPath) {
      updateFields.air_way_bill_image = fileUploadPath;
    }

    const [updatedCount] = await Shipment.update(updateFields, {
      where: { id: shipmentId, deleted_at: null },
      transaction: t,
    });

    if (updatedCount === 0) {
      await t.rollback();
      return res.status(404).json({
        message: "Shipment not found or no changes made ❌",
      });
    }

    // Step 2: Update/Create shipment items if provided
    if (Array.isArray(shipmentItems)) {
      for (const item of shipmentItems) {
        if (item.id) {
          // Update existing shipment item
          await ShipmentItem.update(
            {
              ...item,
              updated_at: new Date(),
            },
            {
              where: { id: item.id, shipment_id: shipmentId },
              transaction: t,
            }
          );
        } else {
          // Create new shipment item
          await ShipmentItem.create(
            {
              ...item,
              shipment_id: shipmentId,
              created_at: new Date(),
            },
            { transaction: t }
          );
        }
      }
    }

    await t.commit();

    return res.status(200).json({
      success: true,
      message: "Shipment & items updated successfully ✅",
    });
  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      message: "Error updating shipment ❌",
      error: error.message,
    });
  }
};

const deleteShipment = async (req, res) => {
  try {
    const { shipmentId } = req.params;

    const [affectedRows] = await Shipment.update(
      {
        deleted_at: new Date(),
      },
      {
        where: { id: shipmentId, deleted_at: null },
      }
    );

    if (!affectedRows) {
      return res.status(404).json({
        message: "Shipment not found ❌",
      });
    }

    return res.status(200).json({
      message: "Shipment soft-deleted successfully ✅",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting shipment ❌",
      error: error.message,
    });
  }
};

export {
  createShipment,
  getAllShipments,
  getSingleShipment,
  updateShipment,
  deleteShipment,
};
