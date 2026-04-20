import { param } from "express-validator";

export const idParamValidator = [param("id").isMongoId().withMessage("Invalid MongoDB id")];
