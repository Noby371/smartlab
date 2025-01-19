'use strict';

module.exports = function(app){
    let myjson = require('./controller');

    app.route('/')
        .get(myjson.index);

    app.route('/students')
        .get(myjson.getAllStudents);

    app.route('/students/:npm')
        .get(myjson.getStudentByNpm);

    app.route('/add')
        .post(myjson.addStudent);

    app.route('/edit')
        .put(myjson.editStudent);

    app.route('/delete')
        .delete(myjson.deleteStudent);
}