require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth/authRoutes');
const complaintRoute = require('./routes/complaintRoutes');
const adminComplaintRoutes = require('./routes/admin/complaintRoutes');
const adminOperationRoutes = require('./routes/admin/operationRoutes');



const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/complaint', complaintRoute);

//admin
app.use('/api/v1/admin', adminComplaintRoutes);
app.use('/api/v1/admin', adminOperationRoutes);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});