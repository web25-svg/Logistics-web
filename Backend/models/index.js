import dbConfig from "../database/db.js";
import { Sequelize, DataTypes } from "sequelize";

import containerModel from "../models/container-model.js";
import itemModel from "../models/item-model.js";
import supplierModel from "../models/supplier-model.js";
import wareHouseModel from "../models/ware-house-model.js";
import clientModel from "../models/client-model.js";
import UserModel from "../models/user-model.js";
import airPortModel from "../models/air-port-model.js";
import shipmentModel from "../models/shipment-model.js";
import shipmentItmeModel from "./shipment-item-model.js";

// Create connection
const dbConnection = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.connection = dbConnection;

db.containers = containerModel(db.connection, DataTypes);
db.items = itemModel(db.connection, DataTypes);
db.suppliers = supplierModel(db.connection, DataTypes);
db.warehouse = wareHouseModel(db.connection, DataTypes);
db.clients = clientModel(db.connection, DataTypes);
db.users = UserModel(db.connection, DataTypes);
db.ports = airPortModel(db.connection, DataTypes);
db.shipments = shipmentModel(db.connection, DataTypes);
db.shipment_items = shipmentItmeModel(db.connection, DataTypes);

// Call associations explicitly
// if (db.shipments.associate) {
//   db.shipments.associate(db);
// }

// ✅ Automatically call associate() for all models if it exists
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// ✅ Yeh step models ko DB ke sath sync karta hai
// "Mujhe sabhi models (users, products, etc.) ko database ke sath sync karo"
// { alter: true } ka matlab:
// Agar koi table structure change hua ho (column add/remove/modify), to wo structure database mai alter (update) kar do bina pura table delete kiye.
db.connection
  .sync({ alter: true }) 
  .then(() => console.log("✅ Database is Synced"))
  .catch((err) => console.error("❌ Sync failed:", err));

export default db;
