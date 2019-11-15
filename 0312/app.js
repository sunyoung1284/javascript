var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);


app.get('/', function (req,res) {
  res.send("main page");
});

app.get('/test', function (req,res) {
  res.send("hello worlddd");
});

app.get('/file', function (req,res) {
  res.sendfile("hello.html");
});

app.get('/file2', function (req,res) {
  res.sendfile("rawfile");
});

app.get('/file3', function (req,res) {
  res.sendfile("itzy.jpg");
});

app.get('/file5', function (req,res) {
    res.sendfile("hello2.html");
});

app.get('/file6', function (req,res) {
    res.sendfile("hello3.html");
});


console.log("running");
