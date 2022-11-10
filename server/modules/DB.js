'use strict';

const sqlite = require('sqlite3');
const fs = require('fs');

class DatabaseConnection {
    static db = new sqlite.Database("./HikeTracker.db", (err) => { if (err) throw err; });

    static async createConnection() {
        //add any create table function that is created in the future to create a database from 0
        await this.createTableHikes();
        await this.createTableUsers();
        await this.createTableHikeLocations();

        await this.populateTables();

    }

    //example:
    static createTableHikes() {
        return new Promise(async (resolve, reject) => {
            const sql = "CREATE TABLE IF NOT EXISTS Hikes (HikeID TEXT PRIMARY KEY UNIQUE NOT NULL,Title TEXT, Length FLOAT,  ExpectedTime FLOAT, Ascent FLOAT, Difficulty TEXT, Start TEXT, End TEXT, Description TEXT);";
            this.db.run(sql, [], function (err) {
                if (err)
                    reject(err);
                else {
                    resolve('Table Hikes created');
                }
            });
        });
    }

    static createTableHikeLocations() {
        return new Promise(async (resolve, reject) => {
            const sql = "CREATE TABLE IF NOT EXISTS HikeLocations (HikeID TEXT PRIMARY KEY UNIQUE NOT NULL,Province TEXT, City TEXT);";
            this.db.run(sql, [], function (err) {
                if (err)
                    reject(err);
                else {
                    resolve('Table HikeLocations created');
                }
            });
        });
    }

    static createTableUsers() {
        return new Promise(async (resolve, reject) => {
            const sql = "CREATE TABLE IF NOT EXISTS Users (Id INTEGER PRIMARY KEY UNIQUE NOT NULL, Hash TEXT NOT NULL, salt TEXT NOT NULL,  email TEXT NOT NULL, role TEXT NOT NULL);";
            this.db.run(sql, [], function (err) {
                if (err)
                    reject(err);
                else {
                    resolve('Table Users created');
                }
            });
        });
    }

    static async deleteDB() {
        fs.rm('./HikeTracker.db', (err) => {
            if (err) {
                throw err;
            }

            console.log("Delete File successfully.");
        })
    }

    static async populateTables() {
        await this.populateHikes();
        await this.populateHikeLocations();
        await this.populateUsers();
    }

    static populateHikes() {
        return new Promise(async (resolve, reject) => {
            const sql = "INSERT INTO Hikes(HikeID, Title, Length,  ExpectedTime, Ascent, Difficulty, Start, End, Description) VALUES "+
            "('h1', 'Hike to hut Duca degli Abruzzi', 5.26, 200, 794, 'H', 'id_start1', 'id_end1', 'Classico e frequentato percorso da Cervinia al Rifugio all’Orionde Duca degli Abruzzi (2.805 m.).');";
            this.db.run(sql, [], function (err) {
                if (err)
                    reject(err);
                else {
                    resolve('Tables created');
                }
            });
        });
    }

    static populateHikeLocations() {
        return new Promise(async (resolve, reject) => {
            const sql = "INSERT INTO HikeLocations(HikeID, Province, City) VALUES "+
            "('h1', 'Aosta', 'Cervinia');";
            this.db.run(sql, [], function (err) {
                if (err)
                    reject(err);
                else {
                    resolve('Tables created');
                }
            });
        });
    }

    static populateUsers() {
        return new Promise(async (resolve, reject) => {
            const sql = "INSERT INTO Users(Id, Hash, salt, role) VALUES "+
            "('b@polito.it','1a42b2b340fb544339c01cf46a523f08abdf2f214b43058e163087a4ecd8dfbe',1234, 'h');";
            this.db.run(sql, [], function (err) {
                if (err)
                    reject(err);
                else {
                    resolve('Tables created');
                }
            });
        });
    }

    register(hash, salt, email, role){
        return new Promise( async (resolve, reject) => {
            const sql = "INSERT INTO Users VALUES(?, ?, ?, ?)";
            this.db.run(sql, [hash, salt, email, role], function(err){
                if(err)
                    reject(err);
                else
                    resolve('User created correctly');
            });
        });
    }
}

module.exports = DatabaseConnection;