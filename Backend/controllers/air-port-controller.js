import db from "../models/index.js";
const Port = db.ports;

const createPort = async (req, res) => {
  try {
    const { name, descrption } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Missing required field: name ❌",
        RequiredFields: ["name"],
      });
    }

    const newPort = await Port.create({
      name,
      descrption,
      created_at: new Date(),
    });

    return res.status(201).json({
      message: "Port created successfully ✅",
      newPort,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating port ❌",
      error: error.message,
    });
  }
};

const getAllPorts = async (req, res) => {
  try {
    const ports = await Port.findAll({
      where: { deleted_at: null },
    });

    return res.status(200).json({
      message: "Fetched all ports successfully ✅",
      ports,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching ports ❌",
      error: error.message,
    });
  }
};

// Get Single Port
const getSinglePort = async (req, res) => {
  try {
    const { portId } = req.params;

    const port = await Port.findByPk(portId);

    if (!port || port.deleted_at) {
      return res.status(404).json({
        message: "Port not found ❌",
      });
    }

    return res.status(200).json({
      port,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching port ❌",
      error: error.message,
    });
  }
};

// Update Port
const updatePort = async (req, res) => {
  try {
    const { portId } = req.params;

    const [updated] = await Port.update(
      {
        ...req.body,
        updated_at: new Date(),
      },
      {
        where: { id: portId, deleted_at: null },
      }
    );

    if (updated === 0) {
      return res.status(404).json({
        message: "Port not found or no changes made ❌",
      });
    }

    return res.status(200).json({
      message: "Port updated successfully ✅",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating port ❌",
      error: error.message,
    });
  }
};

const deletePort = async (req, res) => {
  try {
    const { portId } = req.params;

    const [deleted] = await Port.update(
      {
        deleted_at: new Date(),
      },
      {
        where: { id: portId, deleted_at: null },
      }
    );

    if (deleted === 0) {
      return res.status(404).json({
        message: "Port not found ❌",
      });
    }

    return res.status(200).json({
      message: "Port soft-deleted successfully ✅",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting port ❌",
      error: error.message,
    });
  }
};

export { createPort, getAllPorts, getSinglePort, updatePort, deletePort };
