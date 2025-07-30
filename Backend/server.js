
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";


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


import containerRouter from "./routes/container-route.js";
import itemRouter from "./routes/item-route.js";
import supplierRouter from "./routes/supplier-route.js";
import wareHouseRouter from "./routes/ware-house-route.js";
import clientRouter from "./routes/client-route.js";

app.use("/api/v1", containerRouter);
app.use("/api/v1", itemRouter);
app.use("/api/v1", supplierRouter);
app.use("/api/v1", wareHouseRouter);
app.use("/api/v1", clientRouter);


const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

export default app;
