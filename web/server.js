const path = require("path");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./", "public", "index.html"));
});

app.listen(3003, () => {
  console.log("running on port 3003");
  console.log("--------------------------");
});
