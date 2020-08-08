const express = require('express');

const verify = require('../util/verifyToken');
const userController = require('../app/controllers/UserController');

const router = express.Router();

router.get('/information', verify, userController.information);

module.exports = router;
