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


app.get('/form3', function(req, res) {
  res.sendfile("html2.html");
});

app.get('/form5', function(req, res) {
  res.sendfile("html1.html");
});


app.get('/form4', function(req, res) {
  var title = req.query.title;
  var text = req.query.text;
  var writer = req.query.writer;
  var selectQuery = `insert into news (title,text,writer) values ("${title}","${text}","${writer}")`;
  console.log(selectQuery)
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

app.get('/insertAircraftPage', function(req, res) {
  res.sendfile("insertAircraftPage.html");
});

app.get('/aircraftPage', function(req, res) {
  var selectQuery = `select * from aircraft`;

  connection.query(selectQuery,
    function(err, rows, fields) {

      res.send(rows);
    });
});

app.get('/insertAircraft', function(req, res) {
  var aircraftCode = req.query.aircraftCode;
  var aircraftName = req.query.aircraftName;
  var seats = req.query.seats;
  var selectQuery = `insert into aircraft (aircraftCode,aircraftName,seats) values ("${aircraftCode}","${aircraftName}","${seats}")`;
  console.log(selectQuery)
  connection.query(selectQuery,
    function(err, rows, fields) {

      res.send(rows);
    });
});

app.get('/eachDelete', function(req, res) {
  var no = Number(req.query.no)

  var selectQuery = `delete from aircraft where no='${no}';`;
  console.log(selectQuery)
  connection.query(selectQuery,
    function(err, rows, fields) {

      res.send(rows);
    });
});

app.get('/insertFlightPage', function(req, res) {
  res.sendfile("insertFlightPage.html");
});

app.get('/flightPage', function(req, res) {
  var selectQuery = `select * from flight`;

  connection.query(selectQuery,
    function(err, rows, fields) {

      res.send(rows);
    });
});

app.get('/insertflight', function(req, res) {
  var flightName = req.query.flightName;
  var aircraftCode = req.query.aircraftCode;
  var departure = req.query.departure;
  var arrival = req.query.arrival;
  var departTime = req.query.departTime;
  var arrivalTime = req.query.arrivalTime;

  var selectQuery = `insert into flight (flightName,aircraftCode,departure,arrival,departTime,arrivalTime) values ("${flightName}","${aircraftCode}","${departure}","${arrival}","${departTime}","${arrivalTime}")`;
  console.log(selectQuery)
  connection.query(selectQuery,
    function(err, rows, fields) {

      res.send(rows);
    });
});

app.get('/eachDelete2', function(req, res) {
  var no = Number(req.query.no)

  var selectQuery = `delete from flight where no='${no}';`;
  console.log(selectQuery)
  connection.query(selectQuery,
    function(err, rows, fields) {

      res.send(rows);
    });
});

app.get('/flightListPage', function(req, res) {
  res.sendfile("flightListPage.html");
});


app.get('/join', function(req, res) {
  var selectQuery = `select * from flight a, aircraft b where a.aircraftCode=b.aircraftCode`;

  connection.query(selectQuery,
    function(err, rows, fields) {

      res.send(rows);
    });
});
