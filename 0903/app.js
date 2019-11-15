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

app.get('/', function(req, res) {
  res.sendfile("list.html");
});
app.get('/insert', function(req, res) {
  res.sendfile("insertList.html");
});
app.get('/details', function(req, res) {
  res.sendfile("details.html");
});

//post테이블에 파라미터를 입력받아 인서트!
app.get('/insertList', function(req, res) {
  var title = req.query.title;
  var content = req.query.content;
  var selectQuery = `insert into post (title,content) values ("${title}","${content}")`;
  connection.query(selectQuery,
    function(err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    })
});

//post테이블 셀렉트 해오는 쿼리
app.get('/selectPost', function(req, res) {
  var selectQuery = `select * from post`;
  connection.query(selectQuery,
    function(err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    })

});

//post테이블 파라미터를 받아 no부분 삭제
app.get('/selectDetails', function(req, res) {
  var no = req.query.no;
  var selectQuery = `select * from post where no = ${no}`;
  connection.query(selectQuery,
    function(err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    })

});

//요렇게 쓰면 selectPost 위에 있는 쿼리 두개 한번에 쓸 수 있다
app.get('/selectBox', function(req, res) {
  var no = req.query.no;
  var selectQuery;
  if (no == undefined) {
    selectQuery = `select no, title from post`;
  } else {
    selectQuery = `select title, content from post where no = ${no}`
  }
  connection.query(selectQuery,
    function(err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    })
});

// 파라미터를 받아와 no에 대한 title,content 수정
app.get('/updateDetails', function(req, res) {
  var title = req.query.title;
  var content = req.query.content;
  var no = Number(req.query.no)
  var selectQuery = `update post set title = "${title}", content="${content}" where no =${no};`;
  connection.query(selectQuery,
    function(err, rows, fields) {
      if (err) throw err;
      console.log(rows);
      res.send(rows);
    });
});

//post테이블 no 부분 삭제
app.get('/deleteDetails', function(req, res) {
  var no = Number(req.query.no)
  var selectQuery = `delete from post where no='${no}';`;
  console.log(selectQuery)
  connection.query(selectQuery,
    function(err, rows, fields) {

      res.send(rows);
    });
});
