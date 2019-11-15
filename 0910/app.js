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
const cheerio = require('cheerio');
var find = require('cheerio-eq');
const $ = cheerio.load('<ul id="fruits">...</ul>');


app.get('/', function(req, res) {
  res.sendfile("menu.html");
});

// https://github.com/watson/cheerio-eq  (cheerio-eq(쓰는법))
//cheerio를 사용하여 식단 정보 크롤링 해오기
app.get('/request', function(req, res) {
  request.get(`http://www.kopo.ac.kr/kangseo/content.do?menu=262`, function(err, rows, body) {
    let resultArr = [];
    const $ = cheerio.load(body);
    for(var i=0; i<7; i++){
      resultArr[i] = $("table").find('tbody').find('tr').eq(i).find('td').find('span').text();
    }
    console.log(resultArr)
    res.send(resultArr);
  });
});

const Excel = require('exceljs/modern.nodejs');

//엑셀 파일로 저장할때 어느 위치에 데이터가 들어가는지
app.post('/excelFile', function(req, res) {
  var reqParam = JSON.parse(req.body.param);
  var workbook = new Excel.Workbook();
  var sheet = workbook.addWorksheet('menu');
  for(var i=0; i<reqParam.data.monday.length; i++){
    sheet.getCell('A'+(1)).value= reqParam.data.eachWeek[0]
    sheet.getCell('A'+(i+2)).value= reqParam.data.monday[i];
    sheet.getCell('B'+(i+2)).value= reqParam.data.eachTotal.monTotal[i];
    sheet.getCell('A'+(9)).value= "평균"
    sheet.getCell('B'+(9)).value= reqParam.data.monAverage;
  }
  for(var i=0; i<reqParam.data.tuesday.length; i++){
    sheet.getCell('C'+(1)).value= reqParam.data.eachWeek[1]
    sheet.getCell('C'+(i+2)).value= reqParam.data.tuesday[i];
    sheet.getCell('D'+(i+2)).value= reqParam.data.eachTotal.tueTotal[i];
    sheet.getCell('C'+(9)).value= "평균"
    sheet.getCell('D'+(9)).value= reqParam.data.tueAverage;
  }
  for(var i=0; i<reqParam.data.wednesday.length; i++){
    sheet.getCell('E'+(1)).value= reqParam.data.eachWeek[2]
    sheet.getCell('E'+(i+2)).value= reqParam.data.wednesday[i];
    sheet.getCell('F'+(i+2)).value= reqParam.data.eachTotal.wedTotal[i];
    sheet.getCell('E'+(9)).value= "평균"
    sheet.getCell('F'+(9)).value= reqParam.data.wedAverage;
  }
  for(var i=0; i<reqParam.data.thursday.length; i++){
    sheet.getCell('G'+(1)).value= reqParam.data.eachWeek[3]
    sheet.getCell('G'+(i+2)).value= reqParam.data.thursday[i];
    sheet.getCell('H'+(i+2)).value= reqParam.data.eachTotal.thuTotal[i];
    sheet.getCell('G'+(9)).value= "평균"
    sheet.getCell('H'+(9)).value= reqParam.data.thuAverage;
  }
  for(var i=0; i<reqParam.data.friday.length; i++){
    sheet.getCell('I'+(1)).value= reqParam.data.eachWeek[4]
    sheet.getCell('I'+(i+2)).value= reqParam.data.friday[i];
    sheet.getCell('J'+(i+2)).value= reqParam.data.eachTotal.friTotal[i];
    sheet.getCell('I'+(9)).value= "평균"
    sheet.getCell('J'+(9)).value= reqParam.data.friAverage;
  }

  var columns =['A','B','C','D','E','F','G','H','I','J']

  for(var i=0; i<columns.length; i++){
    sheet.getCell(columns[i]+1).fill = {
      type: 'pattern',
      pattern:'solid',
      fgColor:{argb:'FFADD8E6'}
    };
    //컬럼 글씨, 글씨크기
    sheet.getCell(columns[i]+1).font = {
      name: '맑은 고딕',
      family: 4,
      size: 13
    };

    for(var j=0; j< 10; j++){
      sheet.getCell(columns[i]+j).alignment = { vertical: 'middle', horizontal: 'center' };

      sheet.getCell('A'+(j+2)).fill = {
        type: 'pattern',
        pattern:'solid',
        fgColor:{argb:'FFFFD700'}
      };
    }

  }

  // 엑셀 파일 저장 이름
  workbook.xlsx.writeFile('menu.xlsx')
  .then(function () {
    res.send("res");
  });

});


//// 이게 뭐냐면~ 다운로드 받을때 어디로 저장할지~그거 뜨잖아 그고임!^__^
var fs = require('fs');
app.get('/getExcelFile', function(req, res) {
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader("Content-Disposition", "attachment; filename=menu.xlsx" );

  res.sendFile(__dirname + '/menu.xlsx',function(err){
    fs.unlinkSync(__dirname + '/menu.xlsx');
  })
  });




// function createNewExcelFile(excelFilePath) {
//     //excelFilePath: Provide path and file name for excel file
//     var Excel = require('exceljs');// load exceljs module
//     var workbook = new Excel.Workbook(); //create object of workbook
//     //add sheet to workbook
//     var newSheet = workbook.addWorksheet('menu');
//     //use write file function to create new file
//     workbook.xlsx.writeFile(excelFilePath)
//         .then(function () {
//             console.log("excel file created successfully");
//         });
// }
// //To execute above function
// var filePath = "C:/Users/SMART-14/Desktop/임선영/0910/NewExcel.xlsx";
// createNewExcelFile(filePath);
//
//
// function addRowToNewExcel(excelFilePath) {
//     //excelFilePath: Provide path and file name for excel file
//     var Excel = require('exceljs');// load exceljs module
//     var workbook = new Excel.Workbook(); //create object of workbook
//     //add sheet to workbook
//     var newSheet = workbook.addWorksheet('menu');
//     let colIdUserName=1,colIdPassword=2,colIdResult=3; //create variable for column ID/column Number
//       //Create an array  to enter row
//     var rowData = [];
//     rowData[colIdUserName] = 'Username_New'; //where 1 is first column   i.e. A
//     rowData[colIdPassword] = 'Password_New';
//     rowData[colIdResult] = 'Result_New';
//     //use addRow to write row on created sheet
//     newSheet.addRow(rowData);
//
//     //use write file function to create new file
//     workbook.xlsx.writeFile(excelFilePath)
//         .then(function () {
//             console.log("excel file created successfully");
//         });
// }
// //To execute above function
// var filePath = "C:/Users/SMART-14/Desktop/임선영/0910/NewExcel.xlsx";
// addRowToNewExcel(filePath);
