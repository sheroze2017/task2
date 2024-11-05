const db = require('../../config/db'); 
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();



const authController = {
    login: async (req, res) => {

        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ success: false, message: 'Email and password are required.' });
            }
            const query = promisify(db.query).bind(db);
            const user = await query('SELECT * FROM users WHERE email = ?', [email]);
            if (user.length === 0) {
                return res.status(401).json({ success: false, message: 'Invalid email or password.' });
            }

            const existingUser = user[0];
            const token = jwt.sign(existingUser,  process.env.SECRET_KEY, { expiresIn: '1h' });

            const isMatch = await bcrypt.compare(password, existingUser.password);
            if (!isMatch) {
                return res.status(401).json({ success: false, message: 'Invalid email or password.' });
            }
            const loggedInUser = {
                id: existingUser.id,
                name: existingUser.name ?? '',
                email: existingUser.email,
                district: existingUser.district ?? '',
                town: existingUser.town ?? '',
                block: existingUser.block ?? '',
                address: existingUser.address ?? '',
                role: existingUser.role ?? 'role',
                token:token
            };
            res.status(200).json({ success: true, message: 'Login successful.', data: loggedInUser });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Error logging in user.' });
        }
    },
  
    
    register: async (req, res) => {
        try {
            const { name, email, password, district, town, block, address, role } = req.body;

            // Validate input
            if (!name || !email || !password) {
                return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Bind promisify to use async/await with db.query
            const query = promisify(db.query).bind(db);

            const existingUser = await query('SELECT * FROM users WHERE email = ?', [email]);
            if (existingUser.length > 0) {
                return res.status(409).json({ success: false, message: 'Email already registered.' });
            }

            await query('CALL addUser(?, ?, ?, ?, ?, ?, ?, ?)', [name, email, hashedPassword, district, town, block, address, role]);

            const newUser = {
                name,
                email,
                district,
                town,
                block,
                address,
                role,
            };
            res.status(201).json({ success: true, message: 'User registered successfully.', data: newUser });
           } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Error registering user.' });
        }
    }, 
};

module.exports = authController;

