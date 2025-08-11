import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
console.log("__filename: ", __filename); // server.js

const __dirname = path.dirname(__filename);
console.log("__dirname: ", __dirname); //Backend

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Serve static files (for accessing uploaded files)
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

import containerRouter from "./routes/container-route.js";
import itemRouter from "./routes/item-route.js";
import supplierRouter from "./routes/supplier-route.js";
import wareHouseRouter from "./routes/ware-house-route.js";
import clientRouter from "./routes/client-route.js";
import userRouter from "./routes/user-route.js";
import shipmentRouter from "./routes/shipment-route.js";
import airPortRouter from "./routes/air-port-route.js";
import shipmentItemRouter from "./routes/shipment-item-route.js";

app.use("/api/v1", containerRouter);
app.use("/api/v1", itemRouter);
app.use("/api/v1", supplierRouter);
app.use("/api/v1", wareHouseRouter);
app.use("/api/v1", clientRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", shipmentRouter);
app.use("/api/v1", airPortRouter);
app.use("/api/v1", shipmentItemRouter);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

export default app;
