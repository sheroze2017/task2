const express = require('express');
const adminComplaintController = require('../../controller/complaintController/admin/adminComplaintController');
const authenticateToken= require('../../middlewares/authenticate')
const router = express.Router();

router.get('/getAllComplaint',authenticateToken.authenticateToken,  adminComplaintController.getAllComplaints);
router.post('/updateComplaint',authenticateToken.authenticateToken, adminComplaintController.updateComplain);

module.exports = router;