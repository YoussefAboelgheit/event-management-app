import { body } from "express-validator";

export const createUserValidator = [
  body("name")
    .notEmpty().withMessage("name is required")
    .isString().withMessage("name must be a string")
    .isLength({ min: 2, max: 100 }).withMessage("name must be between 2 and 100 characters"),
  body("email")
    .notEmpty().withMessage("email is required")
    .isEmail().withMessage("email must be a valid email address"),
  body("password")
    .notEmpty().withMessage("password is required")
    .isString().withMessage("password must be a string")
    .isLength({ min: 6 }).withMessage("password must be at least 6 characters long"),
];

export const loginValidator = [
  body("email")
    .notEmpty().withMessage("email is required")
    .isEmail().withMessage("email must be a valid email address"),
  body("password")
    .notEmpty().withMessage("password is required")
    .isString().withMessage("password must be a string"),
];

export const updateUserValidator = [
  body("name")
    .optional()
    .isString().withMessage("name must be a string")
    .isLength({ min: 2, max: 100 }).withMessage("name must be between 2 and 100 characters"),
  body("email")
    .optional()
    .isEmail().withMessage("email must be a valid email address"),
  body("password")
    .optional()
    .isString().withMessage("password must be a string")
    .isLength({ min: 6 }).withMessage("password must be at least 6 characters long"),
];
