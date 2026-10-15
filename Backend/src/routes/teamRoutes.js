const express = require('express');
const router = express.Router();
const { getTeam, saveTeam } = require('../controllers/teamController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/', verifyToken, getTeam);
router.post('/', verifyToken, saveTeam);

module.exports = router;