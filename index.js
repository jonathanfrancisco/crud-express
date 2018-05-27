const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const sqlConnection = require('./connection/connection');
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');



app.get('/', (req, res) => {
    res.redirect('/students');
});

app.get('/students', (req, res) => {

    sqlConnection.query('SELECT * FROM student',(err, results, fields) => {
        if(err)
            throw err;
        res.render('index', {
            pageName: 'Index Page',
            students: results
        });
    });
    
});

app.post('/students', (req, res) => {
    var student = req.body;
    sqlConnection.query('INSERT INTO student SET ?', student, (err, results, fields) => {
        if(err)
            throw err;
        console.log(results);
    });
    res.redirect('/students');
});

app.get('/students/:id/delete', (req, res) => {
    var id = req.params.id;
    sqlConnection.query(`DELETE FROM student WHERE student_id = ${id}`, (err, results, fields) => {
        if(err)
            throw err;
    });

    res.redirect('/students');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

app.get('/students/:id/edit', (req, res) => {
    var id = req.params.id;
    sqlConnection.query(`SELECT * FROM student WHERE student_id = ${id}`, (err, results, fields) => {
        if(err)
            throw err;
            console.log(results);
        res.render('update', {
            pageName: 'Edit Page',
            student: results[0]
        });
    });

});

app.post('/students/:id/edit', (req, res) => {
    var paramID = req.params.id;
    var student = req.body;
  

    sqlConnection.query(`UPDATE student SET ? WHERE student_id = ${paramID}`, student, (err, results, fields) => {
        if(err)
            throw err;
        console.log(results);
    });

    res.redirect('/students');


});