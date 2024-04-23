const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('users.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the users database.');
});

db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Close the database connection.');
});
