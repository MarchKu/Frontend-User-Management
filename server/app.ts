import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "./apps/auth";
import userRouter from "./apps/user";

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

app.get("/test", (req: Request, res: Response) => {
  res.send("API is working on test route");
});

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
