const path = require("path");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "public", "index.html"));
});

app.listen(3000, () => {
  console.log("running on port 3000");
  console.log("--------------------------");
});
