// server.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Register route
app.post('/register', (req, res) => {
    const { username, email, password, nickname } = req.body;

    const query = 'INSERT INTO users (username, email, password, nickname) VALUES (?, ?, ?, ?)';
    
    db.query(query, [username, email, password, nickname], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Error registering user' });
        }
        res.status(201).json({ message: 'User registered successfully!', userId: result.insertId });
    });
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

    db.query(query, [username, password], (err, result) => {
        if (err) {
            console.error('Error querying data:', err);
            return res.status(500).json({ error: 'Error logging in' });
        }
        if (result.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        res.json({ message: 'Login successful!', user: result[0] });
    });
});

// Fetch all users route
app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';

    db.query(query, (err, result) => {
        if (err) {
            console.error('Error querying data:', err);
            return res.status(500).json({ error: 'Error fetching users' });
        }
        res.json(result);
    });
});

// Start server
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
