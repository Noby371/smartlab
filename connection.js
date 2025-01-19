let mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'kayy',
    password: 'mohzainalFatah371_',
    database: 'smartlab_db'
});

conn.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

module.exports = conn;