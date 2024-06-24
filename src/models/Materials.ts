import mongoose, { Document, Schema, Model } from "mongoose";
import { MaterialType } from "../services/types";

const MaterialSchema: Schema<MaterialType> = new Schema({
  name: { type: String, required: true },
  technology: { type: String, required: true, enum: ["FDM", "SLA", "SLS"] },
  colors: [{ type: String, required: true }],
  pricePerGram: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

export const Materials: Model<MaterialType> = mongoose.model<MaterialType>(
  "Materials",
  MaterialSchema
);
