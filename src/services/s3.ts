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

export const uploadImageToS3 = async (imageUrl: string) => {
  try {
    const fileContent = await fetchImage(imageUrl);

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
    const ImageUrl = data.Location;

    return ImageUrl;
  } catch (error) {
    console.error("Error uploading image to S3:", error);
    throw error;
  }
};
