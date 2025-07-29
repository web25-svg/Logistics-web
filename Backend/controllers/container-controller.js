import db from "../models/index.js";
const Container = db.containers;

const createContainer = async (req, res) => {
  try {
    const {
      container_tracking_id,
      released_at,
      expected_arrival_at,
      created_by_user_id,
      status,
    } = req.body;

    let statusNumber = Number(status)
  
    

    if (
      !container_tracking_id ||
      !released_at ||
      !expected_arrival_at ||
      !created_by_user_id ||
      (statusNumber !== 1 && statusNumber !== 0)
    ) {
      res.status(400);
      res.send(`Required parameters missing.

            Example request body:
        {
        container_tracking_id: "ABC123456",
        released_at: "2025-07-28",
        expected_arrival_at: "2025-08-05",
        created_by_user_id: 1,
        status: 0 || 1
        }`);

      return;
    }

    const newContainer = await Container.create({
      container_tracking_id,
      released_at,
      expected_arrival_at,
      created_by_user_id,
      statusNumber,
    });

    return res.status(200).json({
      message: "Container created successfully",
      newContainer,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const findAllContainer = async (req, res) => {
  try {
    const findAllContainer = await Container.findAll({});
    if (!findAllContainer) {
      return res.status(404).json({
        message: "Container not found",
      });
    }
    return res.status(200).json({
      message: "Get all container successfully",
      findAllContainer,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getSingleUser = async (req, res) => {
  const { containerId } = req.params;

  try {
    const findSingleContainer = await Container.findByPk(containerId);

    if (!findSingleContainer) {
      return res.status(404).json({
        message: `Container not found in this ID`,
      });
    }

    return res.status(200).json({
      message: "Get single container successful",
      findSingleContainer,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updateContainer = async (req, res) => {
  const { containerId } = req.params;

  try {
    const container = await Container.update(req.body, {
      where: { id: containerId },
    });

    if (!container) {
      return res.status(404).json({
        message: "Container not found",
      });
    }

    return res.status(200).json({
      message: "Container updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const deleteContainer = async (req, res) => {
  const { containerId } = req.params;
  try {
    const deleteUser = await Container.destroy({ where: { id: containerId } });
    return res.status(200).json({
      message: "Container deleted successfully",
      deleteUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export { createContainer, findAllContainer, getSingleUser, updateContainer, deleteContainer };
