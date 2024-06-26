import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const AWS_REGION = process.env.AWS_REGION;
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;

if (!AWS_ACCESS_KEY || !AWS_SECRET_KEY || !AWS_REGION || !AWS_BUCKET_NAME) {
  throw new Error(
    "AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, and AWS_BUCKET_NAME are required."
  );
}

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  region: AWS_REGION,
});

/**
 * Fetches an image from a given URL.
 * @param {string} imageUrl - The URL of the image to fetch.
 * @returns {Promise<Buffer>} A Promise that resolves with the image data as a Buffer.
 * @throws {Error} Throws an error if fetching the image fails or the status code is not 200.
 */

const fetchImage = async (imageUrl: string): Promise<Buffer> => {
  const response = await axios.get(imageUrl, {
    responseType: "arraybuffer",
  });

  if (response.status !== 200) {
    throw new Error(
      `Failed to fetch image from ${imageUrl}, status code: ${response.status}`
    );
  }

  return Buffer.from(response.data, "binary");
};

/**
 * Uploads an image fetched from a URL to AWS S3.
 * @param {string} imageUrl - The URL of the image to upload.
 * @returns {Promise<string>} A Promise that resolves with the uploaded image URL on S3.
 * @throws {Error} Throws an error if fetching the image fails or if uploading to S3 fails.
 */

export const uploadImageToS3 = async (imageUrl: string): Promise<string> => {
  const fileContent = await fetchImage(imageUrl);

  try {
    if (!fileContent) {
      throw new Error("Failed to fetch image");
    }

    const params = {
      Bucket: AWS_BUCKET_NAME,
      Key: `${uuidv4()}.jpg`,
      Body: fileContent,
    };

    const data = await s3.upload(params).promise();

    console.log("Image uploaded successfully:", data);
    const imageUrl = data.Location;

    return imageUrl;
  } catch (error) {
    console.error("Error uploading image to S3:", error);
    throw error;
  }
};
