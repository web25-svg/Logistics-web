const shipmentItemModel = (sequelize, DataTypes) => {
  const ShipmentItem = sequelize.define(
    "shipment_items",
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      shipment_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        // defaultValue: 19,
      },
      item_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        defaultValue: 2,
      },
      cargo_type_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        // defaultValue: 1,
      },
      cartons_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cbm: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      per_quantity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      specification: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      packing_remarks: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      brand_type: {
        type: DataTypes.ENUM("Branded", "Non-Branded"),
        allowNull: false,
      },
      created_by_user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        // defaultValue: 1,
      },
      is_loaded: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
      },
      container_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        defaultValue: null,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: "0 => Inactive / not deleted, 1 => Active",
      },
      shipment_client_status_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
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
      tableName: "shipment_items",
      timestamps: false,
    }
  );

  // ✅ RELATIONS
  ShipmentItem.associate = (models) => {
    ShipmentItem.belongsTo(models.shipments, {
      foreignKey: "shipment_id",
      as: "shipment",
    });

    ShipmentItem.belongsTo(models.items, {
      foreignKey: "item_id",
      as: "item",
    });

    ShipmentItem.belongsTo(models.containers, {
      foreignKey: "container_id",
      as: "container",
    });

    ShipmentItem.belongsTo(models.users, {
      foreignKey: "created_by_user_id",
      as: "created_by_user",
    });

    // ShipmentItem.belongsTo(models.clients, {
    //   foreignKey: "shipment_client_status_id",
    //   as: "shipment_client_status",
    // });

    // Agar tumhara paas `cargo_types` table/model hai to yeh bhi bana lo:
    // ShipmentItem.belongsTo(models.cargo_types, {
    //   foreignKey: "cargo_type_id",
    //   as: "cargo_type",
    // });
  };

  return ShipmentItem;
};

export default shipmentItemModel;
