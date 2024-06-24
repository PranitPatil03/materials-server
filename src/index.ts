import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";

const PORT = process.env.PORT || 4000;

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/test", (req: Request, res: Response) => {
  res.send({
    status: "true",
    message: "Backend Test Route",
  });
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
