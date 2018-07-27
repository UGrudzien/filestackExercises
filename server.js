//source of this beloved code http://ericsowell.com/blog/2011/5/6/serving-static-files-from-node-js

const client = require('filestack-js').init('ADY3Owf7wRiWAXEIJ7cCrz')
var http = require('http');
var fs = require('fs');
var path = require('path');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('data.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});
 



http.createServer(function (request, response) {
    console.log('request starting...');

    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './index.html';

    var extname = path.extname(filePath); //The path.extname() method returns the extension of the path, from the last occurrence of the . (period) character to end of string in the last portion of the path
    var contentType = 'text/html';

    //Using fs.exists() to check for the existence of a file before calling fs.open(), fs.readFile() or fs.writeFile() is not recommended. Doing so introduces a race condition, since other processes may change the file's state between the two calls. Instead, user code should open/read/write the file directly and handle the error raised if the file does not exist.   

    fs.readFile(filePath, function (error, content) {
        if (error) {
            response.writeHead(500);
            response.end();
        } else {
            response.writeHead(200, {
                'Content-Type': contentType
            });
            response.end(content, 'utf-8');
        }
    });





}).listen(8080);
console.log('Server running at http://127.0.0.1:8080/');
// var mysql = require('mysql');
function run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          console.log('Error running sql ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve({ id: this.lastID })
        }
      })
    })
  }
function createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS db (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT
      urt TEXT)`
    return db.run(sql)
  }
  function  create(name) {
    return dbo.run(
      'INSERT INTO db (name) VALUES (?)',
      [name])
  }
//db.close();