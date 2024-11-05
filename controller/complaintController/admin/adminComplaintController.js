const db = require('../../../config/db'); 
const { promisify } = require('util');
const bcrypt = require('bcrypt');


const adminComplaintController = {

    getAllComplaints: async (req, res) => {
        try {
            // Retrieve query parameters
            const { startDate, endDate, departmentId, complaintStatus } = req.query;
            
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
    
            const query = promisify(db.query).bind(db);
            const selectQuery = 'CALL getAllComplaints(?, ?, ?, ?, ?, ?)';
            
            const values = [
                startDate || null,
                endDate || null,
                departmentId || null,
                complaintStatus || null,
                page,
                limit
            ];
            
            const results = await query(selectQuery, values);
            const complaints = results[0];
    
            if (complaints.length === 0) {
                return res.status(404).json({ success: false, message: 'No complaints found.' });
            }
    
            res.status(200).json({
                success: true,
                data: complaints,
                pagination: {
                    currentPage: page,
                    pageSize: limit,
                    total: complaints.length  
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Error retrieving complaints.' });
        }
    },
    

    updateComplain: async (req, res) => {
            try {
                const { complaintId,status } = req.body;
                if (!complaintId|| !status) {
                    return res.status(400).json({ success: false, message: 'Complaint Id and Status are required.' });
                }
    
                const query = promisify(db.query).bind(db);
    
                const insertQuery = 'CALL UpdateComplaintStatus(?, ?)';
                const values = [complaintId,status];
                await query(insertQuery, values);
                const responseData = {
                    complaintId: complaintId,
                    status: status
                };
    
                res.status(201).json({
                    success: true,
                    message: 'Complaint updated successfully.',
                    data: responseData
                });      
            
            } catch (error) {
                console.error(error);
                res.status(500).json({ success: false, message: error });
            }
        },
    
};

module.exports = adminComplaintController;

