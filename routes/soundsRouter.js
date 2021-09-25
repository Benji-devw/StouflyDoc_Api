let express = require('express'),
   router = express.Router(),
   soundsController = require('../controllers/soundsController');

// ROUTE Sounds
router.get("/", soundsController.getSounds);
router.get("/find/:id", soundsController.getSoundById);
router.post('/post', soundsController.postSound);
router.put('/:id', soundsController.updateSound);
router.delete("/:id", soundsController.deleteSound);

// Filters
// router.post("/getSoundspost", soundsController.getSoundsPost);

module.exports = router
