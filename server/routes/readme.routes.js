const express = require('express');
const router = express.Router();

const readmeController = require('../controllers/readme.controller');

router.post('/generate', readmeController);

module.exports = router;