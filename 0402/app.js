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
app.get('/js2', function (req,res) {
    res.sendfile("js2.html");
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
console.log("running");
