const itemModel = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    "Supplier",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "N/A",
      },
      marka: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "Unknown",
      },
      created_by_user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 1236789, // Jab tak `users` table banay
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: "0 => Inactive, 1 => Active",
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        // defaultValue: DataTypes.NOW,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
        // defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      tableName: "suppliers",
      timestamps: false, // We're manually handling timestamps
    }
  );

  return Item;
};

export default itemModel;
