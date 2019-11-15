var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);
var mysql = require('mysql');
var bodyParser = require("body-parser");
var request = require('request');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var connection = mysql.createConnection({
	host: 'localhost'
	, port: 3306
	, user: 'root'
	, password: 'root'
	, database: 'webui'
});




app.get('/ajax', function (req, res) {
	res.sendfile("ajax.html");
});


// var request=require('request');
// setInterval(function(){
//   request.get(`https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:005930|SERVICE_RECENT_ITEM:005930`,function (err, response, body) {
//   body=JSON.parse(body);
// 	var price =body.result.areas[1].datas[0].nv;
//   var query= `insert into requesttest (price) values (${price})`;
//   connection.query(query,
//     function(err, rows, fields) {
//       if(err) throw err;
//
// });
// });
// },1000);


app.get('/final', function (req, res) {
	res.sendfile("final.html");
});


app.get('/requestTest1', function (req, res) {
  request.get(`https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:005930|SERVICE_RECENT_ITEM:005930`,function (err, rows, body) {
  body=JSON.parse(body);
	res.send(body.result.areas[1].datas[0].nv+"");
});
});


app.get('/requestTest2', function (req, res) {
  request.get(`https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:066570|SERVICE_RECENT_ITEM:066570,005380,000660,078130,005930,308100,009150,028260,035720`,function (err, rows, body) {
  body=JSON.parse(body);
	res.send(body.result.areas[1].datas[0].nv+"");
});
});

app.get('/requestTest3', function (req, res) {
  request.get(`https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:035720|SERVICE_RECENT_ITEM:035720,066570,005380,000660,078130,005930,308100,009150,028260`,function (err, rows, body) {
  body=JSON.parse(body);
	res.send(body.result.areas[1].datas[0].nv+"");
});
});

app.get('/requestTest4', function (req, res) {
  request.get(`https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:005380|SERVICE_RECENT_ITEM:005380,035720,066570,000660,078130,005930,308100,009150,028260`,function (err, rows, body) {
  body=JSON.parse(body);
	res.send(body.result.areas[1].datas[0].nv+"");
});
});


app.get('/requestTest5', function (req, res) {
  request.get(`https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:000660|SERVICE_RECENT_ITEM:000660,005380,035720,066570,078130,005930,308100,009150,028260`,function (err, rows, body) {
  body=JSON.parse(body);
	res.send(body.result.areas[1].datas[0].nv+"");
});
});


app.get('/insertPrice', function(req, res) {
  var price = Number(req.query.price);
  var selectQuery = `insert into requesttest (price) values ("${price}")`;
  console.log(selectQuery)
  connection.query(selectQuery,
    function(err, rows, fields) {

      res.send(rows);
    });
});
app.get('/insertPrice2', function(req, res) {
  var price = Number(req.query.price);
  var selectQuery = `insert into requesttest2 (price) values ("${price}")`;
  console.log(selectQuery)
  connection.query(selectQuery,
    function(err, rows, fields) {

      res.send(rows);
    });
});
app.get('/insertPrice3', function(req, res) {
  var price = Number(req.query.price);
  var selectQuery = `insert into requesttest3 (price) values ("${price}")`;
  console.log(selectQuery)
  connection.query(selectQuery,
    function(err, rows, fields) {

      res.send(rows);
    });
});
app.get('/insertPrice4', function(req, res) {
  var price = Number(req.query.price);
  var selectQuery = `insert into requesttest4 (price) values ("${price}")`;
  console.log(selectQuery)
  connection.query(selectQuery,
    function(err, rows, fields) {

      res.send(rows);
    });
});
app.get('/insertPrice5', function(req, res) {
  var price = Number(req.query.price);
  var selectQuery = `insert into requesttest5 (price) values ("${price}")`;
  console.log(selectQuery)
  connection.query(selectQuery,
    function(err, rows, fields) {

      res.send(rows);
    });
});


app.get('/priceSelect', function(req, res) {
  var selectQuery = `select * from requesttest`;

  connection.query(selectQuery,
    function(err, rows, fields) {

      res.send(rows);
    });
});
app.get('/priceSelect2', function(req, res) {
  var selectQuery = `select * from requesttest2`;

  connection.query(selectQuery,
    function(err, rows, fields) {

      res.send(rows);
    });
});
app.get('/priceSelect3', function(req, res) {
  var selectQuery = `select * from requesttest3`;

  connection.query(selectQuery,
    function(err, rows, fields) {

      res.send(rows);
    });
});
app.get('/priceSelect4', function(req, res) {
  var selectQuery = `select * from requesttest4`;

  connection.query(selectQuery,
    function(err, rows, fields) {

      res.send(rows);
    });
});
app.get('/priceSelect5', function(req, res) {
  var selectQuery = `select * from requesttest5`;

  connection.query(selectQuery,
    function(err, rows, fields) {

      res.send(rows);
    });
});

app.get('/chart', function (req, res) {
	res.sendfile("chart.html");
});
