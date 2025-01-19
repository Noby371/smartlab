'use strict';

const mysql = require('mysql');
require('dotenv').config(); // Memuat variabel dari file .env

const connection = mysql.createConnection({
    host: process.env.DB_HOST,         
    user: process.env.DB_USER,        
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_DATABASE  
});

// Membuat koneksi dan menangani error
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ', err.stack);
        return;
    }
    console.log('Connected to MySQL');
});

// Mengekspor koneksi agar bisa digunakan di file lain
module.exports = connection;
