const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

async function handleUpload(file) {
  try {
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return res;
  } catch (error) {
    throw new Error("Error uploading file to Cloudinary");
  }
}

module.exports = handleUpload;
