import express from "express";
import path from "path";
import mediaRouter from "./routes/media.js";
import { getCacheClient } from "./services/caching.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "ui"));
app.use(express.static(path.join(process.cwd(), "ui")));

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/media", mediaRouter);

app.get("/health", async (req, res) => {
  try {
    await getCacheClient();
    res.json({
      status: "ok",
      success: true,
      service: "OrbitMedia Service",
      message: "Welcome to the OrbitMedia service Cache client is available",
      uptime: process.uptime(),
    });
  } catch (error) {
    res.json({
      status: "ok",
      success: true,
      service: "OrbitMedia Service",
      message: "Welcome to the OrbitMedia service Cache client is not available",
      uptime: process.uptime(),
      error: error,
    });
  }
});

export default app;
