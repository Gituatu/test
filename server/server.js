import Express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import authRoute from "./router/authRoute.js";
import DataBase from "./database/conn.js";
import jobRoute from "./router/jobRoute.js";
import cookieParser from "cookie-parser";

const port = process.env.PORT || 5000;
configDotenv();

const app = Express();
app.use(Express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://test-rho-five-19.vercel.app"],
    credentials: true,
  })
);

app.use(authRoute, jobRoute);

async function startServer() {
  try {
    await DataBase();
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

startServer();
