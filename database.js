const sqlite3 = require('sqlite3').verbose();
const Promise = require('bluebird');


class myDbApp {
   constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.log('Could not connect to database', err)
      } else {
        console.log('Connected to database')
      }
    })
  }
}

var myDb = new myDbApp("data.db");


function run(sql, params = []) {
    return new Promise((resolve, reject) => {
        this.db.run(sql, params, function (err) {
            if (err) {
                console.log('Error running sql ' + sql)
                console.log(err)
                reject(err)
            } else {
                resolve({
                    id: this.lastID
                })
            }
        })
    })
}

myDb.createTable() => {
    const sql = `
    CREATE TABLE IF NOT EXISTS db (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT
      fileurl TEXT)`
    return this.db.run(sql)
}

function create(name, fileurl) {
    return this.db.run(
        'INSERT INTO db (name, fileurl) VALUES (?,?)', [name, fileurl])
}


//db.close();


//module.exports = myDbApp; 
