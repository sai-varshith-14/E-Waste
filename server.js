require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 1. Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,      // Uses value from .env
    user: process.env.DB_USER,      // Uses value from .env
    password: process.env.DB_PASSWORD, // Uses value from .env
    database: process.env.DB_NAME   // Uses value from .env
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

// 2. API Route: Get all Requests
app.get('/api/requests', (req, res) => {
    const sql = "SELECT * FROM requests";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

// 3. API Route: Submit a new Request
app.post('/api/requests', (req, res) => {
    const sql = "INSERT INTO requests (user_name, contact, item_type, item_condition, estimated_value) VALUES (?)";
    const values = [
        req.body.user_name,
        req.body.contact,
        req.body.item_type,
        req.body.item_condition,
        req.body.estimated_value
    ];
    
    db.query(sql, [values], (err, result) => {
        if (err) return res.json(err);
        return res.json({ message: "Request added successfully!" });
    });
});

// 4. Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});