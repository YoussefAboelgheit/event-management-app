import { body } from "express-validator";

export const createRegistrationValidator = [
  body("event_id")
    .notEmpty().withMessage("event_id is required")
    .isMongoId().withMessage("invalid event_id format"),
  body("user_id")
    .notEmpty().withMessage("user_id is required")
    .isMongoId().withMessage("invalid user_id format"),
];

export const updateRegistrationValidator = [
  body("event_id")
    .optional()
    .isMongoId().withMessage("invalid event_id format"),
  body("user_id")
    .optional()
    .isMongoId().withMessage("invalid user_id format"),
];
