import { Router } from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import validateResults from "../middlewares/validateResults.js";
import { idParamValidator } from "../validators/common.validator.js";
import {
  createCategoryValidator,
  updateCategoryValidator,
} from "../validators/category.validator.js";
import { authMW } from "../middlewares/authMW.js";

const categoryRouter = Router();

categoryRouter.get("/", getCategories);
categoryRouter.post("/", authMW, createCategoryValidator, validateResults, createCategory);

categoryRouter.get("/:id", idParamValidator, validateResults, getCategoryById);
categoryRouter.delete("/:id", authMW, idParamValidator, validateResults, deleteCategory);
categoryRouter.patch(
  "/:id",
  authMW,
  idParamValidator,
  validateResults,
  updateCategoryValidator,
  validateResults,
  updateCategory
);

export default categoryRouter;
