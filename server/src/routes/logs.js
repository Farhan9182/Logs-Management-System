const express = require('express');
const router = express.Router();
const { createLog, getLog, bulkCreateLogs } = require('../controllers/logController');

// Log route
router.post('/create', createLog);
router.post('/bulkCreate', bulkCreateLogs);
router.get('/get', getLog);

module.exports = router;