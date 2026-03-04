import { createClient } from "redis";
import ENV_CONFIG from "../config/EnvConfig.js";

const cacheClient = createClient({
  socket: {
    host: ENV_CONFIG.CACHED_DATABASE_HOST,
    port: ENV_CONFIG.CACHED_DATABASE_PORT,
  },
  password: ENV_CONFIG.CACHED_DATABASE_PASSWORD,
});

cacheClient.on("connect", () => {
  console.log("✅ Redis connected");
});

cacheClient.on("error", (err) => {
  console.error("❌ Redis error:", err);
});

export const getCacheClient = async () => {
  if (!cacheClient.isOpen) {
    await cacheClient.connect();
  }
  return cacheClient;
};
