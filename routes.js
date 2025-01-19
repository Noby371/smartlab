'use strict';

module.exports = function(app){
    let myjson = require('./controller');

    app.route('/')
        .get(myjson.index);

    app.route('/students')
        .get(myjson.getAllStudents);

    app.route('/students/:npm')
        .get(myjson.getStudentByNpm);
}