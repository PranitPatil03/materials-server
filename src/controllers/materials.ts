import { Request, Response } from "express";
import { MaterialType } from "../services/types";
import { Materials } from "../models/Materials";
import { uploadImageToS3 } from "../services/s3";

/**
 * Retrieves all materials from the database and sends a JSON response.
 * @param {import('express').Request} req - The Express Request object.
 * @param {import('express').Response} res - The Express Response object.
 * @returns {Promise<void>} Retrieves all materials from the database in JSON format.
 */

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

/**
 * Retrieves a material from the database by its ID and sends a JSON response.
 * @param {import('express').Request} req - The Express Request object containing the material ID in req.params.id.
 * @param {import('express').Response} res - The Express Response object used to send JSON responses.
 * @returns {Promise<void>} Retrieves a material from the database by its ID and sends a JSON result.
 */

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

/**
 * Creates a new material in the database with the provided details and uploads the image to S3.
 * @param {import('express').Request} req - The Express Request object containing the material details in req.body.
 * @param {import('express').Response} res - The Express Response object used to send JSON responses.
 * @returns {Promise<void>} Creates a new material in the database with the provided details and uploads the image to S3.
 */

export const createMaterial = async (req: Request, res: Response) => {
  const { name, technology, colors, pricePerGram, imageUrl } = req.body;

  try {
    if (!imageUrl) {
      return res
        .status(400)
        .json({ message: "Image URL or reference is required" });
    }

    const uploadedImageUrl = await uploadImageToS3(imageUrl);

    const newMaterial = new Materials({
      name,
      technology,
      colors,
      pricePerGram,
      imageUrl: uploadedImageUrl,
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

/**
 * Updates a material in the database by its ID with the provided details.
 * @param {import('express').Request} req - The Express Request object containing the material ID in req.params.id and update details in req.body.
 * @param {import('express').Response} res - The Express Response object used to send JSON responses.
 * @returns {Promise<void>} Updates a material in the database by its ID with the provided details..
 */

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

/**
 * Deletes a material from the database by its ID.
 * @param {import('express').Request} req - The Express Request object containing the material ID in req.params.id.
 * @param {import('express').Response} res - The Express Response object used to send JSON responses.
 * @returns {Promise<void>} Deletes a material from the database by its ID..
 */

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
