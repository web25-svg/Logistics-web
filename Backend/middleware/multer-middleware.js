import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: "public/uploads",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);    
    cb(null, `${file.fieldname}-${uuidv4()}${ext}`);
  },
});

const upload = multer({ storage });

export default upload;