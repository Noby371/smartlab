'use strict';

const mysql = require('mysql');
require('dotenv').config(); // Memuat variabel dari file .env

// Membuat koneksi ke database MySQL menggunakan variabel dari .env
const connection = mysql.createConnection({
    host: process.env.DB_HOST,         // Menggunakan DB_HOST dari .env
    user: process.env.DB_USER,         // Menggunakan DB_USER dari .env
    password: process.env.DB_PASSWORD, // Menggunakan DB_PASSWORD dari .env
    database: process.env.DB_DATABASE  // Menggunakan DB_DATABASE dari .env
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
