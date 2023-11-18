const express = require('express');
const router = express.Router();
const { createLog, getLog, bulkCreateLogs } = require('../controllers/logController');
const {authenticateUser} = require("../middleware/authToken");

// Log route
router.post('/create', authenticateUser, createLog);
router.post('/bulkCreate', authenticateUser, bulkCreateLogs);
router.get('/get', authenticateUser, getLog);

module.exports = router;