const db = require('../../../config/db'); 
const { promisify } = require('util');
const bcrypt = require('bcrypt');


const userComplaintController = {
    addComplain: async (req, res) => {
        try {
            const { userId , department_id, complaint_body, img_url, issue_duration } = req.body;
            if (!department_id|| !complaint_body) {
                return res.status(400).json({ success: false, message: 'Department and complaint body are required.' });
            }

            // Bind promisify to use async/await with db.query
            const query = promisify(db.query).bind(db);

            const insertQuery = 'CALL addUserComplaint(?, ?, ?, ?, ?)';
            const values = [userId, department_id, complaint_body, img_url, issue_duration];
            await query(insertQuery, values);
            const responseData = {
                userId: userId,
                departmentId: department_id,
                complaintBody: complaint_body,
                imgUrl: img_url,
                issueDuration: issue_duration,
                status: 'pending', // Default status since we set it in the procedure
                datePosted: new Date() // Current date for when the complaint was added
            };

            res.status(201).json({
                success: true,
                message: 'Complaint added successfully.',
                data: responseData
            });      
        
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: error });
        }
    },
            
    getAllComplaints: async (req, res) => {
            try {
                const { userId } = req.params;
        
                if (!userId) {
                    return res.status(400).json({ success: false, message: 'User ID is required.' });
                }
        
                // Bind promisify to use async/await with db.query
                const query = promisify(db.query).bind(db);
                const selectQuery = 'CALL getUserComplaints(?)';
                const results = await query(selectQuery, [userId]);
        
                const complaints = results[0]; 
        
                if (complaints.length === 0) {
                    return res.status(404).json({ success: false, message: 'No complaints found for this user.' });
                }
                res.status(200).json({
                    success: true,
                    message: 'department fetch successfully',
                    data: complaints
                });
            } catch (error) {
                console.error(error);
                res.status(500).json({ success: false, message: 'Error retrieving complaints.' });
            }
        
    }, 
};

module.exports = userComplaintController;

