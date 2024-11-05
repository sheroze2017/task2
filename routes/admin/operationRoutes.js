const express = require('express');
const adminOperationController = require('../../controller/complaintController/admin/operationController');
const authenticateToken=require('../../middlewares/authenticate')

const router = express.Router();

router.post('/addDepartment',authenticateToken.authenticateToken, adminOperationController.addDepartment);
router.get('/getAllDepartment',authenticateToken.authenticateToken, adminOperationController.getAllDepartments);

module.exports = router;