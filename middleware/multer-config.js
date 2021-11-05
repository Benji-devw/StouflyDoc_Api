let nc = require("next-connect") ;
let multer = require('multer');
  //  { v4: uuidv4 } = require('uuid');



const DIR = './public';

const upload = multer({
  limits: { fileSize: 10000000 },
  storage: multer.diskStorage({

    destination: function (req, file, cb) {
      // console.log(req.body);
      cb(null, './public/uploads')
  },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
  }),
});


module.exports = upload.single('theFiles');






// const handler = nc({
//   onError: (err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).end("Something broke!");
//   },
//   onNoMatch: (req, res, next) => {
//     res.status(404).end("Page is not found");
//   },
// })
//   // .use(upload)
//   .get((req, res) => {
//     res.send("Hello world");
//   })
//   .post((req, res) => {
//     console.log('reqBody.....', req.body)
//     console.log('reqFiles.....', req.files)
//     res.status(200).json({ data: 'success' });
//   })
//   .put(async (req, res) => {
//     res.end("async/await is also supported!");
//   })
//   .patch(async (req, res) => {
//     throw new Error("Throws me around! Error can be caught and handled.");
//   });

// module.exports = handler;