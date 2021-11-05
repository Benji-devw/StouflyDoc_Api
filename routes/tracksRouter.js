let express = require('express'),
   router = express.Router(),
   multerConf = require('../middleware/multer-config'),
   tracksController = require('../controllers/tracksController');


// ROUTE Tracks
router.get("/", tracksController.getTracks);
router.get("/find/:id", tracksController.getTrackById);

router.post('/', multerConf, tracksController.postTrack);

router.put('/:id', tracksController.updateTrack);
router.delete("/:id", tracksController.deleteTrack);


module.exports = router;

