import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import errorHandlingMW from "./middlewares/errorHandlingMW.js";
import notFoundMW from "./middlewares/notFoundMW.js";

import userRouter from "./routes/user.router.js";
import eventRouter from "./routes/event.router.js";
import categoryRouter from "./routes/category.router.js";
import registrationRouter from "./routes/registration.router.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/events", eventRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/registrations", registrationRouter);

app.use(notFoundMW);
app.use(errorHandlingMW);

export default app;