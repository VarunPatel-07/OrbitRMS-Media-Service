import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import ENV_CONFIG from "./config/EnvConfig.js";
import mediaRouter from "./routes/media.js";
import { connectCacheServer } from "./services/caching.js";

const app = express();

const fileName = fileURLToPath(import.meta.url);
const dirname = path.dirname(fileName);

app.set("view engine", "ejs");
app.set("views", path.join(dirname, "ui"));

app.use("/", mediaRouter);

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    success: true,
    service: "OrbitRMS Media Service",
    message: "Welcome to the orbitrms media service",
    uptime: process.uptime(),
  });
});

const startServer = async () => {
  try {
    await connectCacheServer();
    console.log("Connected to the cache client");
    app.listen(ENV_CONFIG.PORT, () => {
      console.log(`Media Service running on port ${ENV_CONFIG.PORT}`);
    });
  } catch (error) {
    console.error(`failed to start server ${error}`);
    process.exit(1);
  }
};

startServer();
