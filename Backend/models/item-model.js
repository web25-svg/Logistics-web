const containerModel = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    "Item",
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      item_unique_key: {
        type: DataTypes.INTEGER,
        // unique:true, //problem
        allowNull: true,
      },

      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "Unnamed",
      },

      mark: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "NoMark",
      },

      packing_description: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "No description",
      },

      cargo_type_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        // defaultValue: 0,
      },

      brand_type: {
        type: DataTypes.ENUM("Branded", "Non-Branded"),
        allowNull: false,
        defaultValue: "Non-Branded",
      },

      created_by_user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        // defaultValue: 1236789, // Jab tak `users` table banay
      },

      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "0 => Inactive, 1 => Active",
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
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
      tableName: "items",
      timestamps: false,
    }
  );

  return Item;
};

export default containerModel;
