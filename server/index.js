const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
//const GridFsStorage = require("multer-gridfs-storage");
//const Grid = require("gridfs-stream");

// const mongoose = require("mongoose");

const db = require("./db");
const appRouter = require("./router/app-router");

const app = express();
const apiPort = 3100;

// const mongoURI = "mongodb://127.0.0.1:27017/courseapp";
// const conn = mongoose.createConnection(mongoURI);
// let gfs;
// conn.once("open", () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection("uploads");
// });

// // Create Storage Engine
// const storage = new GridFsStorage({
//   url: mongoURI,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       const filename = req.body.filename;
//       const fileInfo = {
//         filename: filename,
//         bucketName: "uploads",
//       };
//       resolve(fileInfo);
//     });
//   },
// });

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
  res.send("Hello World!");
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

// app.post("/uploads", upload.single("file"), (req, res) => {
//   return res.status(200).send(req.file);
// });

// app.get("/files/:filename", (req, res) => {
//   gfs.files.findOne({ filename: req.param.filename }, (err, file) => {
//     if (!file || file.length === 0) {
//       return res.status(404).json({ err: "File Not Found!" });
//     }
//     return res.json(file);
//   });
// });

app.use("/api", appRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
