const multer = require("multer");
const path = require("path");
const uuid = require("uuid");

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __uploadsdir);
  },
  filename: (req, file, cb) => {
    cb(null, "IMG-" + uuid.v4().toString() + path.extname(file.originalname));
  },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;
