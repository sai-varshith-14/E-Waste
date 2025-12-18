CREATE DATABASE IF NOT EXISTS ewaste_db;
USE ewaste_db;

CREATE TABLE IF NOT EXISTS requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    contact VARCHAR(20),
    item_type VARCHAR(50),
    item_condition VARCHAR(50),
    estimated_value DECIMAL(10,2),
    status VARCHAR(20) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


