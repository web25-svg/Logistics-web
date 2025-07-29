import dbConfig from "../database/db.js";
import { Sequelize, DataTypes } from "sequelize";

import containerModel from "../models/container-model.js";


// Create connection
const dbConnection  = new Sequelize(
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



// ✅ Yeh step models ko DB ke sath sync karta hai
// "Mujhe sabhi models (users, products, etc.) ko database ke sath sync karo"
// { alter: true } ka matlab:
// Agar koi table structure change hua ho (column add/remove/modify), to wo structure database mai alter (update) kar do bina pura table delete kiye.
db.connection.authenticate()
  // .sync({ alter: true }) // You can use { force: true } to drop and recreate tables
  .then(() => console.log("✅ Database is Synced"))
  .catch((err) => console.error("❌ Sync failed:", err));

export default db;
