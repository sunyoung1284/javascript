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
  var selectQuery = `select * from item;`;
  connection.query(selectQuery,
    function(err, rows, fields) {
      res.send(rows);
      return;
    });
});

app.get('/selectJoinTable', function(req, res) {
  var selectQuery = `SELECT  a.no,a.id,a.itemNo,a.complete,a.quantity,a.date,b.name,b.price,b.inventory,b.onsale
  from ordertable as a left join item as b on a.itemNo = b.no;`;
  console.log("이거조인쿼리야"+selectQuery)
  connection.query(selectQuery,
    function(err, rows, fields) {
      res.send(rows);
      return;
    });
});

app.get('/order', function(req, res) {
  res.sendfile("order.html");
});

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

app.get('/insertOrderTable', function(req, res) {
  var buyNum = req.query.buyNum;
  var userId = req.query.userId;
  var no = req.query.no;
  var inventory = req.query.inventory;
  var realInventory = Number(inventory) - Number(buyNum)
  var insertQuery = `insert into ordertable (id,itemNo,quantity) values ("${userId}","${no}","${buyNum}")`;
  connection.query(insertQuery,
    function(err, rows, fields) {
      var updateQuery = `update item set inventory = inventory-${buyNum} where no =${no};`;
      console.log(updateQuery)
      connection.query(updateQuery,
        function(err, rows, fields) {

          res.send(rows);
        });

    });
});

app.get('/admin', function(req, res) {
  res.sendfile("admin.html");
});
app.get('/admin1', function(req, res) {
  res.sendfile("admin1.html");
});
app.get('/admin2', function(req, res) {
  res.sendfile("admin2.html");
});

app.get('/adminUpdate', function(req, res) {
  var no = req.query.no;
  var itemName = req.query.itemName;
  var itemPrice = req.query.itemPrice;
  var itemInventory = req.query.itemInventory;
  var itemOnsale = Number(req.query.itemOnsale)
  var updateQuery = `update item set name = "${itemName}", price="${itemPrice}", inventory="${itemInventory}" , onsale= ${itemOnsale} where no =${no};`;
  console.log(updateQuery)
  connection.query(updateQuery,
    function(err, rows, fields) {
      res.send(rows);
    });
});

app.get('/completeUpdate', function(req, res) {
  var complete = req.query.complete;
  var no = req.query.no;
  var updateQuery = `update ordertable set complete = "${complete}" where no =${no};`;
  console.log(updateQuery)
  connection.query(updateQuery,
    function(err, rows, fields) {
      res.send(rows);
    });
});
app.get('/adminInsert', function(req, res) {
  var itemName = req.query.itemName;
  var itemPrice = req.query.itemPrice;
  var itemInventory = req.query.itemInventory;
  var itemOnsale = Number(req.query.itemOnsale)
  var insertQuery = `insert into item (name,price,inventory,onsale) values ("${itemName}","${itemPrice}","${itemInventory}","${itemOnsale}")`;
  connection.query(insertQuery,
    function(err, rows, fields) {
      var selectQuery = `select * from item where no= '${rows.insertId}';`;
      console.log(selectQuery)
      connection.query(selectQuery,
        function(err, rows, fields) {
          res.send(rows);
        });
    });
});

app.get('/orderTableSelect', function(req, res) {
  var selectQuery = `select * from ordertable`;
  connection.query(selectQuery,
    function(err, rows, fields) {
      res.send(rows);
      return;
    });
});

app.get('/orderTableCancel', function(req, res) {
  var no = Number(req.query.no)
  var itemNo = req.query.itemNo;
  var cancelCount = req.query.cancelCount;
  var updateQuery = `update ordertable set complete = 2 where no =${no};`;
  var updateQuery2 = `update item set inventory = inventory+${cancelCount} where no =${itemNo};`;
  console.log(updateQuery)
  connection.query(updateQuery,
    function(err, rows, fields) {
      connection.query(updateQuery2,
        function(err, rows, fields) {

          res.send(rows);
        });
    });
});
