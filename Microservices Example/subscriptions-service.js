const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Імпорт модуля cors

const app = express();

app.use(bodyParser.json());
app.use(cors()); // Використання cors як middleware для підтримки CORS

let subscriptions = [];

app.post('/subscriptions', (req, res) => {
    const newSubscription = req.body;
    subscriptions.push(newSubscription);
    res.status(201).json(newSubscription);
});

app.get('/subscriptions/:username', (req, res) => {
    const username = req.params.username;
    const userSubscriptions = subscriptions.filter(sub => sub.user === username);
    res.json(userSubscriptions);
});

app.listen(3001, () => {
    console.log('Subscriptions Service running on port 3001');
});
