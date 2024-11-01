const express = require('express');
const adminComplaintController = require('../../controller/complaintController/admin/adminComplaintController');

const router = express.Router();

router.get('/getAllComplaint', adminComplaintController.getAllComplaints);
router.post('/updateComplaint', adminComplaintController.updateComplain);

module.exports = router;