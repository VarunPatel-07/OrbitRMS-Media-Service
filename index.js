import express from "express";
import path from "path";
import mediaRouter from "./routes/media.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "ui"));
app.use(express.static(path.join(process.cwd(), "ui")));

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/media", mediaRouter);

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    success: true,
    service: "OrbitRMS Media Service",
    message: "Welcome to the orbitrms media service",
    uptime: process.uptime(),
  });
});

export default app;
