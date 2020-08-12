const express = require('express');

const courseController = require('../app/controllers/CourseController');

const router = express.Router();

router.get('/all', courseController.all);
router.get('/detail', courseController.detail);

module.exports = router;
