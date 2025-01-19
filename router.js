'use strict';

module.exports = function(app){
    let myjson = require('./controller');
    app.get('/', myjson.index);
}