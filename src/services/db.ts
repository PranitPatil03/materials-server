import "dotenv/config";
import mongoose from "mongoose";

/**
 * Connects to MongoDB using Mongoose.
 * @async
 * @returns {Promise<void>} A Promise that resolves when the connection is successful.
 * @throws {Error} Throws an error if MongoDB connection URL is undefined or if connection fails.
 */

export const connectToDatabase = async (): Promise<void> => {
  try {
    const mongoURL = process.env.MONGO_URL;

    if (!mongoURL) {
      throw new Error("MongoDB connection URL is undefined.");
    }

    const options = {
      autoIndex: true,
    };

    const connection = await mongoose.connect(mongoURL, options);

    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error: any) {
    console.error("Error connecting to MongoDB", error.message);
    process.exit(1);
  }
};
