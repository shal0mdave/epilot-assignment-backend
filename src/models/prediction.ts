import mongoose, { ObjectId } from "mongoose";

export interface IPredictionDocument extends mongoose.Document {
  user: ObjectId;
  prediction: "up" | "down";
  oldValue: string;
  newValue: string;
  createdAt: Date;
  updatedAt: Date | null;
}

const predictionSchema = new mongoose.Schema<IPredictionDocument>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  prediction: { type: String, required: true },
  oldValue: { type: String, required: true },
  newValue: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
});

const Prediction = mongoose.model<IPredictionDocument>("Prediction", predictionSchema);

export default Prediction;
