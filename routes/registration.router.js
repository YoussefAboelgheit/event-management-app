import { Router } from "express";
import {
  createRegistration,
  getRegistrations,
  getRegistrationById,
  updateRegistration,
  deleteRegistration,
} from "../controllers/registration.controller.js";
import validateResults from "../middlewares/validateResults.js";
import { idParamValidator } from "../validators/common.validator.js";
import {
  createRegistrationValidator,
  updateRegistrationValidator,
} from "../validators/registration.validator.js";
import { authMW } from "../middlewares/authMW.js";

const registrationRouter = Router();

registrationRouter.get("/", authMW, getRegistrations);
registrationRouter.post(
  "/",
  authMW,
  createRegistrationValidator,
  validateResults,
  createRegistration
);

registrationRouter.get("/:id", authMW, idParamValidator, validateResults, getRegistrationById);
registrationRouter.delete("/:id", authMW, idParamValidator, validateResults, deleteRegistration);
registrationRouter.patch(
  "/:id",
  authMW,
  idParamValidator,
  validateResults,
  updateRegistrationValidator,
  validateResults,
  updateRegistration
);

export default registrationRouter;
