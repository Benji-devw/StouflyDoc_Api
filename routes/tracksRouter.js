let express = require('express'),
   router = express.Router(),
   tracksController = require('../controllers/tracksController');

// ROUTE Tracks
router.get("/", tracksController.getTracks);
router.get("/find/:id", tracksController.getTrackById);
router.post('/post', tracksController.postTrack);
router.put('/:id', tracksController.updateTrack);
router.delete("/:id", tracksController.deleteTrack);

// Filters
// router.post("/getTrackspost", tracksController.getTracksPost);



// router.get("/", tracksController.getTrack);
// router.post("/post", tracksController.postTrack);






module.exports = router
