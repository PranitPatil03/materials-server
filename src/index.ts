import "dotenv/config";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { connectToDatabase } from "./services/db";
import { materialRouter } from "./routes/materials";
import express, { Request, Response } from "express";
import swaggerDocument from "./../swagger-output.json";

const PORT = process.env.PORT || 3000;

connectToDatabase();

const app = express();
app.use(express.json());
app.use(cors());  

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/materials", materialRouter);

app.get("/healthy", (req: Request, res: Response) => {
  try {
    res.send({
      status: true,
      message: "Backend is healthy",
    });
  } catch (error: any) {
    res.send({
      status: false,
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
