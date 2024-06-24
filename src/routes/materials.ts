import express from "express";
import {
  createMaterial,
  deleteMaterial,
  getAllMaterials,
  getMaterialById,
  updateMaterialById,
} from "../controllers/materials";

export const materialRouter = express.Router();

materialRouter
  .get("/", getAllMaterials)
  .get("/:id", getMaterialById)
  .post("/", createMaterial)
  .put("/:id", updateMaterialById)
  .delete("/:id", deleteMaterial);
