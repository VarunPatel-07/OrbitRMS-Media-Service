import { v2 as cloudinary } from "cloudinary";
import ENV_CONFIG from "../config/EnvConfig.js";

cloudinary.config({
  cloud_name: ENV_CONFIG.CLOUDINARY_CLOUD_NAME,
  api_key: ENV_CONFIG.CLOUDINARY_API_KEY,
  api_secret: ENV_CONFIG.CLOUDINARY_API_SECRET,
});

export const generateCloudinarySignedUrl = (publicId) => {
  return cloudinary.url(publicId, {
    resource_type: "image",
    flags: "attachment:false",
    // sign_url: true,
    expires_at: Math.floor(Date.now() / 1000) + 600,
  });
};
