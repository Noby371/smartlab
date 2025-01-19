'use strict';

const response = require('./res');
const connection = require('./connection');

exports.index = function (req, res) {
    response.ok('Hello World', res);
}

// MENAMPILKAN SEMUA DATA MAHASISWA
exports.getAllStudents = function (req, res) {
    connection.query('SELECT * FROM tbl_Mahasiswa', (err, rows, fields) => {
        if (err) throw err;
        response.ok(rows, res);
    });
}

// MENAMPILKAN DATA MAHASISWA BERDASARKAN NPM
exports.getStudentByNpm = function (req, res) {
    let npm = req.params.npm;
    connection.query('SELECT * FROM tbl_Mahasiswa WHERE npm = ?', [npm], (err, rows, fields) => {
        if (err) throw err;
        response.ok(rows, res);
    });
}

// MENAMBAH MAHASISWA BARU
exports.addStudent = function (req, res) {
    // Ambil data dari body request
    let { 
        NPM, Nama, Semester, Alamat, Gender, Telepon, Email, Uname, Upass 
    } = req.body;

    // Validasi input (contoh sederhana)
    if (!NPM || !Nama || !Semester || !Alamat || !Gender || !Telepon || !Email || !Uname || !Upass) {
        return res.status(400).json({
            status: 400,
            message: "Semua data mahasiswa harus diisi!"
        });
    }

    // Buat objek mahasiswa
    let student = { NPM, Nama, Semester, Alamat, Gender, Telepon, Email, Uname, Upass };

    // Query untuk menambahkan data mahasiswa
    connection.query('INSERT INTO tbl_Mahasiswa SET ?', student, (err, rows) => {
        if (err) {
            console.error(`Error saat menambahkan mahasiswa: ${err.message}`); // Log ke server
            return res.status(500).json({
                status: 500,
                message: "Terjadi kesalahan pada server.",
                error: err.message
            });
        }

        // Jika berhasil
        return res.status(201).json({
            status: 201,
            message: "Mahasiswa berhasil ditambahkan!",
            data: {
                id: rows.insertId, // ID dari mahasiswa yang baru ditambahkan
                ...student
            }
        });
    });
};
