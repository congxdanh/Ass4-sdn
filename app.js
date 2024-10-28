const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// ROUTER
const authRouter = require("./src/routes/authRoutes");
const userRouter = require("./src/routes/userRoutes");

const app = express();

// MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

// ROUTES
app.use("/info", (_, res, next) => {
  res.status(200).json({
    data: {
      fullName: "Au Cong Danh",
      studentCode: "QE170170",
    },
  });
  next();
});
app.use("/auth", authRouter);
app.use("/users", userRouter);

module.exports = app;
