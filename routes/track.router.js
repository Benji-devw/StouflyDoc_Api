const express = require('express'),
  router = express.Router(),
  multerConf = require('../middleware/multer-config'),
  trackController = require('../controllers/track.controller');
const cors = require('cors');


// ROUTE Tracks
router.get("/", cors(), trackController.getTracks);
router.get("/all", cors(), trackController.getAlltracks);
router.get("/find/:id", cors(), trackController.getTrackById);

router.post('/', cors(), multerConf, trackController.postTrack);
// router.post('/', trackController.postTrack);

router.put('/:id', cors(), trackController.updateTrack);
router.delete("/:id", cors(), trackController.deleteTrack);


module.exports = router;

