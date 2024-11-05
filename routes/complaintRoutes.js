const express = require('express');
const complainController = require('../controller/complaintController/user/userComplaintController');
const authenticateToken=require('../middlewares/authenticate');

const router = express.Router();

router.post('/addComplaint',authenticateToken.authenticateToken, complainController.addComplain);
router.get('/:userId',authenticateToken.authenticateToken, complainController.getAllComplaints);

module.exports = router;