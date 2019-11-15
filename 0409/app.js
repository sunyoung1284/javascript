var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);

app.get('/file6', function (req,res) {
    res.sendfile("hello3.html");
});

app.get('/ta', function (req,res) {
    res.sendfile("table.html");
});

app.get('/t1', function (req,res) {
    res.sendfile("table1.html");
});

app.get('/s1', function (req,res) {
    res.sendfile("style.html");
});

app.get('/color', function (req,res) {
    res.sendfile("css.html");
});

app.get('/js', function (req,res) {
    res.sendfile("js.html");
});
app.get('/js1', function (req,res) {
    res.sendfile("js1.html");
});

app.get('/js3', function (req,res) {
    res.sendfile("js3.html");
});
app.get('/js4', function (req,res) {
    res.sendfile("js4.html");
});
app.get('/js5', function (req,res) {
    res.sendfile("js5.html");
});
app.get('/js6', function (req,res) {
    res.sendfile("js6.html");
});
app.get('/js7', function (req,res) {
    res.sendfile("js7.html");
});
app.get('/js8', function (req,res) {
    res.sendfile("js8.html");
});
app.get('/js9', function (req,res) {
    res.sendfile("js9.html");
});
app.get('/js10', function (req,res) {
    res.sendfile("js10.html");
});
app.get('/js11', function (req,res) {
    res.sendfile("js11.html");
});
app.get('/js12', function (req,res) {
    res.sendfile("js12.html");
});


app.get('/sum', function (req,res) {
  var num1=Number(req.query.num1);
  var num2=Number(req.query.num2);
  var num3=Number(req.query.num3);
  console.log(num1,num2,num3);
  res.send(`sum is ${num1*num2*num3}`)

});

app.get('/sumform', function (req,res) {
    res.sendfile("sum.html");
});

app.get('/price', function (req,res) {
  var money = Number(req.query.money);
  var priceTable = [
    {name:"item1", price:1000},
    {name:"item2", price:5000},
    {name:"item3", price:10000},
    {name:"item4", price:30000},
    {name:"item5", price:50000},
    {name:"item6", price:100000},
    {name:"item7", price:500000}
  ];

  var result = "구입불가";
  for(var i =0; i<priceTable.length; i++) {
    if (priceTable[i]["price"]<=money) {
      result = priceTable[i]["name"]

    }
  }
  res.send(result)
});
app.get('/purchase', function (req,res) {
    res.sendfile("purchase.html");
});

app.get('/js13', function (req,res) {
    res.sendfile("js13.html");
});

app.get('/carPrice', function (req,res) {
  var carprice =req.query.carprice
  var colorprice =req.query.colorprice

  var carTable = [
    {name:"현대", price:2100},
    {name:"기아", price:1300},
    {name:"쌍용", price:1500},
    {name:"벤츠", price:3500},
    {name:"bmw", price:3200}
  ];
  var colorTable = [
    {name:"빨강", price:100},
    {name:"파랑", price:120},
    {name:"초록", price:200},
    {name:"노랑", price:130},
    {name:"검정", price:80}

  ];
  var result = carTable[carprice].price+colorTable[colorprice].price+"만원";
  res.send(result)

});

app.get('/js14', function (req,res) {
    res.sendfile("js14.html");
});

app.get('/js15', function (req,res) {
    res.sendfile("js15.html");
});








console.log("running");
