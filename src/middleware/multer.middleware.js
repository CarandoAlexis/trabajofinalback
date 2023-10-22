import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/uploads/identificacion");
  },
  filename: function (req, file, cb) {
    cb(null, "Identificacion" + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

export default upload;
