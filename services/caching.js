import { createClient } from "redis";
import ENV_CONFIG from "../config/EnvConfig.js";

let cacheClient;

export const getCacheClient = async () => {
  if (!cacheClient) {
    cacheClient = createClient({
      username: "default",
      socket: {
        host: ENV_CONFIG.CACHED_DATABASE_HOST,
        port: ENV_CONFIG.CACHED_DATABASE_PORT,
        reconnectStrategy: (retries) => {
          if (retries > 5) return new Error("Redis retry limit reached");
          return Math.min(retries * 200, 3000);
        },
        tls: true,
      },
      password: ENV_CONFIG.CACHED_DATABASE_PASSWORD,
    });

    cacheClient.on("error", (err) => {
      console.error("❌ Redis error:", err);
    });

    await cacheClient.connect();
  }

  if (!cacheClient.isOpen) {
    await cacheClient.connect();
  }

  return cacheClient;
};
