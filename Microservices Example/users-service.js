const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose(); // Імпорт модуля sqlite3

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Підключення до бази даних
let db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the users database.');
});

// Створення таблиці, якщо вона не існує
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL
)`);

app.post('/users', (req, res) => {
    const newUser = req.body;
    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [newUser.username, newUser.password], function(err) {
        if (err) {
            return console.error(err.message);
        }
        res.status(201).json(newUser);
    });
});

app.get('/users/:username', (req, res) => {
    const username = req.params.username;
    db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        if (row) {
            res.json(row);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    });
});

app.listen(3000, () => {
    console.log('Users Service running on port 3000');
});
