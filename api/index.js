const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const multer = require("multer");
const cors= require("cors")
const handleUpload = require("./config/cloudinaryConfig");
const path= require("path")

dotenv.config();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    res.json(cldRes);
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);


 
if (process.env.NODE_ENV === "PRODUCTION") {
  // set static folder
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "../client/dist/index.html"))
  
);
} else {
  app.get("/", (req, res) => {
    res.send("API is running !");
  });
}

app.listen("5000", () => console.log("Backend is Running"));
