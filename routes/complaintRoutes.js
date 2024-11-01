const express = require('express');
const complainController = require('../controller/complaintController/user/userComplaintController');

const router = express.Router();

router.post('/addComplaint', complainController.addComplain);
router.get('/:userId', complainController.getAllComplaints);

module.exports = router;