'use strict';

exports.ok = function (values, res) {
    let data = {
        "status": 200,
        "message": "OK",
        "data": values
    }
    res.json(data);
    res.end();
}