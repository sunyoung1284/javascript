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

var io = require('socket.io').listen(server);

var user = [{id:"서녕",soketId:"testId"}];

app.get('/', function(req, res) {
  res.sendfile("home.html");
});

// 로그인 할 때
app.get('/login', function(req, res) {
  var id = req.query.id;
  for(var i =0; i<user.length; i++){
    if(user[i].id == id){
      res.send("로그인불가");
      return
    }
  }
  res.send("로그인성공")
});

var member = [];
io.on('connection', function(socket){
  socket.on('chat',function(params){
    socket.broadcast.to("chatroom").emit('newChatMsg',params)//나를 제외하고 뿌려줌
    var insertQuery = `insert into chat (id,message) values ("${params.id}","${params.message}")`;
    console.log(insertQuery);
    connection.query(insertQuery,
      function(err, rows, fields) {
        if (err) throw err;
      })
  })

  socket.on('joinRoom',function(id){
    var selectQuery = `SELECT * FROM (select * from chat a order BY a.timestamp DESC limit 0,15) b order BY b.timestamp ASC`
    connection.query(selectQuery,
      function(err, rows, fields) {
        socket.emit('selectChat', rows);
        console.log(rows)
        return;
      });
    socket.join("chatroom");

    socket.broadcast.to("chatroom").emit('newMember',id)

    member.push(id)
    socket.emit('allMember',member);
    socket.broadcast.to("chatroom").emit('newFace',id)
    user.push({id:id,socketId:socket.id});

  })

  socket.on('disconnect',function(){
    for(var i=0; i<user.length; i++){
      if(user[i].socketId==socket.id){

        socket.broadcast.to("chatroom").emit('outMember',user[i].id);
        user.splice(i,1);
        member.splice(i,1)
      }
    }
  })
});





// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });
