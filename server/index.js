const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");

const db = require("./db");
const appRouter = require("./router/app-router");

const app = express();
const apiPort = 3100;


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.filename + ".mp4");
  },
});

var upload = multer({ storage: storage }).single("file");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.post("/upload", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});


app.use("/api", appRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
