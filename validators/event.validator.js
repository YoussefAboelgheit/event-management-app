import { body } from "express-validator";

export const createEventValidator = [
  body("title")
    .notEmpty().withMessage("title is required")
    .isString().withMessage("title must be a string")
    .isLength({ min: 5, max: 100 }).withMessage("title must be between 5 and 100 characters"),
  body("date")
    .notEmpty().withMessage("date is required")
    .isISO8601().withMessage("Date must be in the format YYYY-MM-DD or a valid ISO time"),
  body("capacityLimit")
    .notEmpty().withMessage("capacityLimit is required")
    .isInt({ min: 1 }).withMessage("capacityLimit must be an integer greater than 0"),
  body("description")
    .optional()
    .isString().withMessage("description must be a string")
    .isLength({ max: 400 }).withMessage("description cannot exceed 400 characters"),
  body("category_id")
    .notEmpty().withMessage("category_id is required")
    .isMongoId().withMessage("invalid category_id format"),
  body("user_id")
    .notEmpty().withMessage("user_id is required")
    .isMongoId().withMessage("invalid user_id format"),
];

export const updateEventValidator = [
  body("title")
    .optional()
    .isString().withMessage("title must be a string")
    .isLength({ min: 5, max: 100 }).withMessage("title must be between 5 and 100 characters"),
  body("date")
    .optional()
    .isISO8601().withMessage("Date must be in the format YYYY-MM-DD or a valid ISO time"),
  body("capacityLimit")
    .optional()
    .isInt({ min: 1 }).withMessage("capacityLimit must be an integer greater than 0"),
  body("description")
    .optional()
    .isString().withMessage("description must be a string")
    .isLength({ max: 400 }).withMessage("description cannot exceed 400 characters"),
  body("category_id")
    .optional()
    .isMongoId().withMessage("invalid category_id format"),
  body("user_id")
    .optional()
    .isMongoId().withMessage("invalid user_id format"),
];
