import multer from 'multer';
import CloudinaryStorage from '../services/cloudinary.js';

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads');
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.floor(Math.random() * 1000) + '-';
//     cb(null, uniqueSuffix + file.originalname);
//   },
// });

const storage = new CloudinaryStorage();

const allowedFormats = ['jpeg', 'png', 'jpg', 'svg', 'webp', 'gif', 'avif'];

const fileFilter = (_req, file, cb) => {
  const fileExtension = file.mimetype.split('/')[1];

  if (allowedFormats.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error('File type not allowed', { cause: 400 }));
  }
};

const fileSize = 1_048_576 * 6; // 6mb

const upload = multer({ storage, fileFilter, limits: { fileSize } });

export default upload;
