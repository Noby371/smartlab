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