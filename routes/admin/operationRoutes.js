const express = require('express');
const adminOperationController = require('../../controller/complaintController/admin/operationController');

const router = express.Router();

router.post('/addDepartment', adminOperationController.addDepartment);
router.get('/getAllDepartment', adminOperationController.getAllDepartments);

module.exports = router;