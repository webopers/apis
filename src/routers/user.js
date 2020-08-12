const express = require('express');

const verifyToken = require('../util/token/verifyToken');
const userController = require('../app/controllers/UserController');

const router = express.Router();

router.get('/information', verifyToken, userController.information);

module.exports = router;
