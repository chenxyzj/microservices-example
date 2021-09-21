let DB_URI = "mongodb://localhost:27017/microservices";

if (process.env.MONGO_DB_URI) {
  DB_URI = process.env.MONGO_DB_URI;
}

const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  name: String,
  type: { type: String, default: "video" },
  createdAt: { type: Date, default: Date.now }
});

const Video = mongoose.model("Video", VideoSchema);

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ msg: "videos" });
});

app.get("/api/v1/videos", async (req, res) => {
  const videos = await Video.find({});
  res.json(videos);
});

app.post("/api/v1/videos", async (req, res) => {
  const video = new Video({ name: req.body.name });
  const savedVideo = await video.save();
  res.json(savedVideo);
});

mongoose.connect(DB_URI);

app.listen(3000, () => {
  console.log("running on port 3000");
  console.log("--------------------------");
});
