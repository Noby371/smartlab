'use strict';

const response = require('./rest');
const connection = require('./connection');

exports.index = function (req, res) {
    response.ok('Hello World', res);
}