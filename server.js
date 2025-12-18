require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,      
    user: process.env.DB_USER,      
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME   
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});


app.get('/api/requests', (req, res) => {
    const sql = "SELECT * FROM requests";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

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

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});