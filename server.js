const express = require('express');
const app = express();

// Middleware bawaan Express untuk parsing body
app.use(express.urlencoded({ extended: true })); // Untuk menangani form-urlencoded
app.use(express.json()); // Untuk menangani JSON

// Panggil routes
const routes = require('./routes');
routes(app);

// Middleware untuk menangani rute yang tidak ditemukan
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Rute tidak ditemukan',
    });
});

// Middleware untuk menangani error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Terjadi kesalahan pada server',
    });
});

// Jalankan server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
