const express = require('express'),
   router = express.Router(),
   multerConf = require('../middleware/multer-config'),
   trackController = require('../controllers/track.controller');


// ROUTE Tracks
router.get("/", trackController.getTracks);
router.get("/all", trackController.getAlltracks);
router.get("/find/:id", trackController.getTrackById);

router.post('/', multerConf, trackController.postTrack);
// router.post('/', trackController.postTrack);

router.put('/:id', trackController.updateTrack);
router.delete("/:id", trackController.deleteTrack);


module.exports = router;

