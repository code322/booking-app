import multer from 'multer';

let storage = {
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'uploads/');
    },
    filename: function (req, file, callback) {
      let fileName = file.originalname.split('.');
      let fileExtension = fileName[fileName.length - 1];

      callback(null, file.fieldname + '_' + Date.now() + '.' + fileExtension);
    },
  }),
};

export const photoMiddleware = multer(storage);
