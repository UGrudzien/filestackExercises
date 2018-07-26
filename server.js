//source of this beloved code http://ericsowell.com/blog/2011/5/6/serving-static-files-from-node-js

const client = require('filestack-js').init('ADY3Owf7wRiWAXEIJ7cCrz')
var http = require('http');
var fs = require('fs');
var path = require('path');
var mysql = require('mysql');

http.createServer(function (request, response) {
    console.log('request starting...');

    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './index.html';

    var extname = path.extname(filePath); //The path.extname() method returns the extension of the path, from the last occurrence of the . (period) character to end of string in the last portion of the path
    var contentType = 'text/html';
    // switch (extname) {
    //     case '.js':
    //         contentType = 'css';
    //         break;
    //     case '.css':
    //         contentType = 'css';
    //         break;
    // }
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


