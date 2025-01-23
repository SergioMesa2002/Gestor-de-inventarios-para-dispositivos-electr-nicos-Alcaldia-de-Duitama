const express = require('express');
const { generateDeviceReport } = require('../controllers/reportController');

const router = express.Router();

router.get('/devices/:id/report', generateDeviceReport);

module.exports = router;
