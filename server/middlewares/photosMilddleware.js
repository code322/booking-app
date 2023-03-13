import multer from 'multer';

let storage = {
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'uploads/');
    },
    filename: function (req, file, callback) {
      let ext = file.originalname.split('.');

      callback(null, file.fieldname + '_' + Date.now() + '.' + ext[1]);
    },
  }),
};

export const photoMiddleware = multer(storage);
