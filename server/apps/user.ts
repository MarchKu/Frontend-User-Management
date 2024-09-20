import { Request, Response, Router } from "express";
import users from "../data/db";
import { userDataType } from "../data/db";

const userRouter = Router();

userRouter.get("/", async (req: Request, res: Response) => {
  try {
    return res.status(200).json(users);
  } catch {
    return res
      .status(500)
      .json({ message: "Cannot fetch get data due to server connection" });
  }
});

userRouter.get("/:id", async (req: Request, res: Response) => {
  return res.status(200);
});

userRouter.delete("/:id", async (req: Request, res: Response) => {
  return res.status(200).json(users);
});

export default userRouter;
