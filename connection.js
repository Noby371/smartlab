let mysql = require('mysql');
require('dotenv').config(); // Menggunakan dotenv untuk mengakses variabel lingkungan

// Pooling untuk mengelola koneksi lebih efisien
const pool = mysql.createPool({
    connectionLimit: 10, // Maksimum koneksi yang diperbolehkan pada pool
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'kayy',
    password: process.env.DB_PASSWORD || 'mohzainalFatah371_',
    database: process.env.DB_NAME || 'smartlab_db'
});

// Menggunakan pool untuk koneksi
pool.getConnection((err, conn) => {
    if (err) {
        console.error('Error connecting to database: ', err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + conn.threadId);
    conn.release(); // Jangan lupa untuk melepaskan koneksi setelah selesai
});

// Mengekspor pool untuk digunakan di bagian lain aplikasi
module.exports = pool;
