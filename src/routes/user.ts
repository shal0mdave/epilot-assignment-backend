import { Router } from "express";
import { UserController } from "@controllers";
import { authMiddleware } from "@middleware";

const userRoutes = Router();

userRoutes.get("/test", UserController.test);
userRoutes.post("/register", UserController.register);
userRoutes.get("/", authMiddleware, UserController.getUser);

export default userRoutes;
