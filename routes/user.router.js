import { Router } from "express";
import {
  createUser,
  loginUser,
  refreshUserToken,
  logoutUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import validateResults from "../middlewares/validateResults.js";
import { idParamValidator } from "../validators/common.validator.js";
import { createUserValidator, updateUserValidator, loginValidator } from "../validators/user.validator.js";
import { authMW } from "../middlewares/authMW.js";

const userRouter = Router();

// Authentication endpoints
userRouter.post("/login", loginValidator, validateResults, loginUser);
userRouter.post("/refresh-token", refreshUserToken);
userRouter.post("/logout", authMW, logoutUser);

// User management endpoints
userRouter.post("/", createUserValidator, validateResults, createUser);

userRouter.delete("/:id", authMW, idParamValidator, validateResults, deleteUser);
userRouter.patch(
  "/:id",
  authMW,
  idParamValidator,
  validateResults,
  updateUserValidator,
  validateResults,
  updateUser
);

export default userRouter;
