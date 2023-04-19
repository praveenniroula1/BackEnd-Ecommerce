import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
const app = express();
const PORT = process.env.PORT || 8000;

// Db Connection
import { dbConnection } from "./SRC/COnfig/dbConfig.js";
dbConnection();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

//APIS for this APP
import adminUserRouter from "./SRC/Routers/adminUserRouter.js";
app.use("/api/v1/admin-user", adminUserRouter);

//
app.get("/", (req, res) => {
  res.json({
    message: "Hi There!!!, how are you?",
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.log(error);
  const statusCode = error.status || 404;
  res.status(statusCode).json({
    status: "error",
    message: error.message,
  });
});

// listening to the port
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Your server is serving you at ${PORT}`);
});
