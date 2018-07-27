const sqlite3 = require('sqlite3').verbose();


 
let db = new sqlite3.Database('sample.db');
 
db.run('CREATE TABLE langs(name text)');


 
db.close();