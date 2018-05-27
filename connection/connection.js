const mysql = require('mysql');
const connection = mysql.createConnection({
    // CHANGE THESE CONFIGURATION TO ACCORDING TO YOUR development environment :)
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'student'
});
connection.connect((err) => {
    if(err)
        throw err;
    console.log('Succesfully connected');
});

module.exports = connection;