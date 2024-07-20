import { Router } from "express";
import { PredictionController } from "@controllers";
import { authMiddleware } from "@middleware";

const predictionRoutes = Router();

predictionRoutes.get("/", authMiddleware, PredictionController.getUserPredictions);
predictionRoutes.get("/current", authMiddleware, PredictionController.getCurrentPrice);
predictionRoutes.post("/", authMiddleware, PredictionController.addPrediction);

export default predictionRoutes;
