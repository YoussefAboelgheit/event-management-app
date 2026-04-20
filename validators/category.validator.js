import { body } from "express-validator";

export const createCategoryValidator = [
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("name must be between 3 and 50 characters"),
];

export const updateCategoryValidator = [
  body("name")
    .optional()
    .isString()
    .withMessage("name must be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("name must be between 3 and 50 characters"),
];
