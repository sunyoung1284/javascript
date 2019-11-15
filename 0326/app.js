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
console.log("running");
