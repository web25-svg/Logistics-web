const clientModel = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    "Client",
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      alias: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      phone: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      whatsapp_phone: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      address: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      is_active: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
      },

      referral_user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },

      created_by_user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },

      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, // 0 = Inactive, 1 = Active
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "clients",
      timestamps: false, 
    }
  );

  return Client;
};

export default clientModel;
