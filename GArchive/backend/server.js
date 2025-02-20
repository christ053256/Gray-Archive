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

const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQL_ROOT_PASSWORD}@${process.env.RAILWAY_TCP_PROXY_DOMAIN}:${process.env.RAILWAY_TCP_PROXY_PORT}/${process.env.MYSQL_DATABASE}`

const db = mysql.createConnection(urlDB);

// MySQL connection
// const db = mysql.createConnection({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
// });

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

app.post('/register-salt', async (req, res) => {
    const {username, salt} = req.body;
    const query = 'INSERT INTO user_salt (username, salt) VALUES (?, ?)';

    db.query(query, [username, salt], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Error registering salt' });
        }
        res.status(201).json({ message: 'Salt registered successfully!', saltId: result.insertId });
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

app.post('/bio', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE id = ? AND password = ?';

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

app.get('/user_salt', (req, res) => {
    const query = 'SELECT * FROM user_salt';

    db.query(query, (err, result) => {
        if (err) {
            console.error('Error querying data:', err);
            return res.status(500).json({ error: 'Error fetching salt' });
        }
        res.json(result);
    });
});

// Change password route
app.post('/change-password', (req, res) => {
    const { username, newPassword } = req.body;

    // Check if the username exists
    const checkQuery = 'SELECT * FROM users WHERE username = ?';

    db.query(checkQuery, [username], (err, result) => {
        if (err) {
            console.error('Error querying data:', err);
            return res.status(500).json({ error: 'Error verifying user' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the password for the given username
        const updateQuery = 'UPDATE users SET password = ? WHERE username = ?';

        db.query(updateQuery, [newPassword, username], (err, result) => {
            if (err) {
                console.error('Error updating password:', err);
                return res.status(500).json({ error: 'Error updating password' });
            }
            res.json({ message: 'Password updated successfully' });
        });
    });
});

app.post('/change-bio', (req, res) => {
    const { username, bio } = req.body;

    // Check if the username exists
    const checkQuery = 'SELECT * FROM users WHERE username = ?';

    db.query(checkQuery, [username], (err, result) => {
        if (err) {
            console.error('Error querying data:', err);
            return res.status(500).json({ error: 'Error verifying user' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the password for the given username
        const updateQuery = 'UPDATE users SET bio = ? WHERE username = ?';

        db.query(updateQuery, [bio, username], (err, result) => {
            if (err) {
                console.error('Error updating password:', err);
                return res.status(500).json({ error: 'Error updating password' });
            }
            res.json({ message: 'Bio updated successfully' });
        });
    });
});

app.get('/user_bio', (req, res) => {
    const { username } = req.query;
    const query = 'SELECT * FROM users WHERE username = ?;';

    db.query(query,[username], (err, result) => {
        if (err) {
            console.error('Error querying data:', err);
            return res.status(500).json({ error: 'Error fetching bio' });
        }
        res.json(result); 
    });
});

app.post('/change-salt', (req, res) => {
    const { username, salt } = req.body;

    // Check if the username exists
    const checkQuery = 'SELECT * FROM user_salt WHERE username = ?';

    db.query(checkQuery, [username], (err, result) => {
        if (err) {
            console.error('Error querying data:', err);
            return res.status(500).json({ error: 'Error verifying user' });
        }

        if (result.length === 0) {  
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the password for the given username
        const updateQuery = 'UPDATE user_salt SET salt = ? WHERE username = ?';

        db.query(updateQuery, [salt, username], (err, result) => {
            if (err) {
                console.error('Error updating password:', err);
                return res.status(500).json({ error: 'Error updating password' });
            }
            res.json({ message: 'Password updated successfully' });
        });
    });
});

// Add this route to your existing server.js file

app.post('/send-message', (req, res) => {
    const { username, message, date } = req.body;
    
    const query = 'INSERT INTO public_chats (username, message, date) VALUES (?, ?, ?)';
    
    db.query(query, [username, message, date], (err, result) => {
        if (err) {
            console.error('Error inserting message:', err);
            return res.status(500).json({ error: 'Error sending message' });
        }
        res.status(201).json({ 
            message: 'Message sent successfully!', 
            chatId: result.insertId,
            timestamp: date
        });
    });
});

// Route to fetch messages
app.get('/messages', (req, res) => {
    // Read the limit from query parameters, defaulting to 50 if not provided
    const limit = parseInt(req.query.limit, 10) || 50;
    // Read the offset from query parameters, defaulting to 0 if not provided
    const offset = parseInt(req.query.offset, 10) || 0;
  
    // We're ordering by date DESC so that the most recent messages are returned first.
    // If you want to display them in ascending order on the client,
    // you can reverse the array before sending.
    const query = 'SELECT * FROM public_chats ORDER BY date DESC LIMIT ? OFFSET ?';
  
    db.query(query, [limit, offset], (err, result) => {
      if (err) {
        console.error('Error fetching messages:', err);
        return res.status(500).json({ error: 'Error retrieving messages' });
      }
      // If you prefer ascending order on the client, uncomment the following line:
      // result = result.reverse();
      res.json(result);
    });
  });
  
  

// Start server
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
