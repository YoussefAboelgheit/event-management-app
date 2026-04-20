import { Router } from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js";
import validateResults from "../middlewares/validateResults.js";
import { idParamValidator } from "../validators/common.validator.js";
import { createEventValidator, updateEventValidator } from "../validators/event.validator.js";
import { authMW } from "../middlewares/authMW.js";

const eventRouter = Router();

eventRouter.get("/", getEvents);
eventRouter.post("/", authMW, createEventValidator, validateResults, createEvent);

eventRouter.get("/:id", idParamValidator, validateResults, getEventById);
eventRouter.delete("/:id", authMW, idParamValidator, validateResults, deleteEvent);
eventRouter.patch(
  "/:id",
  authMW,
  idParamValidator,
  validateResults,
  updateEventValidator,
  validateResults,
  updateEvent
);

export default eventRouter;
