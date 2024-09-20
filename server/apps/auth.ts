import express, { Request, Response, Router } from "express";
import users from "../data/db";
import jwt from "jsonwebtoken";
import { userDataType } from "../data/db";

const authRouter = Router();

authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const secretKey: string = "Mockup_key";
    const userInput = req.body;

    const foundUser = users.find(
      (user: userDataType) =>
        user.username === userInput.username &&
        user.password === userInput.password
    );

    if (foundUser) {
      const token: string = jwt.sign(
        {
          id: foundUser.id,
          username: foundUser.username,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          image: foundUser.image,
        },
        secretKey,
        {
          expiresIn: "900000",
        }
      );
      return res.status(200).json({ message: "Found", token });
    }

    return res.status(404).json({ message: "Invalid username or password" });
  } catch {
    return res
      .status(500)
      .json({ message: "Cannot login due to server connection" });
  }
});

export default authRouter;
