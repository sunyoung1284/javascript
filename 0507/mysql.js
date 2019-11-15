var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);
var mysql = require('mysql')
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'webui'
});

app.get('/select', function(req, res) {
  var no = req.query.no;
  var selectQuery = `select * from news where no=${no}`;
  connection.query(selectQuery,
    function(err, rows, fields) {
      if (err) throw err;
      console.log(rows);
      res.send(rows);
    })

});

app.get('/form', function(req, res) {
  res.sendfile("html.html");
});

app.get('/dbSelectTest', function(req, res) {
  var selectQuery = `select title from news`;

  connection.query(selectQuery,
    function(err, rows, fields) {

      res.send(rows);
    });
});

app.get('/form2', function(req, res) {
  res.sendfile("newList.html");
});

app.get('/newList', function(req, res) {

  var selectQuery = `select * from news`;

  connection.query(selectQuery,
    function(err, rows, fields) {

      res.send(rows);
    });
});

app.get('/form3', function(req, res) {
  res.sendfile("html2.html");
});

app.get('/form5', function(req, res) {
  res.sendfile("html1.html");
});


app.get('/form4', function(req, res) {
  var title = req.query.title;
  var text = req.query.text;
  var writer= req.query.writer;
  var selectQuery = `insert into news (title,text,writer) values ("${title}","${text}","${writer}")`;
  console.log(selectQuery)
  connection.query(selectQuery,
    function(err, rows, fields) {

      res.send(rows);
    });
});

app.post('/form44', function(req, res) {

  var selectQuery = `insert into news (title,text) values ("${req.body.title}","${req.body.text}")`;
  connection.query(selectQuery,
    function(err, rows, fields) {

      res.send(rows);
    });
});

app.get('/newList1', function(req, res) {

  var selectQuery = `select * from news`;

  connection.query(selectQuery,
    function(err, rows, fields) {

      res.send(rows);
    });
});

app.get('/newList2', function(req, res) {

  var selectQuery = `select * from news`;

  connection.query(selectQuery,
    function(err, rows, fields) {

      res.send(rows);
    });
});

app.get('/newsDeleteForm', function(req, res) {
  res.sendfile("delet.html");
});

app.get('/delete', function(req, res) {
  var selectQuery = `delete from news`;
  connection.query(selectQuery,
    function(err, rows, fields) {

      res.send(rows);
    });
});


app.get('/eachDelete', function(req, res) {
  var number = Number(req.query.number)

  var selectQuery = `delete from news where no='${number}';`;

  connection.query(selectQuery,
    function(err, rows, fields) {

      res.send(rows);
    });
});

app.get('/updateform', function(req, res) {
  res.sendfile("update.html");
});

app.get('/update', function(req, res) {
  var title = req.query.title;
  var text = req.query.text;
  var writer = req.query.writer;
  var no = Number(req.query.no)
  var selectQuery = `update news set title = "${title}", text="${text}", writer="${writer}" where no =${no};`;
console.log(selectQuery)
  connection.query(selectQuery,
    function(err, rows, fields) {

      res.send(rows);
    });
});
app.get('/getUpdateNews', function(req, res) {
  var no = Number(req.query.no)
  var selectQuery = `select * from news where no=${no}`;

  connection.query(selectQuery,
    function(err, rows, fields) {

      res.send(rows);
    });
});

app.get('/time', function(req, res) {
  res.sendfile("time.html");
});
