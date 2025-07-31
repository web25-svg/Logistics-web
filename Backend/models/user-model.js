const userModel = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
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

      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },

      email_verified_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },

      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      role: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 2,
      },

      last_login_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },

      status: {
        type: DataTypes.TINYINT(1),
        allowNull: true,
        defaultValue: 1,
      },

      remember_token: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null,
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
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
      tableName: "users",
      timestamps: false,
    }
  );

  return User;
};

export default userModel;
