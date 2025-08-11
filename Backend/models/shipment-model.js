const shipmentModel = (sequelize, DataTypes) => {
  const Shipment = sequelize.define(
    "Shipment",
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      shipment_tracking_id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
      },

      recipt_no: {
        type: DataTypes.TEXT,
        allowNull: false,
        collate: "utf8mb4_unicode_ci",
      },

      recieved_from: {
        type: DataTypes.TEXT,
        allowNull: false,
        collate: "utf8mb4_unicode_ci",
      },

      marka: {
        type: DataTypes.STRING(255),
        allowNull: false,
        collate: "utf8mb4_unicode_ci",
      },

      client_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },

      fully_loading_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },

      created_by_user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },

      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: "0 ⇒ In active not deleted, 1 ⇒ Active",
      },

      air_way_bill_image: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      total_kgs: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      total_cartons: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      total_cbm: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      receiving_airport_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },

      rate: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      total_receivable_amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      description: {
        type: DataTypes.STRING(1000),
        allowNull: true,
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
        // defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },

      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      tableName: "shipments",
      timestamps: false,
      // paranoid: true,
      // deleted_at: null,
    }
  );

  // ✅ RELATIONSHIP SETUP
  Shipment.associate = (models) => {
    // Receiving Airport Relation
    Shipment.belongsTo(models.ports, {
      foreignKey: "receiving_airport_id",
      as: "receiving_airport",
    });

    // Shipment Items Relation
    Shipment.hasMany(models.shipment_items, {
      foreignKey: "shipment_id",
      as: "shipment_items",
    });

    // Client Relation
    Shipment.belongsTo(models.clients, {
      foreignKey: "client_id",
      as: "client",
    });

    // Created By User Relation
    Shipment.belongsTo(models.users, {
      foreignKey: "created_by_user_id",
      as: "created_by_user",
    });
  };

  return Shipment;
};

export default shipmentModel;
