import { Request, Response } from "express";
import { MaterialType } from "../services/types";
import { Materials } from "../models/Materials";

export const getAllMaterials = async (req: Request, res: Response) => {
  try {
    const allMaterials: MaterialType[] = await Materials.find();

    if (!allMaterials) {
      return res
        .status(201)
        .json({ message: "Database doesn't contain any materials data" });
    }

    return res.status(200).json({
      materials: allMaterials,
      message: "All Materials fetch successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getMaterialById = async (req: Request, res: Response) => {
  const materialId = req.params.id;

  try {
    const material: MaterialType | null = await Materials.findById(materialId);

    if (!material) {
      return res
        .status(500)
        .json({ message: "Database doesn't contain material for this Id" });
    }

    return res.status(200).json({
      material: material,
      message: "All Materials fetch successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const createMaterial = async (req: Request, res: Response) => {
  const { name, technology, colors, pricePerGram, imageUrl } = req.body;

  try {
    const newMaterial = new Materials({
      name,
      technology,
      colors,
      pricePerGram,
      imageUrl,
    });

    const material: MaterialType = await newMaterial.save();

    if (!material) {
      return res
        .status(500)
        .json({ message: "Error in creating new material" });
    }

    return res.status(200).json({
      material: material,
      message: "Material created successfully",
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateMaterialById = async (req: Request, res: Response) => {
  const materialId = req.params.id;
  const { name, technology, colors, pricePerGram, imageUrl } = req.body;

  try {
    const updatedMaterial: MaterialType = {
      name,
      technology,
      colors,
      pricePerGram,
      imageUrl,
    };

    const material: MaterialType | null = await Materials.findByIdAndUpdate(
      materialId,
      updatedMaterial,
      { new: true }
    );

    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }

    return res.status(200).json({
      material: material,
      message: "Material updated successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteMaterial = async (req: Request, res: Response) => {
  const materialId = req.params.id;

  try {
    const material: MaterialType | null = await Materials.findByIdAndDelete(
      materialId
    );

    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }

    return res.status(200).json({
      material: material,
      message: "Material deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
