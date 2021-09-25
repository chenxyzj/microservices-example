const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

let DB_URI = "mongodb://localhost:27017/microservices";

if (process.env.MONGO_DB_URI) {
  DB_URI = process.env.MONGO_DB_URI;
}

const BookSchema = new mongoose.Schema({
  name: String,
  type: { type: String, default: "book" },
  createdAt: { type: Date, default: Date.now }
});

const Book = mongoose.model("Book", BookSchema);

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ msg: "books" });
});

app.get("/api/v1/books", async (req, res) => {
  const books = await Book.find({});
  res.json(books);
});

app.post("/api/v1/books", async (req, res) => {
  const book = new Book({ name: req.body.name });
  const savedBook = await book.save();
  res.json(savedBook);
});

// mongoose.connect(DB_URI);

var connectWithRetry = function() {
  return mongoose.connect(DB_URI, function(err) {
    if (err) {
      console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
      setTimeout(connectWithRetry, 5000);
    }
    else {
      app.listen(3001, () => {
        console.log("running on port 3001");
        console.log("--------------------------");
      });
    }
  });
};
connectWithRetry();


