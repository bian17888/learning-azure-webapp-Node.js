const express = require("express");
const router = express.Router();

const multer = require("multer");
const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single("file");
const getStream = require("into-stream");

const imagedb = require("../data/imagedb");
const { render } = require("jade");

router.get("/", (req, res, next) => {
  res.render("images");
});

router.post("/", uploadStrategy, async (req, res, next) => {
  try {
    const stream = getStream(req.file.buffer);
    const { id } = await imagedb.uploadImage(stream);
    res.redirect(`/images/${id}`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:imageId", async (req, res, next) => {
  const url = await imagedb.getImageUri(req.params.imageId);
  res.render("image-detail", { imageSrc: url });
});

module.exports = router;
