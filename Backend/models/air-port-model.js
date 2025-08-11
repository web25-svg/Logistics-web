const airPortModel = (sequelize, DataTypes) => {
  const Port = sequelize.define(
    "Port",
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

      descrption: {
        type: DataTypes.STRING(255),
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
      tableName: "air_ports",
      timestamps: false,
    }
  );

  return Port;
};

export default airPortModel;
