import dotenv from "dotenv";
import express from "express";
import todoRoutes from "./modules/todos/todos.routes.js";
import { connectToDB } from "./config/db.connection.js";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDB();

app.use("/api/v1", todoRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
