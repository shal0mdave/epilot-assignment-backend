import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@models";

export class UserController {
  static async test(req: Request, res: Response) {
    try {
      return res.status(200).json({
        message: "API Alive.",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "An error occured",
      });
    }
  }

  static async register(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const takenUsername = await User.findOne({ username });

      if (takenUsername) {
        return res.status(400).json({
          message:
            "Looks like another user picked this username first. Try another one.",
        });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const user = new User({
        username: username.toLowerCase(),
        password: passwordHash,
      });
      await user.save();

      const userData = {
        id: user._id,
        username,
        password: passwordHash,
      };
      const token = jwt.sign({ user: userData }, process.env.JWT_SECRET || "", {
        expiresIn: "300d",
      });

      return res.status(200).json({
        data: { token },
        message: "User registered.",
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Server error" });
    }
  }

  static async getUser(req: Request, res: Response, err: any) {
    try {
      // @ts-ignore
      const userId = req.user.id;

      const user = await User.findById(userId).select([
        "username",
        "createdAt",
      ]);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        data: user,
        message: "User details",
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Server error" });
    }
  }
}
