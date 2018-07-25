var http = require('http');

var fs = require("fs")

http.createServer(function (req, res) {

    
    fs.readFile("./index.html", function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(data, "utf-8");
        return res.end();
    })

}).listen(8080);