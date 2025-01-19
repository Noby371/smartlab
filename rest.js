'use strict';

exports.ok = function (values, rest) {
    let data = {
        "status": 200,
        "message": "OK",
        "data": values
    }
    rest.json(data);
    rest.end();
}