const express = require('express');
const router = express.Router();
const { createLog, getLog } = require('../controllers/logController');

// Login route
router.post('/log', createLog);
router.get('/log', getLog);

module.exports = router;