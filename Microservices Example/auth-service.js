const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();

app.use(bodyParser.json());
app.use(cors());

let db = new sqlite3.Database('users.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the users database.');
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
    db.run(sql, [username, password], function(err) {
        if (err) {
            return res.status(400).json({ message: 'Registration failed' });
        }
        res.status(201).json({ message: 'Registration successful' });
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
    db.get(sql, [username, password], (err, row) => {
        if (err || !row) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.json({ message: 'Login successful' });
    });
});

app.listen(3002, () => {
    console.log('Auth Service running on port 3002');
});
