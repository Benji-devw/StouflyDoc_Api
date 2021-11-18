const express = require('express'),
   router = express.Router(),
   userController = require('../controllers/user.controller');


// ROUTE Users
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', userController.getUser);


module.exports = router;

