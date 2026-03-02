import axios from "axios";
import express from "express";
import cacheClient from "../services/caching.js";
import { generateCloudinarySignedUrl } from "../services/cloudinary.js";

const mediaRouter = express.Router();

mediaRouter.get("/uploads/public/:folder/:id/:file_name", (req, res) => {
  const { folder, id, file_name } = req.params;

  res.render("view-media", {
    folder,
    id,
    pdfName: file_name,
  });
});

// Stream PDF
mediaRouter.get("/stream/:folder/:id", async (req, res) => {
  const { folder, id } = req.params;
  const publicId = `${folder}/${id}`;
  const cacheKey = `media:${folder}:${id}`;

  try {
    const cachedDocument = await cacheClient.get(cacheKey);

    if (cachedDocument) {
      const mediaBuffer = Buffer.from(cachedDocument, "base64");

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "inline");

      return res.send(mediaBuffer);
    }

    const signedMediaUrl = generateCloudinarySignedUrl(publicId);

    const response = await axios.get(signedMediaUrl, {
      responseType: "arraybuffer",
    });

    const mediaBuffer = Buffer.from(response.data);

    await cacheClient.set(cacheKey, mediaBuffer.toString("base64"), "EX", 600);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline");

    return res.send(mediaBuffer);
  } catch (error) {
    res.render("error", {
      errorCode: 500,
      errorTitle: "Something went wrong",
      errorMessage: error.message,
      errorDetail: error,
      backUrl: "https://app.orbitrms.com/",
    });
  }
});

export default mediaRouter;
