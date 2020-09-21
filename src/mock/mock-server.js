const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();

app.use('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

const mockDataPath = (() => path.join(__dirname, '.', './data/'))(); // D:\testCODE\pc-education\src\mock\data\
const fileNameList = fs.readdirSync(mockDataPath); // 文件夹里所有文件名 [ 'a.json', 'b.json', 'dataTime.json' ]

let fileDirList = []; // [ 'D:\testCODE\pc-education\src\mock\data\a.json', ... ]
fileNameList.forEach(function(item) {
  const stat = mockDataPath + item;
  fileDirList.push(stat);
});

fileDirList.forEach((dir, index) => {
  fs.readFile(dir, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const filesName = '/' + fileNameList[index].split('.')[0]; //  '/dataTime'
      app.get('*' + filesName, (req, res) => {
        setTimeout(() => res.send(data), 1500);
        // res.send(data);
      });
      app.post('*' + filesName, (req, res) => {
        setTimeout(() => res.send(data), 1500);
        // res.send(data);
      });
    }
  });
});

app.listen('3000', () => {
  console.log('listen on 3000 serve');
});
