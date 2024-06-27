import express, { Application } from "express";
import { studentRouter } from "./src/routers/studentsRouter.ts";
import database from "./src/config/database.ts";

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", studentRouter);

database.getConnection((err, connection) => {
  if (err) {
    return console.log(err);
  }
  console.log("Database connected", connection.threadId);
});

app.listen(PORT, () => {
  console.log(`Server is running on port, ${PORT}`);
});
