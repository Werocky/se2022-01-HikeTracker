'use strict';

const sqlite = require('sqlite3');

class DatabaseConnection {
    static db = new sqlite.Database("./HikeTracker.db", (err) => { if (err) throw err; });

    static async createConnection() {
       // await this.createTablePositions();

    }

    //example:
   /* static createTablePositions() {
        return new Promise(async (resolve, reject) => {
            const sql = "CREATE TABLE IF NOT EXISTS Positions (positionID TEXT PRIMARY KEY UNIQUE NOT NULL, aisle TEXT, row TEXT, col TEXT, maxWeight INTEGER, maxVolume INTEGER, occupiedWeight INTEGER, occupiedVolume INTEGER);";
            this.db.run(sql, [], function (err) {
                if (err)
                    reject(err);
                else {
                    resolve('Tables created');
                }
            });
        });
    }
    */
}

module.exports = DatabaseConnection;