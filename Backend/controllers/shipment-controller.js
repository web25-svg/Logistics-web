import db from "../models/index.js";
const Shipment = db.shipments;
const ShipmentItem = db.shipment_items;

const createShipment = async (req, res) => {
  const t = await db.connection.transaction();

  try {
    let {
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
      shipment_items,
    } = req.body;

    const statusNumber = Number(status);

    if (typeof shipment_items === "string") {
      shipment_items = JSON.parse(shipment_items);
    } else {
      shipment_items = req.body.shipment_items || [];
    }

    console.log("Req.body data: ", req.body);

    const fileUploadPath = req.files?.air_way_bill_image?.[0]?.filename || null;

    // ✅ Step 1: Create Shipment
    const newShipment = await Shipment.create(
      {
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
      },
      { transaction: t }
    );

    // Step 2: Create shipment items
    if (shipment_items.length > 0) {
      const mappedItems = shipment_items.map((item) => ({
        ...item,
        shipment_id: newShipment.id,
        created_at: new Date(),
      }));
      await ShipmentItem.bulkCreate(mappedItems, { transaction: t });
    }

    await t.commit();
    return res.status(201).json({
      message: "Shipment & items created successfully ✅",
      shipment: newShipment,
    });

  } catch (error) {
    await t.rollback();
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
          attributes: ["id", "name"],
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
          // attributes: ["id", "name", "email"],
        },
        {
          model: db.users,
          as: "created_by_user",
          // attributes: ["id", "username", "email"],
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
    let {
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

    if (typeof shipment_items === "string") {
      shipment_items = JSON.parse(shipment_items);
    } else {
      shipment_items = req.body.shipment_items || [];
    }

    const fileUploadPath = req.files?.air_way_bill_image?.[0]?.filename || null;

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
    if (Array.isArray(shipment_items)) {
      for (const item of shipment_items) {
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
  const t = await db.connection.transaction(); // transaction start
  try {
    const { shipmentId } = req.params;

    // Step 1: Soft delete shipment
    const [affectedRows] = await Shipment.update(
      { deleted_at: new Date() },
      {
        where: { id: shipmentId, deleted_at: null },
        transaction: t
      }
    );

    if (!affectedRows) {
      await t.rollback();
      return res.status(404).json({ message: "Shipment not found ❌" });
    }

    // Step 2: Soft delete related shipment items
    await ShipmentItem.update(
      { deleted_at: new Date() },
      {
        where: { shipment_id: shipmentId, deleted_at: null },
        transaction: t
      }
    );

    await t.commit();
    return res.status(200).json({
      message: "Shipment and related items soft-deleted successfully ✅"
    });

  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      message: "Error deleting shipment ❌",
      error: error.message
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
