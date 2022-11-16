'use strict';

const sqlite = require('sqlite3');


class DatabaseConnection {
    static db = new sqlite.Database("./HikeTracker.db", (err) => { if (err) throw err; });
    static async createConnection() {
        //add any create table function that is created in the future to create a database from 0
        await this.createTableHikes();
        await this.createTableUsers();
        await this.createTableHikeLocations();
        await this.createTableGPXFileLocation(); 

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

    
    static createTableGPXFileLocation(){
        return new Promise(async (resolve, reject) => {
            const sql = "CREATE TABLE IF NOT EXISTS FileNames (HikeID TEXT PRIMARY KEY UNIQUE NOT NULL, FileName TEXT);";
            this.db.run(sql, [], function (err) {
                if (err)
                    reject(err);
                else {
                    resolve('Table Users created');
                }
            });
        });
    }

    static populateHikes= async ()=>{

        const locations =require ("./HikeLocations");
        const hikes =require("./Hikes");
        const fileLocation= require("./FileNames");
        
        await hikes.deleteHikes();
        await locations.emptyLocations();
        await fileLocation.emptyConnection();
    
        let HikeID='0';
        let file="rocciamelone.gpx";
        let province='Piemonte';
        let city ='Val di Susa';
        let title="Sentiero per il ROCCIAMELONE | 3538 m slm";
        // let title = "Sentiero per il ROCCIAMELONE";
        let length=9;
        let expTime=240;
        let Ascent=1353;
        // let Description=null;
        let Description="Un percorso conosciutissimo, molto amato da Valsusini e non solo. È lungo e impegnativo per via del dislivello, ma segnalato benissimo e soprattutto con un punto di appoggio a metà strada circa (Il Rifugio gestito Ca’ d’Asti)."
            +"Sebbene sia molto frequentato dai cani, consiglio di prestare la massima attenzione soprattutto nell’ultimo tratto di percorso che risulta molto stretto e sconnesso."
            +"La salita è costante e abbastanza ripida. Dal Rifugio Ca’ d’Asti inizia a farsi sempre più sconnessa per via delle pietre, bisogna quindi prestare molta attenzione a dove si mettono i piedi."
            +"A 3300 metri slm si trova la croce, dove è possibile godere di uno splendido panorama sulla vallata e fare una piccola pausa."
            +"Meglio non rilassarsi troppo però, perché a questo punto inizia la parte più faticosa."
            +"Il tratto che dalla croce arriva al bivacco in cima (e alla splendida Madonna) è abbastanza impervio, e soprattutto gli ultimi 200 metri circa bisogna prestare molta attenzione."
            +"Sono presenti delle corde in quest’ultimo tratto, che consentono di salire in sicurezza. Prestare però la massima attenzione se si va a fine Giugno, potrebbero trovarsi residui innevati che renderebbero pericolosa la salita."
            +"Una volta in cima potrai godere di un panorama unico e suggestivo, che nelle giornate limpide spazia dal Monviso al lago del Moncenisio, al Malciaussia e al Monte Rosa.";
        
        let Difficulty="PH";
        let start="Rifugio La Riposa – Mompantero (TO) | 2185 m";
        // let start="Rifugio La Riposa";

        let end="Rocciamelone | 3538 m";
        // let end="Rocciamelone";
        
        this.wrapperPopulate(HikeID,file,province,city,title,length,expTime,Ascent,Description,Difficulty,start,end);
        
         HikeID='1';
         file="Monte Ferra.gpx"
         province='Piemonte';
         city ='Valle Varaita';
         title="Sentiero per il MONTE FERRA | 3094 m slm";
         length=13;
         expTime=165;
         Ascent=1280;
         Description="Lasciata la macchina nell’ampio parcheggio superiamo il Rifugio Melezè e entriamo nel piccolo gruppo di case sopra la chiesetta di Sant’Anna lasciandoci alle spalle l’imponente edificio della casa per ferie Excelsior."     +"Imbocchiamo il sentiero ben visibile che con numerosi tornanti sale rapidamente nel versante erboso fino ad un pianoro dove sono presenti alcuni ruderi detti Grange Reisassa. Qui troviamo un bivio con le indicazioni per il Monte Ferra a destra e il colle di Fiutrusa a sinistra."
            +"Proseguiamo verso il Monte ferra che ora si presenta maestoso davanti a noi, ma ancora troppo lontano. Guadagniamo quota raggiungendo il lago Reisassa che a inizio stagione può presentarsi ancora ghiacciato."
            +" A questo punto non ci resta che salire sul ripidissimo sentiero che si snoda tra gli sfasciumi fino a raggiungere la cresta rocciosa, dove svoltiamo a sinistra (direzione Ovest) e la percorriamo fino alla piccola croce di ferro posta ad indicare la nostra meta."
            +"Sentiero del ritorno uguale a quello di salita."
         Difficulty="PH";
         start="Rifugio Melezè – Località Bellino (CN) | 1812 m slm circa";
         end="Monte Ferra | 3094 m slm circa";
        
         this.wrapperPopulate(HikeID,file,province,city,title,length,expTime,Ascent,Description,Difficulty,start,end);
      }
      
     static wrapperPopulate =async (HikeID,file,province,city,title,length,expTime,Ascent,Description,Difficulty,start,end)=>{
        let path="../gpx/"+file;
        const locations =require ("./HikeLocations");
        const hikes =require("./Hikes");
        const fileLocation= require("./FileNames");

        await hikes.addHike(HikeID,title,length,expTime,Ascent,Difficulty,start,end,Description);
        await locations.addLocation(HikeID,province,city);
        await fileLocation.addFile(HikeID,path);
    
      }


}





module.exports = DatabaseConnection;