import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { userRoutes, predictionRoutes } from "@routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({}));
app.use("/api/user", userRoutes);
app.use("/api/prediction", predictionRoutes);

const PORT = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGODB_URI || "")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });


  