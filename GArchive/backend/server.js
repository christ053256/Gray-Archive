import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, push, query, orderByChild, limitToLast, update } from "firebase/database";
import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Register route
app.post('/register', async (req, res) => {
    try {
        const { username, email, password, nickname } = req.body;
        
        // Check if username already exists
        const userRef = ref(database, `users/${username}`);
        const snapshot = await get(userRef);
        
        if (snapshot.exists()) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Create new user
        await set(userRef, {
            email,
            password,
            nickname,
            bio: ''
        });

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
});

// Register salt
app.post('/register-salt', async (req, res) => {
    try {
        const { username, salt } = req.body;
        const saltRef = ref(database, `user_salt/${username}`);
        
        await set(saltRef, { salt });
        res.status(201).json({ message: 'Salt registered successfully!' });
    } catch (error) {
        console.error('Error registering salt:', error);
        res.status(500).json({ error: 'Error registering salt' });
    }
});

// Login route
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const userRef = ref(database, `users/${username}`);
        const snapshot = await get(userRef);

        if (!snapshot.exists()) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const userData = snapshot.val();
        if (userData.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.json({ message: 'Login successful!', user: { ...userData, username } });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Error logging in' });
    }
});

// Fetch all users route
app.get('/users', async (req, res) => {
    try {
        const usersRef = ref(database, 'users');
        const snapshot = await get(usersRef);
        
        if (!snapshot.exists()) {
            return res.json([]);
        }

        const users = [];
        snapshot.forEach((childSnapshot) => {
            users.push({
                username: childSnapshot.key,
                ...childSnapshot.val()
            });
        });

        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error fetching users' });
    }
});

// Get user salts
app.get('/user_salt', async (req, res) => {
    try {
        const saltsRef = ref(database, 'user_salt');
        const snapshot = await get(saltsRef);
        
        if (!snapshot.exists()) {
            return res.json([]);
        }

        const salts = [];
        snapshot.forEach((childSnapshot) => {
            salts.push({
                username: childSnapshot.key,
                ...childSnapshot.val()
            });
        });

        res.json(salts);
    } catch (error) {
        console.error('Error fetching salts:', error);
        res.status(500).json({ error: 'Error fetching salts' });
    }
});

// Change password route
app.post('/change-password', async (req, res) => {
    try {
        const { username, newPassword } = req.body;
        const userRef = ref(database, `users/${username}`);
        
        const snapshot = await get(userRef);
        if (!snapshot.exists()) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userData = snapshot.val();
        await update(userRef, {
            ...userData,
            password: newPassword
        });

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ error: 'Error updating password' });
    }
});

// Change bio route
app.post('/change-bio', async (req, res) => {
    try {
        const { username, bio } = req.body;
        const userRef = ref(database, `users/${username}`);
        
        const snapshot = await get(userRef);
        if (!snapshot.exists()) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userData = snapshot.val();
        await update(userRef, {
            ...userData,
            bio
        });

        res.json({ message: 'Bio updated successfully' });
    } catch (error) {
        console.error('Error updating bio:', error);
        res.status(500).json({ error: 'Error updating bio' });
    }
});

// Get user bio
app.get('/user_bio', async (req, res) => {
    try {
        const { username } = req.query;
        const userRef = ref(database, `users/${username}`);
        
        const snapshot = await get(userRef);
        if (!snapshot.exists()) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json([{ ...snapshot.val(), username }]);
    } catch (error) {
        console.error('Error fetching bio:', error);
        res.status(500).json({ error: 'Error fetching bio' });
    }
});

// Change salt route
app.post('/change-salt', async (req, res) => {
    try {
        const { username, salt } = req.body;
        const saltRef = ref(database, `user_salt/${username}`);
        
        const snapshot = await get(saltRef);
        if (!snapshot.exists()) {
            return res.status(404).json({ error: 'User not found' });
        }

        await set(saltRef, { salt });
        res.json({ message: 'Salt updated successfully' });
    } catch (error) {
        console.error('Error updating salt:', error);
        res.status(500).json({ error: 'Error updating salt' });
    }
});

// Send message route
app.post('/send-message', async (req, res) => {
    try {
        const { username, message, date } = req.body;
        const chatRef = ref(database, 'public_chats');
        
        const newMessageRef = push(chatRef);
        await set(newMessageRef, {
            username,
            message,
            date
        });

        res.status(201).json({
            message: 'Message sent successfully!',
            chatId: newMessageRef.key,
            timestamp: date
        });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Error sending message' });
    }
});

// Get messages route
app.get('/messages', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit, 10) || 50;
        const chatRef = ref(database, 'public_chats');
        
        const messagesQuery = query(chatRef, orderByChild('date'), limitToLast(limit));
        const snapshot = await get(messagesQuery);
        
        if (!snapshot.exists()) {
            return res.json([]);
        }

        const messages = [];
        snapshot.forEach((childSnapshot) => {
            messages.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });

        // Sort messages in descending order by date
        messages.sort((a, b) => new Date(b.date) - new Date(a.date));
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Error retrieving messages' });
    }
});

// Start server
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});