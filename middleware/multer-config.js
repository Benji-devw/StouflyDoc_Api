const  multer = require('multer');


const MIMETYPES = [
  'audio/mpeg',
  'audio/wav',
];


const upload = multer({
  limits: { fileSize: 10000000, }, // 10 Mb 
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      // console.log(file);
      cb(null, `./public/uploads`)
  },
    filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, fileName)
    }
  }),
  fileFilter: (req, file, cb) => {
    if (!MIMETYPES.includes(file.mimetype)) {
      return cb(new Error('file is not allowed'))
    }
    cb(null, true)
  }
});
module.exports = upload.single('SampleFile');
