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

// UPDATE MAHASISWA
exports.editStudent = function (req, res) {
    // Ambil data dari request body
    let {
        NPM, Nama, Semester, Alamat, Gender, Telepon, Email, Uname, Upass
    } = req.body;

    // Validasi input (contoh sederhana)
    if (!NPM || !Nama || !Semester) {
        return res.status(400).json({
            status: 400,
            message: "NPM, Nama, dan Semester wajib diisi."
        });
    }

    // Data mahasiswa yang akan diperbarui
    let student = { Nama, Semester, Alamat, Gender, Telepon, Email, Uname, Upass };

    // Query update ke database
    connection.query(
        'UPDATE tbl_Mahasiswa SET ? WHERE npm = ?',
        [student, NPM],
        (err, rows) => {
            if (err) {
                console.error('Error updating student:', err);
                return res.status(500).json({
                    status: 500,
                    message: "Terjadi kesalahan saat memperbarui data mahasiswa."
                });
            }

            // Jika tidak ada baris yang diperbarui
            if (rows.affectedRows === 0) {
                return res.status(404).json({
                    status: 404,
                    message: `Mahasiswa dengan NPM ${NPM} tidak ditemukan.`
                });
            }

            // Respons jika berhasil
            return res.status(200).json({
                status: 200,
                message: `Data mahasiswa dengan NPM ${NPM} berhasil diperbarui.`,
                data: { NPM, ...student } // Gabungkan NPM ke dalam data yang dikembalikan
            });
        }
    );
};

// HAPUS MAHASISWA
exports.deleteStudent = function (req, res) {
    let NPM = req.body.NPM;

    // Validasi jika NPM tidak ada
    if (!NPM) {
        return res.status(400).json({
            status: 400,
            message: "NPM wajib diisi."
        });
    }

    // Eksekusi query untuk menghapus mahasiswa
    connection.query('DELETE FROM tbl_Mahasiswa WHERE NPM = ?', [NPM], (err, rows) => {
        if (err) {
            console.error(err); // Menangani error
            return res.status(500).json({
                status: 500,
                message: "Terjadi kesalahan pada server.",
                error: err.message
            });
        }

        // Jika tidak ada baris yang terpengaruh (data tidak ditemukan)
        if (rows.affectedRows === 0) {
            return res.status(404).json({
                status: 404,
                message: `Mahasiswa dengan NPM ${NPM} tidak ditemukan.`
            });
        }

        // Respons jika berhasil
        return res.status(200).json({
            status: 200,
            message: `Data mahasiswa dengan NPM ${NPM} berhasil dihapus.`,
            data: { NPM }
        });
    });
};

