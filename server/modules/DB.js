'use strict';

const sqlite = require('sqlite3');
const fs = require('fs');
const { fail } = require('assert');

class DatabaseConnection {
    static db = new sqlite.Database("./HikeTracker.db", (err) => { if (err) throw err; });

    static async createConnection() {
        //add any create table function that is created in the future to create a database from 0
        await this.createTableHikes();
        await this.createTableUsers();
        await this.createTableHikeLocations(); 

        //await this.deleteDB();

        //await this.populateTables();

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
            const sql = "CREATE TABLE IF NOT EXISTS Users (Id TEXT PRIMARY KEY UNIQUE NOT NULL, Hash TEXT NOT NULL, salt TEXT NOT NULL, role TEXT NOT NULL);";
            this.db.run(sql, [], function (err) {
                if (err)
                    reject(err);
                else {
                    resolve('Table Users created');
                }
            });
        });
    }
    
}

module.exports = DatabaseConnection;