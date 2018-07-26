const sqlite3 = require('sqlite3').verbose();
var http = require('http');
var fs = require('fs');
var path = require('path');

	
let db = new sqlite3.Database('data.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});


