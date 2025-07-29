const containerModel = (sequelize, DataTypes) => {
  const container = sequelize.define(
    "Container",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      container_tracking_id: {
        type: DataTypes.STRING(255),
        defaultValue: "123",
        // allowNull: false,
      },

      released_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      expected_arrival_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      created_by_user_id: {
        // REFERENCE/RELATION ANOTHER TABLE
        type: DataTypes.BIGINT,
        defaultValue: 1236789,
        // allowNull: false,
      },

      status: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        // allowNull: false,
      },

      //   created_at: {
      //     type: DataTypes.DATE,
      //     allowNull: true,
      //   },

      //   updated_at: {
      //     type: DataTypes.DATE,
      //     allowNull: true,
      //   },

      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "containers",
      timestamps: false,
    }
  );

  return container;
};

export default containerModel;
