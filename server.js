const express = require('express');
const app = express();
require('dotenv').config();

// Middleware bawaan Express untuk parsing body
app.use(express.urlencoded({ extended: true }));  // Untuk menangani form-urlencoded
app.use(express.json());  // Untuk menangani JSON

// Panggil routes
let routes = require('./routes');
routes(app);

// Menggunakan PORT dari variabel lingkungan atau fallback ke 3000
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
