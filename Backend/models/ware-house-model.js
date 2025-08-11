const warehouseModel = (sequelize, DataTypes) => {
  const Warehouse = sequelize.define(
    "Warehouse",
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
        // validate: {
        //   notEmpty: {
        //     msg: "Warehouse name cannot be empty",
        //   },
        // },
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: false,
        // validate: {
        //   notEmpty: {
        //     msg: "Address cannot be empty",
        //   },
        // },
      },
      created_by_user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        // defaultValue: 1236789, // Jab tak `users` table banay
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
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
        // defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
        // defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      tableName: "warehouses",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["name"],
          where: {
            deleted_at: null,
          },
        },
      ],
    }
  );

  return Warehouse;
};

export default warehouseModel;
