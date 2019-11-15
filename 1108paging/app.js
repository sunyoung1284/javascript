var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);
var mysql = require('mysql')
var bodyParser = require("body-parser");
var request = require('request');
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


app.get('/', function(req, res) {
  res.sendfile("main.html");
});

app.get('/selectItem', function(req, res) {
  var currentPage= req.query.currentPage
  var selectQuery = `select no,name,price from item limit ${(currentPage-1)*10},10;`;
  connection.query(selectQuery,
    function(err, rows, fields) {
      res.send(rows);
      return;
    });
});

app.get('/countItem', function(req, res) {
  var selectQuery = `select count(*) as totalData from item;`;
  connection.query(selectQuery,
    function(err, rows, fields) {
      res.send(rows);
      console.log(rows);
      return;
    });
});



// app.get('/insertItem', function(req, res) {
//   for(var i=1; i<350;i++){
//     var name = "item"+i;
//     var price = Math.floor(Math.random() * (3000-1000)+1000);
//     var inventory = 0;
//     var insertQuery = `insert into item (name,price,inventory) values ("${name}","${price}","${inventory}")`;
//     connection.query(insertQuery,
//       function(err, rows, fields) {
//   });
//     }
//     res.send("성공")
//
//
// });

app.get('/orderItem', function(req, res) {
  var no = Number(req.query.no);
  var selectQuery = `select * from item where no= ${no};`;
  console.log(selectQuery);
  connection.query(selectQuery,
    function(err, rows, fields) {
      res.send(rows);
      console.log(rows);
      return;
    });
});
