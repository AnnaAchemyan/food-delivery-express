import * as path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'src/uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },

});
const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      req.fileExtError = 'Error';
      return cb(null, false, req.fileExtError);
    }
    cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 4,
  },
});

export default upload;
