import db from "../models/index.js";
const Client = db.clients;

const createClient = async (req, res) => {
  try {
    const {
      name,
      alias,
      phone,
      whatsapp_phone,
      address,
      referral_user_id,
      created_by_user_id,
      status,
      is_active
    } = req.body;

    const statusNumber = Number(status);
    const is_activeNumber = Number(is_active);

    if (
      !name ||
      !alias ||
      !phone ||
      !whatsapp_phone ||
      !address ||
      !created_by_user_id ||
      (statusNumber !== 0 && statusNumber !== 1) ||
      (is_activeNumber !== 0 && is_activeNumber !== 1)
    ) {
      return res.status(400).json({
        message: "Missing or invalid fields ❌",
        required_fields: [
          "name",
          "alias",
          "phone",
          "whatsapp_phone",
          "address",
          "created_by_user_id",
          "is_active"
        ],
        example: {
          name: "Main Warehouse",
          alias: "MW",
          phone: "03001234567",
          whatsapp_phone: "03001234567",
          address: "Some Address",
          referral_user_id: 1234,
          created_by_user_id: 5678,
          status: 1,
          is_active: 1,
        },
      });
    }

    const newClient = await Client.create({
      name,
      alias,
      phone,
      whatsapp_phone,
      address,
      referral_user_id,
      created_by_user_id,
      status: statusNumber,
      is_active: is_activeNumber,
    });

    return res.status(201).json({
      message: "Client created successfully",
      newClient,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating client",
      error: error.message,
    });
  }
};

const getAllClients = async (req, res) => {
  try {
    const clients = await Client.findAll({
      //   where: { status: 1 }, // Active only
      //   order: [["clientId", "DESC"]],
    });

    return res.status(200).json({
      message: "Get all clients succesfully",
      clients,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching clients",
      error: error.message,
    });
  }
};

const getSingleClient = async (req, res) => {
  try {
    const { clientId } = req.params;

    const client = await Client.findByPk(clientId);
    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    return res.status(200).json({
      client,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching client",
      error: error.message,
    });
  }
};

const updateClient = async (req, res) => {
    const { clientId } = req.params;
  try {
    const updated = await Client.update(
      {
        ...req.body,
        updated_at: new Date(),
      },
      {
        where: { id: clientId, deleted_at: null },
      }
    );
console.log("updated :", updated);

    if (updated[0] === 0) {
      return res.status(404).json({
        message: "Client not found or no changes made",
      });
    }

    return res.status(200).json({
      message: "Client updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating client",
      error: error.message,
    });
  }
};

const deleteClient = async (req, res) => {
  try {
    const { clientId } = req.params;

    const [affectedRows] = await Client.update(
      {
        deleted_at: new Date(),
      },
      {
        where: { id: clientId, deleted_at: null },
      }
    );

    console.log("affectedRows: ", affectedRows);
    

    if (!affectedRows) {
      return res.status(404).json({
        message: "Client not found",
      });
    }

    return res.status(200).json({
      message: "Client deleted (soft) successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting client",
      error: error.message,
    });
  }
};

export {
  createClient,
  getAllClients,
  getSingleClient,
  updateClient,
  deleteClient,
};
