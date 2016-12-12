var mysql = require('mysql');
var db;

var settings = {
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'KielServices'
};

function connectDatabase() {
    if (!db) {
        db = mysql.createConnection(settings);

        db.connect(function(err){
            if(!err) {
                console.log('Database is connected!');
            } else {
                console.log('Error connecting database!');
            }
        });
    }
    return db;
}

module.exports = connectDatabase();