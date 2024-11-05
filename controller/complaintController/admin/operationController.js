const db = require('../../../config/db'); 
const { promisify } = require('util');
const bcrypt = require('bcrypt');


const adminOperationController = {    
    addDepartment: async (req, res) => {
            try {
                const { departmentName } = req.body;
                if (!departmentName) {
                    return res.status(400).json({ success: false, message: 'Department Name is required.' });
                }
    
                const query = promisify(db.query).bind(db);
                const insertQuery = 'CALL addDepartment(?)';
                const values = [departmentName];
                await query(insertQuery, values);
                res.status(201).json({
                    success: true,
                    message: 'Department name added successfully.',
                });      
            } catch (error) {
                console.error(error);
                res.status(500).json({ success: false, message: error });
            }
        },
    getAllDepartments: async (req, res) => {
            try {
        
                const query = promisify(db.query).bind(db);
                const selectQuery = 'CALL getAllDepartment()';
                
                const results = await query(selectQuery);
                const department = results[0];
        
                if (department.length === 0) {
                    return res.status(404).json({ success: false, message: 'No department found.' });
                }
                // Return successful response with data
                res.status(200).json({
                    success: true,
                    data: department
                });
            } catch (error) {
                console.error(error);
                res.status(500).json({ success: false, message: 'Error retrieving department.' });
            }
        },
    
};

module.exports = adminOperationController;

