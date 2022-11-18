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

    static populate= async ()=>{

        const locations =require ("./HikeLocations");
        const hikes =require("./Hikes");
        const fileLocation= require("./FileNames");
        const Users =require("./Users");

        await Users.emptyUsers()
        await Users.populateUsers();

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
        
         HikeID='2';
         file="2017-01-25_14059413_Sperenberger Gipsbrüche.gpx"
         province='Germany';
         city ='Berlin';
         title="Sperenberger Gipsbrüche";
         length=3.2;
         expTime=169;
         Ascent=50;
         Description="Intermediate Hiking Tour. Good fitness required. Easily-accessible paths. Suitable for all skill levels. The starting point of the Tour is accessible with public transport."
         Difficulty="H";
         start="Chausseestraße";
         end="Zossener Allee";
        
         this.wrapperPopulate(HikeID,file,province,city,title,length,expTime,Ascent,Description,Difficulty,start,end);

         HikeID='3';
         file="Chaberton.gpx"
         province='Piemonte';
         city ='Val di Susa';
         title="Sentiero per il MONTE CHABERTON | 3130 m slm";
         length=15;
         expTime=210;
         Ascent=1280;
         Description="mboccata la strada a destra, subito dopo la frontiera francese, si lascia l’auto in uno dei molti spazi sulla destra."
         +"L’itinerario a piedi ha inizio da una mulattiera sulla sinistra, dotata di sbarra, vicino a un cartello in legno che illustra la storia dello Chaberton."
        +"Questa vetta è una meta escursionistica interessante non solo dal punto di vista paesaggistico, in quanto offre un panorama che domina tutta l’alta Valle di Susa, ma anche storico. Infatti la cima ospita la fortificazione militare più alta d’Europa, ben visibile fin da valle con le sue otto torrette che ospitavano altrettanti cannoni. Le torrette vennero poi in gran parte distrutte dai francesi durante la seconda guerra mondiale, al termine della quale anche la vetta della montagna diventò territorio francese."
        +"Il percorso, molto battuto e facile da seguire, inizia in un ampio fondovalle prativo e sale molto gradualmente fino a quota 2150, quando si attraversa un’ampia zona franosa che ci fa cambiare versante."         
         +"Inizia quindi la salita più impegnativa verso il Colle Chaberton, a 2600m circa, posta sul lato nord est rispetto alla vetta. Qui ci ricongiungiamo con la mulattiera che risale da Fenils, altro percorso per giungere in vetta al momento non transitabile causa tratti franati. Dal Colle Chaberton si vede chiaramente la vetta e la strada la raggiunge attraverso numerosi e facili tornanti che tagliano il pendio ghiaioso."         
         +"In breve raggiungiamo la spianata sulla vetta con i resti del vecchio forte, accessibile e visitabile in buona parte, prestando attenzione agli accumuli di neve e ghiaccio pressoché perenni."         
         +"Il panorama dalla cima ripaga ampiamente della fatica impiegata per la salita. La discesa si svolge lungo lo stesso percorso della salita."
         Difficulty="H";
         start="Village du Soleil, Monginevro (TO) | 1850 m slm circa";
         end="Monte Chaberton | 3120 m slm circa";
        
         this.wrapperPopulate(HikeID,file,province,city,title,length,expTime,Ascent,Description,Difficulty,start,end);

      
         HikeID='4';
         file="Colle Braida - Colle Bione - Anello.gpx"
         province='Piemonte';
         city ='Val di Susa';
         title="Anello per il COLLE BIONE dal COLLE BRAIDA | 1430 m slm";
         length=13;
         expTime=240;
         Ascent=550;
         Description=null;
         Difficulty="H";
         start="Colle Braida – Valgioie (TO) | 1000 m slm circa";
         end="Colle Bione | 1430 m slm circa";
        
         this.wrapperPopulate(HikeID,file,province,city,title,length,expTime,Ascent,Description,Difficulty,start,end);

         HikeID='5';
         title="Sentiero per il RIFUGIO TOESCA da CORTAVETTO | 1710 m";
         province='Piemonte';
         city ='Val di Susa'; 
         Ascent=470;
         start="Colle Braida – Valgioie (TO) | 1000 m slm circa";
         end="Colle Bione | 1430 m slm circa";
         length=9;
         Difficulty="H";
         expTime=240; 
         file="Toesca.gpx"    
         Description="Il sentiero per il Rifugio Toesca dalla località di Cortavetto rappresenta un’escursione di difficoltà medio-facile adatta a tutti coloro che si avvicinano per le prime volte all’escursionismo in montagna."+
            "Si arriva al posteggio auto di Cortavetto salendo da San Giorio di Susa verso la località “Città”."+
            "Giunti a questo borgo abitato a circa 1000m di quota, si svolta decisamente a destra per prendere la prosecuzione per Cortavetto/Travers a Mont, una piccola borgata di baite."+
            "Poco prima dell’arrivo a destinazione la strada diventa sterrata ma è sempre facilmente percorribile con qualunque mezzo, prestando un poco di attenzione."+
            "Lasciata l’auto nel piccolo parcheggio di Cortavetto, oppure lungo la strada che vi conduce (attenzione alla segnaletica, su alcuni tratti la sosta è vietata), si notano sulla prosecuzione ideale della strada, che diventa sentiero scendendo leggermente sulla destra, i primi cartelli della sentieristica che indicano il Rifugio Toesca a circa 1h 30min di cammino."+
            "Le indicazioni sono per il segnavia 513 che si sovrappone nel tratto fino al Rifugio Amprimo, al sentiero dei Franchi (S.F.). Siamo nel Parco dell’Orsiera, che in una splendida cornice naturale ci dà il benvenuto con il grazioso Lago Paradiso delle Rane."+
            "Il sentiero costeggia il lago sulla destra e continua a scendere leggermente, per raggiungere un altro laghetto secondario. Da qui inizia la salita, subito decisa, in mezzo al bosco di faggi."+
            "Si incontra a breve un altro cartello indicatore che indica l’Amprimo a destra e il Rifugio Val Gravio a sinistra."+
            "Il sentiero sempre bello ampio spiana leggermente e diventa un mezzacosta, si passa una baita sulla destra e il bosco di faggi cede il posto a qualche isolato maggiociondolo, caratterizzati dalla splendida fioritura a inizio giugno, e infine a larici e abeti."+
            "Abbiamo ormai lasciato la vista sulla Val di Susa e ci stiamo addentrando in una valle secondaria sulla destra, da qui a breve passata una piccola radura erbosa e un facile guado su torrente, il bosco si apre lasciando lo spazio ad alcune baite finchè ci troviamo davanti al Rifugio Amprimo, a quota 1385m."+
            "Superato il Rifugio Amprimo la palina coi cartelli segnavia indicano di proseguire a sinistra per il Toesca, 1 h, lungo il segnavia 510, dove prati alternati a boschi di conifere ci portano in pochi minuti al pianoro alla quota di 1500m che ospita l’Alpe Balmetta, malga presso cui è normalmente possibile acquistare formaggio locale."+
            "Qui un altro segnavia ci indica che il sentiero prosegue a sinistra della malga."+
            "Proseguendo per prati si tralascia il bivio per il Colle Aciano sulla sinistra e si continua a salire con pendenza variabile tra prati e boschi di conifere."+
            "A quota circa 1650, dopo aver guadato facilmente un rio secondario, il sentiero compie alcuni tornanti e inizia a salire con più decisione nel fitto bosco, finchè dopo pochi minuti a quota 1710m compare davanti a noi la sagoma del rifugio Toesca."

         
         this.wrapperPopulate(HikeID,file,province,city,title,length,expTime,Ascent,Description,Difficulty,start,end);

         HikeID='6';
         title="Sentiero per il LAC DE SAVINE | 2450 m slm";
         province='Piemonte';
         city ='Val di Susa'; 
         Ascent=280;
         start="Lacs Perrin, Col du Petit Mont-Cenis (FR) / 2180 m circa";
         end="Lac de Savine / 2450 m circa";
         length=15;
         Difficulty="H";
         expTime=135; 
         file="LAC_SAVINES_par_LACS_PERRIN.gpx"    
         Description="Dal fondovalle della Val Susa, procedere su Autostrada del Frejus, oppure su S.S. 25 (..o anche dalla S.s. 24), fino a Susa, dove seguire indicazioni per il Colle del Moncenisio (F)."
            +"Attraversare l’abitato di Susa in direzione Francia e, salendo ora in deciso cambio di pendenza, arrivare, in circa 1,15 ore di salita e svariati tornanti della panoramica strada statale, all’imbocco delle “Scale del Moncenisio”, per passare davanti al Posto di Guardia della Gendarmerie Nationale e proseguire sulla Route Nationale D1006 per 6 Km circa fino ad un bivio a Sx, nella discesa al vero e proprio Colle, reperendo le indicazioni, su grande cartello segnaletico turistico, per il REFUGE du PETIT MT CENIS e Colle omonimo."
            +"Discendere la stretta ma buona strada bitumata volgendo ancora a Dx in contropendenza e proseguire, bordeggiando il Lago ma tralasciando tutti gli incroci, fino al margine del Colle del Piccolo Moncenisio, ove posteggiare con le indicazioni sopra descritte e iniziare il movimento a piedi sulla pista sterrata per quasi 1Km, deviando a Sx in forte salita per penetrare nel piccolo altopiano Perrin, addentrandosi lungo i selvaggi minuscoli laghetti che lo costellano (alcuni sono celati e per vederli occorre risalire a dx i panoramici punti più elevati), costeggiando poi il maggiore degli specchi d’acqua Perrins che esprime suo splendore in autunno/inverno quando ghiacciato riflette le vette circostanti."
            +"Lasciato il laghetto e abbandona la pista sterrata (che volge a sx per tornare ad anello verso il Rifugio) si prosegue su stretto sentiero verso sud, con indicazioni su paline per Lac de Savine, in un contesto ancor piu’ selvaggio e inebriante, fra bassi rododendri e roccioni montonati (la zona, come vasti settori della Valsusa, nel Pleistocene era coperta da immani ghiacciai che scorrevano premendo e levigando le rocce sottostanti, conferendo loro, a quelle più dure, quell’aspetto stondato, levigato e lievemente striato che ora osserviamo, quasi come fossero opera di ancestrali uomini o potenze sovrumane) per confluire all’inizio in un canalone, affacciato su tutto il Vallone, ben tracciato fra le rocce con passaggi attrezzati di recentissime funi metalliche che, collocate intelligentemente, agevolano non poco la discesa nel vallone (o l’ascesa in eventuale senso inverso)."
            +"Discesi nel pianoro, vasto ed erboso, si passa, guadando qualche ruscello di fusione, presso le Grange Savine che recano ancora baite oramai abbandonate ma ancora gradevolmente apprezzabili (fuori stagione transumantica, diventano tane per numerosi animaletti di alta montagna)."
            +"Da questo punto, tranne piccoli attraversamenti tra basse roccette, il percorso diviene una lunga passegiata nel fondo del vallone, in lieve pendenza, con a ovest le cime del Rochers Clery  3140m e le Aiguille de Savine 3172m (in Italia i Denti d’Ambin) e ad est la monolitica, altissima e verticale base rocciosa del massicio del Giusalet 3313m(F), preceduta dalla Costa delle Marmotte, fino ad iniziare una intricata, lieve salita fra tortuosi ma semplici zig-zag che adducono infine al ripiano ove sorge il lungo e luminoso lago, fiancheggiato in tutto il bordo est dal sentiero, che in altri 30 minuti conduce al colle di confine con l’Italia."
            +"Talvolta, in base al clima avutosi nelle stagioni avverse, lunghi tratti dell’itinerario proposto si presentano cospicuamente innevati fino al mese di luglio, in specie vicino e intorno al grande lago, ricoprendone il sentiero e suggerendo di camminare qualche metro più a monte del bordo lago, ad evitare cedimenti e sprofondamenti nell’acqua ghiacciata."
            +"In questa vastità, rilassandosi in sosta su punti dominati, è facile perdersi nel pensiero di come, ventidue secoli or sono, questo terreno, nel mese di ottobre (al tramonto delle Pleiadi), innevato di fresco su residui ghiacciati dell’inverno precedente, fosse calpestato dalla moltitudine portata al seguito del condottiero Cartaginese, con tanto di 39 elefanti da battaglia e migliaia e migliaia di maestranze che operarono loro arti e mestieri su neve, ghiacccio, terra e roccia, piegandoli, per facilitarne l’aggressivo transito nel calare in Italico suolo contro le schiere di Roma, attraverso il Colle Savine-Coche, ora da secoli in disuso, ma allora utilizzato dai Romani per le staffette da/verso le Gallie."
            +"A riprova, subito dopo il margine estremo sud del Lago, aggirando la palude esistente, si puo’ seguire una traccia di sentiero che, adiacente al crinale sud dell’Aiguille de Savine, ove conforma il citato Colle Savine-Coche, scende verso il sottostante ripiano diventando, a tratti, evidente mulattiera selciata costruita in loco dai genieri  dell’antica Roma."
            +"Dal fondo di questo altopiano incassato, è possibile, in circa 2 ore raggiungere, rispettivamente, il Rifugio Vaccarone (IT)2747m, Il Ghiacciaio dell’Agnello, il Giusalet, la Punta Tricuspide ed il Rifugio Avanzà(IT)2578m."
            +"Percorso di ritorno, in 1,45-2 ore, uguale a quello di andata ."
                    
         this.wrapperPopulate(HikeID,file,province,city,title,length,expTime,Ascent,Description,Difficulty,start,end);

         HikeID='7';
         title="Ciaspolata al PLAN DES FONTAINETTES (LAGO DEL MONCENISIO)";
         province='Piemonte';
         city ='Val Cenischia'; 
         Ascent=370;
         start="Scale del Moncenisio (FR) / 1730 m circa";
         end="Plan des Fontainettes – Lago del Moncenisio / 2100 m circa";
         length=17;
         Difficulty="H";
         expTime=150; 
         file="Ciaspolata_al_LAGO_del_MONCENISIO.gpx"    
         Description="Calzare le ciaspole, e risalire lungo la strada per passare davanti al Posto di Guardia della Gendarmerie Nationale, aggirandola, per dirigersi verso il pittoresco ma triste villaggio abbandonato della Gran Croix (sede di stazione, fino al 1871, della mitica Ferrovia Fell a “trazione maggiorata”, in quanto composta da tre binari e che collegava Susa con S.Michel de Maurienne)."
            +"Deviare quindi verso monte (ovest), evitando le immediate adiacenze dietro il villaggio, in quanto la coltre nevosa cela un insidioso laghetto e, a 2,5 Km di percorso svolto, dopo un bel ponticello in legno iniziare a salire nel pendio, sovente ghiacciato, per compiere due lunghe diagonali costeggiando la Casa di Guardia della diga (ove è impiantato un “campetto climatico” italiano, con tanto di asta graduata per il rilevamento dello spessore nevoso ed una webcam perennemente on-line) e quindi scendere al margine ovest della grande diga, percorrendola tutta."
            +"Giunti al termine opposto della diga, deviare a sx per risalire la china in tre diagonali e pervenire alla Route Nationale D1006 il cui livello invernale, in base alle precipitazioni, potrebbe essere sopraelevato anche di 2-3 m, obbligando al transito nel centro e non nei bordi."
            +"Infine, percorrere in falsopiano la suddetta per altri  1,5 Km circa fino al Plan des Fontainettes, dove esplorare gli interessanti manufatti presenti, far foto e ristorarsi in posizione eccezionalmente pittoresca."
            +"Percorso di ritorno, uguale a quello di andata, con variante per poter accorciare discendendo dalla Route Nationale, direttamente verso il villaggio Gran Coix ed evitando il passaggio sulla diga."
 
        this.wrapperPopulate(HikeID,file,province,city,title,length,expTime,Ascent,Description,Difficulty,start,end);

        
        HikeID='8';
        title="Sentiero per il CANALE DI MARIA BONA | 1350 m slm";
        province='Piemonte';
        city ='Val di Susa'; 
        Ascent=200;
        start="Pian d’le Ruine, Giaglione (TO) / 1060 m circa";
        end="Canale di Maria Bona / 1350 m circa";
        length=4.5;
        Difficulty="H";
        expTime=105; 
        file="CANALE+di+MARIA+BONA++e+fondo+Val+Clarea.gpx"    
        Description="Sempre al lato Dx della strada provinciale, reperire l’evidente inizio sentiero, il Sentiero Balcone (S.B)n.820B che, transitando tra baite e case in rovina si snoda sinuoso alternativamente fra ombrose boscaglie di acacie e le verticali pareti granitiche della Gran Rotsa (rinomata e agevole palestra di roccia), fiancheggiando sempre il gorgogliante Canale di Maria Bona."
            +"Il Canale, che prende l’acqua dalle prese poste nel cuore della Val Clarea a 1100, presso le Grange Buttigliera, deve il suo nome al quello di una nobildonna Giaglionese, già moglie del Signore Feudatario locale, tale Andrea Aschier de Jalliono quale contributrice dei fondi che hanno potuto dare inizio ai lavori, è stato interamente scavato nella roccia viva, dalla popolazione giaglionese, terminandolo nella metà del xv° secolo da progetti iniziati fine dal 1200."
            +"Da tale opera di artigianale “ingegneria idraulica”, la popolazione, ebbe grande fioritura, sulla montagna, attività e sviluppo, potendo provvedervi all’irrigazione e coltura delle campagne fino ad allora impossibile se non incanalando i ruscelli di scioglimento stagionale, limitati a inizio primavera."
            +"Proseguendo lungo il rilassante percorso, sempre reso pulito e sicuro, non mancando gli scorci panoramici in alto, sul prospiciente Vallone di Tiraculo o la Cima Arià e in basso, talvolta su strapiombi di oltre 200 metri, attraverso ombrosi boschi o esposti al sole si arriva alle “prese” ove il Canale attinge le acque, nella località di Grange Buttigiera al termine del Sentiero 820b."
            +"Posta nel fondo piano del vallone, la frazione risulta bella e interessante da esplorare, specie in estate quando il Campo Suola e le bergerie sono aperte."
            +"Riprendendo la carrareccia in salita si attravesano diverse pittoresche frazioncine, alcune con deliziose baite ristrutturate con gusto, altre in posizioni pazzescamente “ardite”, come a ridosso di roccioni al centro del letto fluviale!"
            +"Attraversati i villaggi di Moraretto, S.Giacomo e di Pietraporchera, presso cui ammirare i resti delle abitazioni, spesso inglobate nelle essenze arboree d’intorno e le strutture murarie operate dall’uomo nei secoli scorsi, ci si inoltra nel bosco vero e proprio dove, terminata la carrareccia, trae inizio il sentiero 805 S.B. che porta al Colle Clapier inerpicandosi nelle suggestive serpentine."
            +"Il luogo di gita, incassato nello stretto vallone, e’ dimora di molte specie animali e non e’ raro assistere, in base alla stagione,alle evoluzioni di corvidi e grandi rapaci, inoltre, il greto del torrente Clarea e’ riferimento di abbeveraggio di numerosi ungulati di montagna."
            +"Percorso di ritorno, in 1 ora circa, uguale a quello di andata."
       this.wrapperPopulate(HikeID,file,province,city,title,length,expTime,Ascent,Description,Difficulty,start,end);
    
       HikeID='9';
       title="Sentiero per il RIFUGIO I RE MAGI | 1770 m slm";
       province='Piemonte';
       city ='CIASPOLATE'; 
       Ascent=345;
       start="Pian del Colle – Bardonecchia (TO) / 1430 m circa";
       end="Rifugio I Re Magi – Grange di Valle Stretta (FR) / 1770 m circa"
       length=11;
       Difficulty="T";
       expTime=135; 
       file="rifugio re magi.gpx"    
       Description="Lascia l’auto in uno dei comodi e ampi parcheggi subito dopo il camping Pian del Colle."
            +"A quel punto torna indietro per un tratto e imbocca il sentiero che trovi appena prima il camping. Troverai dei cartelli indicanti Grange Valle Stretta (anche detta Vallèe Etroite)."    
            +"Passerai tra gli alberi fino a costeggiare un piccolo lago artificiale, e nelle vicinanze troverai una biforcazione."    
            +"Prosegui dritto e rimani sull’evidente traccia sulla neve. In breve raggiungerai un ponte molto suggestivo, che ti regalerà una splendida vista sull’intera vallata." 
            +"A questo punto attraversa il ponte ricongiungedoti dall’altro lato (puoi anche decidere di percorrere il sentiero parallelo andando dritto, ma te lo sconsiglio in inverno perché potrebbe essere inagibile causa slavine)." 
            +"Continua sul sentiero, fino a sbucare sullo stradone sterrato (ricoperto di neve in inverno). A questo punto, non ti resta che proseguire sullo stradone (tagliando i curvoni di tanto in tanto, se preferisci)."    
            +"Troverai tanti cartelli e segnavia bianco-rossi lungo il percorso."    
            +"In un paio d’ore raggiungerai Grange di Valle Stretta, costeggiando il rio, fino a raggiungere la fine del Sentiero per il Rifugio I Re Magi."    
            +"Purtroppo noi abbiamo trovato il rifugio chiuso, non so se perché era un giorno infrasettimanale oppure a causa dell’emergenza sanitaria."
      this.wrapperPopulate(HikeID,file,province,city,title,length,expTime,Ascent,Description,Difficulty,start,end);
       
      HikeID='10';
      title="Sentiero per CIMA BOSSOLA da INVERSO | 1510 m slm";
      province='Piemonte';
      city ='CIASPOLATE'; 
      Ascent=435;
      start="Inverso – Vico Canavese (TO) / 1074 m circa";
      end="Cima Bossola / 1510 m circa"
      length=6;
      Difficulty="H";
      expTime=75; 
      file="cima bossola.gpx"    
      Description="LLascia l’auto nell’ampio spiazzo al casotto Cima Bossola, che puoi raggiungere proseguendo per qualche km sulla piccola strada che sale da Inverso."

      +"Troverai i cartelli indicanti il Colletto Bossola, che si raggiunge poco dopo la Cima."
      
      +"Il percorso inizia su uno stradone ben evidente e taglia su una dorsale di media pendenza."
      
      +"In inverno questo tratto è un po’ faticoso, bisogna valutare bene le condizioni neve e soprattutto avere l’attrezzatura adatta (ciaspole, bastoncini, ramponcini)."
      
      +"È anche possibile proseguire sullo stradone, allungando leggermente il sentiero ma rendendo la salita più semplice."
      
      +"Una volta scollinato, si può decidere anche in questo caso se proseguire sullo stradone oppure se tagliare nuovamente la dorsale."
      
      +"Proseguendo sullo stradone è possibile raggiungere le splendide e scenografiche Case Bossola, un luogo perfetto anche per una piccola pausa."
      
      +"Da Case Bossola si può ammirare un panorama davvero spettacolare sul Monviso, sul Monte Calvo, sul Lago di Viverone e sulla Serra morenica di Ivrea."
      
      +"A questo punto manca l’ultimo spunto in salita, per poi raggiungere la suggestiva croce incorniciata dalle montagne circostanti, che segna la fine del sentiero per Cima Bossola."
      
      +"Puoi decidere se proseguire un pezzo fino al Colletto Bossola."
      
      this.wrapperPopulate(HikeID,file,province,city,title,length,expTime,Ascent,Description,Difficulty,start,end);
        

      HikeID='11';
      title="Sentiero per il RIFUGIO MEIRA GARNERI da SAMPEYRE";
      province='Piemonte';
      city ='CIASPOLATE'; 
      Ascent=850;
      start="Sampeyre (CN) / 1000 m circa";
      end="Rifugio Meira Garneri / 1850 m circa"
      length=8.5;
      Difficulty="H";
      expTime=120; 
      file="Rifugio Meira Garneri da Sampeyre.gpx"    
      Description="Lascia l’auto nel parcheggio della seggiovia di Sampeyre."

        +"Lasciato il parcheggio saliamo subito a destra degli impianti di risalita, dove alcuni cartelli rossi ci segnalano il sentiero attraverso il bosco."

        +"Prendendo rapidamente quota, alla fine del primo tratto di boscoso, raggiungiamo la frazione Sodani dove possiamo osservare la bella chiesa affrescata."

        +"Usciti dalla borgata proseguiamo nuovamente lungo il sentiero circondati da larici, faggi, betulle e dopo alcune deviazione, sempre ben segnalate, usciamo in una splendida radura."

        +"Saliamo gli ultimi 200m a lato della pista o volendo possiamo proseguire più a destra incrociando la strada carrozzabile che nel periodo estivo porta al rifugio."

        +"Il ritorno è sullo stesso sentiero dell’andata."

        +"In alternativa al sentiero nel bosco sopra descritto è possibile raggiungere il Rifugio Meira Garneri salendo direttamente la ripida pista da sci."

        +"Essendo molto larga e sempre costeggiata da vegetazione non si da fastidio agli sciatori, ed è facile trovare una traccia precedentemente battuta da seguire."

      this.wrapperPopulate(HikeID,file,province,city,title,length,expTime,Ascent,Description,Difficulty,start,end);
        
      HikeID='12';
      title="Sentiero per il RIFUGIO FONTANA MURA | 1726 m slm";
      province='Piemonte';
      city ='CIASPOLATE'; 
      Ascent=766;
      start="Pian Neiretto (TO) / 1027 m circa";
      end="Rifugio Fontana Mura / 1726 m circa"
      length=13;
      Difficulty="H";
      expTime=150; 
      file="Rifugio Fontana Mura Ciaspole.gpx"    
      Description="Una volta parcheggiata la macchina, si imbocca subito la strada agro silvo pastorale dove sono presenti diverse indicazioni per il rifugio."+
        "L’itinerario infatti si sviluppa prevalentemente su questa strada che in inverno è ricoperta di neve."+
        "Subito dopo la partenza è presente la Fontana del Biutun, una bella fontana dove è possibile fare scorta di acqua. Il sentiero procede con alcuni saliscendi ma senza pendenze troppo marcate."+
        "Il dislivello infatti si accumula poco alla volta rendendo molto piacevole la camminata in mezzo al bosco."+
        "Il percorso costeggia il letto del torrente Sangone e lungo il tragitto sono presenti diversi rigagnoli che “interrompono” il manto nevoso."+
        "Dopo circa 2Km dalla partenza proprio il torrente Sangone ci regala una fantastica cascata: infatti con una piccola deviazione si raggiunge la Loja Scura dove nelle immediate vicinanze sono presenti dei tavoli da picnic."+
        "Proseguendo lungo la strada sempre ben battuta si arriva ad un bivio: andando dritti si segue l’itinerario per il Rifugio Fontana Mura, mentre svoltando a sinistra ci si dirige verso la Palazzina Sertorio."+
        "La deviazione per quest’ultima è vivamente consigliata in quanto è corta e racconta, tramite diversi cartelli informativi, un pezzo importate della nostra storia partigiana."+
        "Lungo il percorso è anche presente una statua raffigurante Liborio Ilardi, sentinella Partigiana."+
        "Ripresa la strada “principale” ci ritroviamo davanti un ampio vallone con incastonato nella neve il Rifugio."+
        "A questo punto sono possibili due vie per raggiungerlo: si può continuare a seguire la strada sterrata oppure il sentiero estivo che prosegue proprio al centro della vallata."+
        "Con le ciaspole è consigliabile proseguire per la strada che, seppur più lunga come tragitto, garantisce una minore pendenza e regala degli splendidi paesaggi."+
        "Lungo la sterrata si arriva agli Alpeggi Sellery inferiori e poco dopo a un piccolo colle dove è presente un’altra interessante deviazione: seguendo una corta cresta infatti, si raggiungono i resti del Forte di San Moritio."+
        "Ritornando sui propri passi si riprende la strada e in poco tempo si raggiunge la fine del Sentiero per il Rifugio Fontana Mura."+
        "Ci troviamo proprio sotto il Colle della Roussa e da qui si può godere di uno splendido panorama sulla sottostante Val Sangone."+
        "Il ritorno si svolge sul medesimo tracciato di andata, evitando le varie deviazioni se già effettuate in precedenza."

      this.wrapperPopulate(HikeID,file,province,city,title,length,expTime,Ascent,Description,Difficulty,start,end);
        
      HikeID='13';
      title="Sentiero per il RIFUGIO SELLERIES – 2023 m";
      province='Piemonte';
      city ='CIASPOLATE'; 
      Ascent=476;
      start="Pracatinat – Fenestrelle (TO) / 1700 m circa";
      end="Rifugio Selleries / 2023 m circa"
      length=14.5;
      Difficulty="H";
      expTime=150; 
      file="Rif. Selleries.gpx"    
      Description="Si prosegue quindi a piedi sulla strada principale, che dopo due tornanti e circa 2Km presenta un bivio, a cui si svolta a destra seguendo le indicazioni per il Rifugio Selleries."+

      "La strada, sempre molto ampia e battuta dal gatto delle nevi dei gestori del rifugio in inverno, sale con pendenza costante non troppo impegnativa in mezzo al bosco, quando a quota circa 1780m e 2.5Km dalla partenza la salita spiana e il paesaggio si apre con grandi prati, siamo giunti nella località Pra Catinat e davanti a noi si stagliano le cime del gruppo dell’Orsiera che ospitano l’omonimo Parco Naturale."+
      
      "Si prosegue sempre dritto sulla strada principale attraversando i prati e ignorando una deviazione sulla destra che conduce a una malga. Da qui l’itinerario riprende in salita decisa e costante con piena esposizione a Sud e un lungo mezzacosta nel bosco di larici fino a quota di circa 2100m."+
      
      "La strada curva a sinistra per attraversare una grande conca naturale, scendiamo leggermente di quota e il bosco cede il passo ai prati e pascoli."+
      
      "Attraversata la conca e superato il vicino crinale con una pendenza ormai prossima al piano, si giunge alla valle in cui sorge il Rifugio Selleries a quota di circa 2000m."+
      
      "Il rifugio è punto di arrivo in inverno, ma d’estate può essere punto di partenza, in quanto è possibile arrivarci in auto, e proseguire per altri itinerari nel Parco dell’Orsiera."+
      
      "D’altra parte la salita a piedi d’estate da Pra Catinat può perdere parte del suo fascino proprio per il traffico veicolare, a tratti eccessivo specie nel weekend. Il ritorno è previsto sullo stesso percorso dell’andata."
      
      this.wrapperPopulate(HikeID,file,province,city,title,length,expTime,Ascent,Description,Difficulty,start,end);
        
      HikeID='14';
      title="Sentiero per il LAGO DI MALCIAUSSIA | 1800 m slm";
      province='Piemonte';
      city ='CIASPOLATE'; 
      Ascent=500;
      start="Margone – Usseglio (TO) / 1400 m circa";
      end="Lago di Malciaussia / 1810 m circa"
      length=9;
      Difficulty="H";
      expTime=150; 
      file="Lago Malciaussias.gpx"    
      Description="Calza subito le ciaspole (o i ramponcini, in base allo stato della neve) e prosegui lungo la strada innevata che in estate è percorribile in auto fino al lago."+

      "Il sentiero inizia con una leggera pendenza con salita costante, ma è decisamente semplice da seguire."+
      
      "Basta continuare seguendo la traccia dei numerosi escursionisti che ogni anno si avventurano in questo percorso."+
      
      "All’altezza dei curvoni, spesso avrai la possibilità di tagliare, proseguendo lungo le tracce che avanzano sicure sui pendii."+
      
      "Dopo circa un km avrai già modo di ammirare lo splendido panorama che si apre sulle montagne circostanti."+
      
      "Prosegui sulla strada e goditi il panorama, finché non ti imbatti in due grotte che oggi vengono utilizzate come deposito."+
      
      "All’interno delle grotte è possibile fare delle belle foto, ma la vera attrazione si trova nella seconda grotta che, infatti, contiene una vecchia autovettura abbandonata da chissà quanti anni."+
      
      "ATTENZIONE: per visitare le grotte bisogna avere una torcia con sé."+
      
      "A questo punto la diga è ormai ben visibile davanti a te e segnerà la fine del sentiero per il lago di Malciaussia."+
      
      "Qui avrai la possibilità di ammirare il Monte Lera, il Rocciamelone, e il Colle dell’Autaret, raggiungibile tramite un sentiero che parte dall’altro lato del lago."+
      
      "Fai molta attenzione nell’ultimo km di strada verso il lago, perché in alcuni tratti, nel periodo invernale, si verificano delle slavine che rendono il passaggio più difficile e in alcune occasioni anche un po’ pericoloso, se non si ha l’attrezzatura adeguata e un po’ di conoscenza della neve."+
      
      "Sebbene sia una passeggiata percorribile anche in estate, la sconsiglio quando la strada è aperta alle auto perché potrebbe rivelarsi un po’ pericolosa."+
      
      "È possibile durante la bella stagione percorrere un sentiero alternativo che costeggia la strada all’interno del vallone, non battuto da nessuno in inverno."+
      
      "Se, una volta arrivato, decidi che non sei stanco e vuoi allungare di 40 minuti circa il tuo percorso, prosegui costeggiando il lago sul sentiero a destra, verso il rifugio Vulpot fino alla suggestiva località Pera Morta."+
      
      "Qui troverai diverse sculture in legno appese lungo le pareti rocciose 🙂"+
      
      "Il lago è anche un ottimo punto di partenza per altri sentieri più impegnativi."
      

      this.wrapperPopulate(HikeID,file,province,city,title,length,expTime,Ascent,Description,Difficulty,start,end);


      HikeID='15';
      title="Sentiero per il RIFUGIO WILLY JERVIS | 1732 m slm";
      province='Piemonte';
      city ='CIASPOLATE'; 
      Ascent=507;
      start="Villanova – Bobbio Pellice (TO) / 1225 m circa";
      end="Rifugio Willy Jervis / 1732 m circa"
      length=8;
      Difficulty="H";
      expTime=100; 
      file="willy jervis.gpx"    
      Description="Bella escursione in ambiente, quello dell’alta val Pellice, molto eterogeneo e a tratti spettacolare. Il sentiero parte dalla borgata Villanova, edificata accanto a una bella cascata."

      +"Il percorso è sempre ben segnalato (a meno che non prendiate il più avventuroso percorso alternativo, dall’altra parte del torrente)."
      
      +"La prima parte del sentiero è su mulattiera  e guadagna quota abbastanza rapidamente fino a intersecare la pista carrozzabile, dopo ca. 30 minuti di cammino."
      
      +"Da qui la pendenza si addolcisce, fino ad arrivare alla spettacolare cascata del Pis."
      
      +"Non potrete fare a meno di fermarvi ad ammirarla e, se siete in estate, avvicinarvi per godere della frescura."
      
      +"Da qui in avanti potete tranquillamente seguire la carrozzabile fino alla Conca del Pra’; volendo, sono presenti diversi sentieri che tagliano vari tornanti, ma li sconsiglio con presenza di neve perché un po’ rischiosi."
      
      +"La conca del Pra, idilliaca in estate e incantevole in inverno, è ulteriore partenza per stupende escursioni: salendo verso sud, al fondo della conca ci troveremo al cospetto del Monviso."
      
      +"Verso Ovest le creste che rappresentano il confine francese con il colle della Croce; verso est, il sentiero per il rifugio Barant, (a ca. 1.45h) e Rifugio Barbara Lowrie (a ca. 3 h)"

      this.wrapperPopulate(HikeID,file,province,city,title,length,expTime,Ascent,Description,Difficulty,start,end);


      HikeID='16';
      title="Sentiero per il RIFUGIO CAPANNA MAUTINO | 2100 m slm";
      province='Piemonte';
      city ='CIASPOLATE'; 
      Ascent=700;
      start="Bousson – Cesana (TO) / 1400 m circa";
      end="Rifugio Capanna Mautino / 2100 m circa"
      length=13;
      Difficulty="H";
      expTime=160; 
      file="capanna Mautino.gpx"    
      Description="Abbiamo trovato un sentiero davvero ben curato. Inizia percorrendo dal parcheggio la strada asfaltata in salita. Troverai diversi cartelli che ti indicheranno la via da seguire."+

      "Spesso potrai scegliere tra due (o tre) varianti, noi solitamente in questi casi, se non conosciamo il sentiero, cerchiamo di procedere sulla via più battuta."+
      
      "La salita è costante ma non eccessivamente faticosa, salvo in alcui punti."+
      
      "Abbiamo trovato poca neve e ben ghiacciata, quindi sono stati indispensabili i ramponcini quel giorno (no ciaspole)."+
      
      "Il percorso viene battuto egregiamente dalla motoslitta, quindi non farai assolutamente difficoltà a individuarlo."+
      
      "Nonostante i 700 m di dislivello +, il sentiero era talmente battuto che ci ha reso il percorso abbastanza semplice."+
      
      "L’ultimo tratto fino al Lago Nero è un po’ pendente, ma lo raggiungerai in poco tempo. Dal punto di partenza al lago impiegherai 2 ore circa."+
      
      "A quel punto, in un’altra ventina di minuti sarai arrivato al Rifugio Capanna Mautino, ai piedi del Col Saurel, e potrai gustarti la tua polenta fumante."+
      
      "Nel periodo estivo, ti consiglio di percorrere il sentiero parallelo che taglia sui pendii per evitare la strada carrozzabile 🙂"
      
      this.wrapperPopulate(HikeID,file,province,city,title,length,expTime,Ascent,Description,Difficulty,start,end);


      HikeID='17';
      title="Sentiero per il POGGIO TRE CROCI | 2115 m slm";
      province='Piemonte';
      city ='CIASPOLATE'; 
      Ascent=803;
      start="Bardonecchia (TO) / 1326 mslm circa";
      end="Poggio Tre Croci / 2115 mslm circa"
      length=10.4;
      Difficulty="H";
      expTime=165; 
      file="Poggio Tre Croci Ciaspole.gpx"    
      Description="L’escursione ha inizio proprio dal piazzale della Fiera di Bardonecchia."+

        "Attraversando la strada basterà infatti oltrepassare il ponte sul Rio della Rho per trovarsi davanti dei cartelli indicatori che ci indicheranno la via da seguire."+
        
        "Il sentiero di questa escursione è una strada sterrata che in inverno si ricopre di neve."+
        
        "Il percorso si sviluppa all’interno di un fitto bosco che nei giorni successivi ad una nevicata regala una cornice davvero fiabesca."+
        
        "Durante il tratto iniziale del sentiero la pendenza è molto blanda e ci permette di godere a pieno ciò che ci circonda."+
        
        "Proseguendo lungo la tratta si arriva ad un primo punto panoramico su Bardonecchia: oltre alla cittadina è notevole il colpo d’occhio sullo Jafferau."+
        
        "Da questo punto in avanti però la strada diventa meno larga ed evidente."+
        
        "Dopo circa 3,5 Km vi è un piccolo strappo e la pendenza aumenta notevolmente facendoci guadagnare velocemente la maggior parte del dislivello di questa gita: i tornanti a questo punto iniziano a farsi sempre più stretti e sempre più ripidi e si susseguono con maggiore frequenza."+
        
        "Dopo un susseguirsi di diversi tornanti ravvicinati si esce dal bosco e ci si ritrova davanti agli occhi un panorama molto ampio sul Melezet e sulla Valle Stretta."+
        
        "Spostandosi di qualche metro dalla strada si giunge alla nostra meta, dove ad accoglierci sono presenti le Tre Croci che danno il nome a questo posto."+
        
        "Il sentiero per il ritorno si svolge sul medesimo di andata anche se sono presenti diversi tratti dove poter “tagliare” alcuni tornanti."
      
      this.wrapperPopulate(HikeID,file,province,city,title,length,expTime,Ascent,Description,Difficulty,start,end);

      
      HikeID='18';
      title="Sentiero per CIMA DEL BOSCO | 2376 m slm";
      province='Piemonte';
      city ='CIASPOLATE'; 
      Ascent=826;
      start="Sauze di Cesana (TO) / 1550 mslm circa";
      end="Cima del Bosco / 2376 mslm circa"
      length=17;
      Difficulty="H";
      expTime=210; 
      file="Cima del Bosco.gpx"    
      Description="Cima del Bosco è una facile punta a poco meno di 2400m che nonostante l’altitudine modesta consente di godere di un panorama a 360° sull’alta Valle di Susa."+

      "Può essere raggiunta in diversi modi, in questa descrizione vedremo l’accesso più facile, da strada forestale a partire dalla località di Sauze di Cesana."+
      
      "Dal ponte del Torrente Ripa, ci si incammina verso il ponte e si attraversa il torrente, oltrepassato il quale si prosegue a destra seguendo l’indicazione su palina in legno per Cima del Bosco."+
      
      "La strada inizia a salire in un bel bosco misto di pini e larici, con pendenza costante, che manterrà pressochè fino in cima."+
      
      "Dopo circa 1Km si tralascia la deviazione in discesa sulla destra e si prosegue a sinistra."+
      
      "Si prosegue sulla strada principale, che prosegue sempre ben larga e visibile con alcuni ampi tornanti."+
      
      "A quota 1900 al termine di un tornante si incontra il sentiero che sale dalla Valle Argentera, indicato da palina in legno, che potrebbe costituire una variante della salita, è da considerare però che il tracciato è più difficile della strada forestale e consigliato solo ad esperti, specialmente nella stagione invernale."+
      
      "Proseguendo lungo la strada principale il panorama via via si apre salendo di quota, finchè a circa 2300m la vegetazione scompare e lascia il posto a pendii erbosi."+
      
      "Essendo ben visibile e prevedibile il tracciato della forestale che porta sulla cima sopra di noi, è possibile effettuare anche dei tagli in prossimità dei tornanti."+
      
      "Arrivati a quota 2376m il panorama si apre, è molto ampio e spazia dalle cime francesi di confine alle località di Sestriere e Cesana."+
      
      "È possibile trovare rifugio nella piccola e graziosa cappella di Cima del Bosco, che costituisce un bivacco a tutti gli effetti ed è normalmente aperto e provvisto di tavolo per un eventuale pranzo."+
      
     "La discesa si effettua sullo stesso facile tracciato di salita."

    
      this.wrapperPopulate(HikeID,file,province,city,title,length,expTime,Ascent,Description,Difficulty,start,end);


      HikeID='19';
      title="Sentiero per BRICCAS da BRICH | 2430 m slm";
      province='Piemonte';
      city ='CIASPOLATE'; 
      Ascent=950;
      start="Brich (CN) / 1460 mslm circa";
      end="Briccas / 2430 mslm circa"
      length=8;
      Difficulty="H";
      expTime=120; 
      file="Monte Briccas da Brich.gpx"    
      Description="Lasciata l’auto, proseguiamo lungo la strada dapprima asfaltata e successivamente sterrata."+

      "In caso di poco innevamento o temperature elevate è possibile fare i primi 150m di dislivello senza ciaspole."+
      
      "Appena incontrata la prima neve infiliamo le ciaspole e ci incamminiamo su di un sentiero ben definito che attraversa un boschetto."+
      
      "Dopo esserci lasciati alle spalle le ultime baite giriamo a destra verso Nord/Est in prossimità di un segnavia GTA verniciato su di un masso."+
      
      "Da qui, superata l’ultima boscaglia, si apre davanti a noi un enorme pendio molto ampio che culmina proprio con la nostra vetta."+
      
      "La linea da seguire è molto libera ma possiamo prendere come riferimento alcuni massi che troviamo circa a metà del percorso o seguire altre tracce lasciate in precedenza, essendo questo un sentiero molto frequentato."+
      
      "Arrivati in cima al pendio percorriamo i pochi metri che ci separano dalla croce di vetta su di una cresta molto panoramica."
    
      this.wrapperPopulate(HikeID,file,province,city,title,length,expTime,Ascent,Description,Difficulty,start,end);


      
      HikeID='20';
      title="Sentiero per l’ALPE ATTIA | 1740 m slm";
      province='Piemonte';
      city ='Valli di Lanzo'; 
      Ascent=607;
      start="Pian del Tetto – Ala di Stura (TO) | 1133 m slm circa";
      end="Alpe Attia | 1740 m slm circa"
      length=6.6;
      Difficulty="H";
      expTime=120; 
      file="alpe dattia da ala.gpx"    
      Description="Itinerario piacevole che attraversa un bosco per poi aprirsi sull’Alpe Attia, dalla quale si ha uno splendido panorama sulla Val d’Ala e sulle cime circostanti, tra cui l’Uja di Mondrone."+

      "Parcheggiata l’auto ad Ala di Stura, sali per la ripida strada asfaltata oltre la chiesa, al tornante si vedranno i primi cartelli che indicano il sentiero 238, passa il ponte e prosegui per la carreggiata che dopo poco si farà sterrata (Strada Pian d’Attia)."+
      
      "Oltrepassata la borgata Lombarda, si arriva al primo bivio, dove trovi la segnaletica che indica altezza e distanze per Pian d’Attia, Alpe d’Attia e Colle d’Attia."+
      
      "Il sentiero taglia nel bosco con una dolce salita e ti permette di evitare la carreggiata principale e il possibile passaggio di auto. Proseguendo per l’evidente traccia si raggiunge il Pian d’Attia (1382 Mt), dove troverai dei casolari e una fontana dove fare rifornimento d’acqua."+
      
      "Qui potrai rilassarti qualche minuto, prima di imboccare il sentiero dietro la fontana e proseguire ancora una volta nel boschetto di faggi. In quest’ultimo tratto la salita si fa più dura, ma il percorso è molto ombreggiato ed il silenzio della natura ti accompagna regalandoti anche la possibilità di avvistare qualche daino. "+
      
      "Ad un certo punto il bosco sparisce e di fronte a te si aprirà lo spettacolo dell’Alpe Attia. Passeggia sulla piana e raggiungi i caseggiati in pietra, dove troverai un’altra fontana e la possibilità di rilassarti sognando di raggiungere le cime intorno."
      this.wrapperPopulate(HikeID,file,province,city,title,length,expTime,Ascent,Description,Difficulty,start,end);


      HikeID='21';
      title="Circuito Wulaia via Puerto Navarino";
      province='CHILE';
      city ='Puerto Navarino (Magallanes)'; 
      Ascent=1515;
      start=null
      end="Wulaia bay"
      length=30.26;
      Difficulty="PH";
      expTime=1850; 
      file="circuito-wulaia-via-puerto-navarino.gpx"    
      Description="Beautiful, splendid isolated coast trail following the old marks from 2002/2003 (as far as possible). Mostly in woodlands near the shore, interrupted by fair bay areas und a land passage."+

      "- there is unfortunately no public transport to/from PW und few private traffic. You can go by hitch-hiking or take a lift by Ushuaia Booting."+
      "- at the beginning are some animals trails and it is easy, later most time on pathless terrain"+
      "- ~70% of the old marks are still existing in varying quality"+
      "- from hito 7 to Wulaia it is continuously getting harder, some areas are strongly changed by beaver work or storm damages with lots of trunks over the ground of every size and the signs are lacking."+
      "- beautiful bay areas with remains from the Yámana. Please don't touch the conchales, they are one of last evidence of this vanished folk and protected by chilean law."+
      "- in the bay areas also you can find high nasty spiny shrubs (calafate & mata negra) were you have to pass through."+
      
      "some remarks:"+
      "- between hito 7 and hito 8 are some steep passages, take care when it is wet, also the trunks can get slippery"+
      "- go with proper gear and knowledge to use it."+
      "- plan at least 3-4 days, even it es possible to do it in two days. The weather can change and become inhospitable quickly at every time."+
      "- it is recommendable to stay on the track."+
      "- be aware of the risk that in case of trouble nobody will or can help you in this remote area"+
      "- under 'Cabo de Hornos, Walaia – Ruta Patrimonial Nº16' you can find in the WWW a good description (68 pages) of the track from the 'Ministerio de Bienes Nacionale'. But note: all named GPS-coordinates are wrong. Even with transformation from datum PSAD56 or SA69 to WSG84. The named datum 'P. South America 69' is not existing."
      
      
      this.wrapperPopulate(HikeID,file,province,city,title,length,expTime,Ascent,Description,Difficulty,start,end);


      HikeID='22';
      title="Salkantay via Llaqtapata (self-guided)";
      province='PERU';
      city ='Soray(Cusco)'; 
      Ascent=3657;
      start="Abra Salkantay"
      end="Wayramachay"
      length=66.38;
      Difficulty="H";
      expTime=5924; 
      file="salkantay-via-llaqtapata-self-guided.gpx"    
      Description="Salkantay via Llaqtapata (self-guided) by Luana e Leandro from Expllorers channel."+

      "Days: 6 days / 5 nights (Machu Picchu visit included)."+
      
      "Details coming soon."
      
      this.wrapperPopulate(HikeID,file,province,city,title,length,expTime,Ascent,Description,Difficulty,start,end);

      
      HikeID='23';
      title="Toubkal Circuit";
      province='MOROCCO';
      city ='Imelil(Marrakesh-Safi)'; 
      Ascent=7967;
      start="Imlil"
      end="Imlil"
      length=87.48;
      Difficulty="T";
      expTime=5924; 
      file="toubkal-circuit.gpx"    
      Description="The Toubkal circuit performed counterclockwise, with some variation."+
      "From Imlil to Sidi Chamarouch and to the Toubkal and Mouflon refuges."+
      "Ascent to Toubkal by the normal route, descent through a slightly different route. Ascent to Timseguida and Ouanoukrim with descent via the couloir."+
      "Crossing of Tizi-n-Ouanoums and descent to Lake d'Ifni and Amsouzert."+
      "From here the track leaves the classical loop, remaining closer to the Toubkal summit. After going up the Tisgui valley, it climbs the slope of an unnamed 3740 m summit dominating, on the other side, Tizi-n-Terhaline which is the natural crossing between Sidi Chamarouch and the Ourika valley. Skirting this pass, the track leads down a gorge to the wonderfully isolated sposts of Azib Tamenzift and Azib Likemt, where the classical loop is joined again to tackle the last ascent, the one to Tizi Likemt, whose smooth NW slope would also be good for ski-mountaineering."+
      "The path reaches the road connecting Imlil to Tacheddirt via Tizi-n-Tamatert, and actually the conclusion is a long stroll on the gravel road."+
      
      "The loop was performed in December 2007 after reaching Imlil by bicycle from Marrakech: 28 hours to climb the Toubkal from Marrakech 'by fair means'. The days were the following;"+
      "0) Marrakech - Imlil by bicycle, then hike to Sidi Chamarouch;"+
      "1) Ascent to Toubkal and, in the afternoon, to Timesguida and Ouanoukrim, completing hte ascent of three 4000 in one day. Night at the Refuge Mouflon;"+
      "2) Crossing of Tizi-n-Ouamoums, and then down to Amsouzert. Night at the known gite d'etape run by Omar;"+
      "3) Up the Tisgui and down to the azib before the gorge. Night under te stars in the sleeping bag;"+
      "4) Crossing of Tizi Likemt and back to Imlil."
      
      this.wrapperPopulate(HikeID,file,province,city,title,length,expTime,Ascent,Description,Difficulty,start,end);


      HikeID='24';
      title="West MacDonnell National Park - Ormiston Pound, Mt Giles, Chewings Range and Heavitree Range";
      province='AUSTRALIA';
      city ='Glen Helen(Northern Territory)'; 
      Ascent=2660;
      start="ORMISTON GORGE"
      end="COUNTS POINT"
      length=78.09;
      Difficulty="PH";
      expTime=null; 
      file="west-macdonnell-national-park-ormiston-pound-mt-giles-chewin.gpx"    
      Description="This is a fantastic area to walk but is only for experienced parties."+

      "BE WARNED"+
      "- This walk is off track through rugged, remote and mountainous terrain. You must be confident at navigation, and route finding. The GPS track may be inaccurate in some of the gorges due to poor signal."+
      "- While we found adequate water in the gorges of the Chewings Range to replenish supplies, depending on season water can be hard to find and of variable quality."+
      "There is no water on the top of the Chewing or Heavitree ranges. Plan to carry an extra days water and have an exit strategy worked out if you can't locate further supplies."+
      "- You need to be fit enough to carry everything you need for a week over and up/down rugged terrain."+
      "- The area is very isolated we saw no other living souls for the entire trip after leaving Ormiston Gorge, there is some phone reception on top of the mountains but elsewhere a PLB is required in case of emergency."+
      "- to complete this route we did a fair bit of advanced scrambling (AKA rock climbing with a pack). You must be happy with scrambling and exposure to negotiate the gorges."+
      "- one of our party, a wild hairy beast called Garn still wanders the Chewings Ranges looking for lost Bush walkers to eat."+
      
      "We started at Ormiston Gorge and finished at Serpentine Chalet Dam (arriving around midday). With an extra day it could converted to a circuit returning to Ormiston Gorge via the Larapinta Trail."
      

      this.wrapperPopulate(HikeID,file,province,city,title,length,expTime,Ascent,Description,Difficulty,start,end);


      
      HikeID='25';
      title="Uyuni (3 days tour)";
      province='BOLIVIA';
      city ='Uyuni(Potosi)'; 
      Ascent=3652;
      start="Cementerio de Trenes"
      end="Chilean Migration Checkpoint"
      length=557.1;
      Difficulty="H";
      expTime=4320; 
      file="uyuni-3-days-tour.gpx"    
      Description="THE TRIP"+
      "Round trip vs. Atacama connection: the tour its basically a one way trip, the 500km you do in 2 days and 1 morning you will do through another path to go back in just one afternoon, making almost non stops."+
      "Altitude: you will reach almost 5000 meters, but Uyuni is at 3700 same as the first night of the tour, should be ok ONLY if you spend some days in Uyuni to get used to the 4000 range (or any other high place like Potosi) don’t underestimate this, so many people get altitude sickness because they climb too fast. Avoid alcohol, its not good and you will get drunk so much easier than normal."+
      "Times: the early you leave the better, avoid crowds, have more time to enjoy, 3rd day before going to the geyser wake up 4am, make sure to go outside the hotel as soon as possible to take a look at the sky, the stars there are amazing (wear warm) then go inside for breakfast."+
      "Wildlife: flamingos easy to find, fox and viscachas (rabbit like animal) not so easy."+
      "Geyser: avoid breathing for long the fumes, its toxic."+
      "Bags: if you do the trip with a tour agency leave all the food, medicine, some water, warm cloth and windbreaker in your small backpack with you (in your seat or the trunk) the rest will be put outside the car on the top tied up, they will give to you at the end of the day when you get to the hotel."+
      "Electricity: this can change on where you stay but should be similar anywhere. 1st night there is light in the rooms but no plug, for charging your devices you have to go to the common area where there is a table full of splitters and plug it there. 2nd night cannot charge anything, if you are lucky  have light it will be only for few hours before sleeping or the whole night (no lights on the toilet in my case) tip: pack your back before night falls, next day you wake up 4am."+
      "Shower: 1st night there is hot shower for extra price, 2nd night if you are lucky you will have shower and if you are very very lucky hot water but better not count on any kind of shower for the whole trip, specially for the second night."+
      "Winter: so strong wind it break the window of the car sometimes. -20C."+
      "Summer: ok weather but still cold and windy, around -5C at night. daytime t-shirt hot, cold when the wind blows."+
      "For more info about the weather check pictures: yearly graphic (link on description to full info)"+
      
      "VARIANTS"+
      "4 days: same as this one plus Vocán Tunupa area (northern part of the salt flat)"+
      "4 days: Uyuni -> Tupiza, after the southern part of the 3 days trip you head to Tupiza. Careful: Tupiza -> Uyuni can be done, even easier to find agency but you will climb very fast in short time, faster than starting in Uyuni."+
      "1 day: only the salt flat (going to Isla Incahuasi and come back)"+
      
      "DRIVE IT YOURSELF"+
      "Bring all the fuel you need."+
      "Bring all the water you need."+
      "Food maybe you can get on the hotels but the tour drivers they cook in the hotels."+
      "No ATM, no card accepted anywhere in the tour."+
      "Avoid the rainy season (december to february) the path get flooded making it very hard even imposible, the secondary route miss many attractions."+
      "Places not included in the normal tour might be worth it: Ojos de Sal (Salar de Uyuni) Cueva Galaxias (north of San Pedro de Quemez)"+
      "Bike: looks very hard and you need to arrange for the fuel with some vehicle probably, but possible, I saw at least 4 bikes in the whole trip. Very strong winds you don't feel inside the car."+
      
      "ABOUT THE AGENCIES"+
      "Almost every the cars are Toyota Land Cruise, they put all the big stuff on top of the car, including big containers with fuel for the full trip, good agencies are hard to find, I heard only 3 companies have own drivers, the rest just hire any driver for the tour merging with other agencies, Hodaka Mountain is one of the few with selected list of drivers, a bit more expensive but in my 1 experience is worth it. They merge with other companies if not enough passenger but they have a selected partners same as drivers, my experience was good, the car looks normal/nice at first but after comparing with the rest (glasses filled with marks on the dark film, horrible for pictures, some cannot even open the window) I realice it was one of the bests, even the driver was specially careful (speed, attention, he even clean the windows couple times a day, something so small nobody notices but makes the difference, specially for the pictures)"+
      "You will make some stops but the time is limited but the place is huge, so you will have to take pictures from the car a lot, make sure the car can open the windows. The Lexus version of the car have windows in the 3rd row of seat (the normal Toyota version has fixed glass, cannot open)"
      


      this.wrapperPopulate(HikeID,file,province,city,title,length,expTime,Ascent,Description,Difficulty,start,end);


      HikeID='26';
      title="Nevado Sajama, 6542";
      province='BOLIVIA';
      city ='Estancia Junchusuma(Oruro)'; 
      Ascent=2240;
      start="path to Aychuta"
      end="Nevado Sajama"
      length=11.07;
      Difficulty="H";
      expTime=null; 
      file="nevado-sajama-6542.gpx"    
      Description="The present track describes the normal route to Nevado Sajama."+
      "IT IS DRAWN BY HAND, following the well definite path visible on Google Earth."+
      "It has no meaning from the penitentes to the top, since there the path has to be established according to the conditions."+
      "The path start at 4300 m from the flat road joining Pueblo Sajama to Laguna Huayna Chota before and Estancia Tomarapi next. This road is part of a whole loop that could be done around the volcano. I planned to do it by bicycle, but then I had no time, reaching only Tomarapi on a return trip."+
      "The base camp at Aychuta lies at 4810 m, an altitute curiously equal to that of Mont Blanc. The high camp lies at 5670 m. The only slightly technical stretch is a short couloir, with mixed terrain, little below 6000 m. It gives access to the upper stretch of the ridge, which begins with a stretch of hard ice and penitentes, giving them place to more comfortable snow."+
      "On the flat and very wide top once was played also a football match, as a test for performance at altitude."+
      "The view from the top, contrarily to what one can expect, is not so exciting, because the Sajama is just too high and isolated!"


      this.wrapperPopulate(HikeID,file,province,city,title,length,expTime,Ascent,Description,Difficulty,start,end);


      HikeID='27';
      title="Samaipata Bosque de los Helechos Gigantes";
      province='BOLIVIA';
      city =' Samaipata(Samaipata)'; 
      Ascent=1428;
      start="Samaipata"
      end="Helechos Gigantes"
      length=31.53;
      Difficulty="T";
      expTime=1620; 
      file="samaipata-bosque-de-los-helechos-gigantes.gpx"    
      Description="It was very easy but I couldn't find the waterfall. So I couldn't make circle in the Parque Nacional."

      this.wrapperPopulate(HikeID,file,province,city,title,length,expTime,Ascent,Description,Difficulty,start,end);


      HikeID='28';
      title="El Choro Trek, In 3 days from La Cumbre (4885m) to Chairo (1350m)";
      province='BOLIVIA';
      city ='  Rinconada (La Paz)'; 
      Ascent=1809;
      start="Chairo"
      end="Villa Fatima"
      length=53.37;
      Difficulty="T";
      expTime=424; 
      file="el-choro-trek-in-3-days-from-la-cumbre-4885m-to-chairo-1350m.gpx"    
      Description="You hike along an old really beautiful Inca way through different types of vegetation. The trek can easily be done by yourself without any guide or mules / horses that carry your equipment. The first night you can not sleep in a lodge, you therefore have to carry your own tent. Along the way you will find a couple of small stores selling snacks and food. It's best to bring your own food from 'La Paz'. Some guidebooks write, that the locals are unfriendly or even worse, that you get robbed. We did not experience anything like it, everyone was really friendly and helpful."+

      "Day 1:"+
      "There are three options to reach the starting point of the trek. 1) take any bus that goes from 'La Paz' ('Villa Fatima' district) to 'Coroico' and tell the driver to let you off at 'La Cumbre' 2) same as 1 but with minibuses, they leave when there are full and they also depart from 'Villa Fatima' 3) take a taxi (we paid 80 Bolivianos). Of course you can also hitch hike, there are many cars passing. 'La Cumbre' is also the starting point for the famous 'Death Road'. You need to register at the small house next to the lagoon. After that you follow the dirt-road up to the pass. From here it all goes down... down .. down. You will pass a small village (Samaña Pampa) where you have to sign again. Further down the path you reach the village 'Chucura' where you have to pay the trail fee of 10 Bolivianos. The money is collected to keep the way clean and for the maintenance for all the bridges. We spent the first night in 'Challapampa' (2820m), you have to bring your own tent. They charge 10 Bolivianos per person. You can also buy snacks and drinks here."+
      
      "Day 2:"+
      "The second day is really long and tiring so better get up early. First you go down on the true left side of the river until 'Choro' where you cross the river. On the other side you have to go up again. Now there are several possibilities to camp along the way. We walked until 'Sandillani' where you can also stay in a nice lodge, run by an old lady. If you want to camp it's 5 Bolivianos per person. There is no hot water and the toilets costs extra (1 Boliviano). The lady does also sell beers and snacks, it's also possible to eat breakfast there. On this second day we walked almost 9 hours and the way is going up and down."+
      
      "Day 3:"+
      "From 'Sandillani' it only goes down to 'Chairo', it takes roughly 2 - 3 hours until you arrive in 'Chairo'. From here you can get a (really) expensive taxi to either the junction of the 'La Paz - Coroico' route or directly to 'Coroico'. I guess they charge about 100 Bolivianos. Another option is to walk or hitch hike, there are quite some cars passing by. At the junction you can take a taxi/minibus back to 'Villa Fatima' (25 Bolivianos per person)"+
      
      "Don't forget to bring sunscreen, repellent and some small bills to buy snacks/water along the way."+
      
      "Helpful maps:"+
      "- http://www.azimutexplorer.com/img/content/photos_big/trek_choro_4dias/mapa_choro.jpg"+
      "- http://www.trekkingchile.com/Images/choro-trail-map.jpg"+
      "- http://www.turismoboliviaperu.com/imgs/mapa-choro.gif"+
      "- http://coroico-info.com/webs/incatrail/sitebuilder/images/mappage-572x557.jpg"
      this.wrapperPopulate(HikeID,file,province,city,title,length,expTime,Ascent,Description,Difficulty,start,end);


      HikeID='29';
      title="Parinacota";
      province='BOLIVIA';
      city ='Estancia Milluri (Oruro)'; 
      Ascent=2196;
      start="Pueblo Sajama"
      end="Crater rim, NW"
      length=25.98;
      Difficulty="H";
      expTime=null; 
      file="parinacota.gpx"    
      Description="You hike along an old really beautiful Inca way through different types of vegetation. The trek can easily be done by yourself without any guide or mules / horses that carry your equipment. The first night you can not sleep in a lodge, you therefore have to carry your own tent. Along the way you will find a couple of small stores selling snacks and food. It's best to bring your own food from 'La Paz'. Some guidebooks write, that the locals are unfriendly or even worse, that you get robbed. We did not experience anything like it, everyone was really friendly and helpful."+

      "Day 1:"+
      "There are three options to reach the starting point of the trek. 1) take any bus that goes from 'La Paz' ('Villa Fatima' district) to 'Coroico' and tell the driver to let you off at 'La Cumbre' 2) same as 1 but with minibuses, they leave when there are full and they also depart from 'Villa Fatima' 3) take a taxi (we paid 80 Bolivianos). Of course you can also hitch hike, there are many cars passing. 'La Cumbre' is also the starting point for the famous 'Death Road'. You need to register at the small house next to the lagoon. After that you follow the dirt-road up to the pass. From here it all goes down... down .. down. You will pass a small village (Samaña Pampa) where you have to sign again. Further down the path you reach the village 'Chucura' where you have to pay the trail fee of 10 Bolivianos. The money is collected to keep the way clean and for the maintenance for all the bridges. We spent the first night in 'Challapampa' (2820m), you have to bring your own tent. They charge 10 Bolivianos per person. You can also buy snacks and drinks here."+
      
      "Day 2:"+
      "The second day is really long and tiring so better get up early. First you go down on the true left side of the river until 'Choro' where you cross the river. On the other side you have to go up again. Now there are several possibilities to camp along the way. We walked until 'Sandillani' where you can also stay in a nice lodge, run by an old lady. If you want to camp it's 5 Bolivianos per person. There is no hot water and the toilets costs extra (1 Boliviano). The lady does also sell beers and snacks, it's also possible to eat breakfast there. On this second day we walked almost 9 hours and the way is going up and down."+
      
      "Day 3:"+
      "From 'Sandillani' it only goes down to 'Chairo', it takes roughly 2 - 3 hours until you arrive in 'Chairo'. From here you can get a (really) expensive taxi to either the junction of the 'La Paz - Coroico' route or directly to 'Coroico'. I guess they charge about 100 Bolivianos. Another option is to walk or hitch hike, there are quite some cars passing by. At the junction you can take a taxi/minibus back to 'Villa Fatima' (25 Bolivianos per person)"+
      
      "Don't forget to bring sunscreen, repellent and some small bills to buy snacks/water along the way."+
      
      "Helpful maps:"+
      "- http://www.azimutexplorer.com/img/content/photos_big/trek_choro_4dias/mapa_choro.jpg"+
      "- http://www.trekkingchile.com/Images/choro-trail-map.jpg"+
      "- http://www.turismoboliviaperu.com/imgs/mapa-choro.gif"+
      "- http://coroico-info.com/webs/incatrail/sitebuilder/images/mappage-572x557.jpg"
            
    this.wrapperPopulate(HikeID,file,province,city,title,length,expTime,Ascent,Description,Difficulty,start,end);


    HikeID='30';
    title="Choro Trek Bolivia";
    province='BOLIVIA';
    city =' Rinconada (La Paz)'; 
    Ascent=-4280;
    start="Pueblo Sajama"
    end="Crater rim, NW"
    length=51.97;
    Difficulty="PH";
    expTime=null; 
    file="choro-trek-bolivia.gpx"    
    Description="3 days of trekking along an old paved Inca road, with a pass over 4700 m and the chance to go down till the humid climate of the Yungas where the mountains are green and coffe, bananas and coca grows. A world class trekking with Inca ruins, remote villages, delicious camping spots and a very special encouter with the fascinating Japanese old men that lives here since the 50's"
          
  this.wrapperPopulate(HikeID,file,province,city,title,length,expTime,Ascent,Description,Difficulty,start,end);

    
  HikeID='31';
  title="Huayna Potosi - From Base Camp to Summit";
  province='BOLIVIA';
  city ='Milluni(La Paz)'; 
  Ascent=1350;
  start="CampArgent"
  end="RefCasadeG"
  length=7.5;
  Difficulty="PH";
  expTime=1359; 
  file="choro-trek-bolivia.gpx"    
  Description="From Huayna Potosi Base Camp to Summit"+
  "Day 1: La Paz - Huayna Potosi Base Camp - Refugio Anselme Baud/Casa de Guias"+
  "Day 2: Refugio Anselme Baud/Casa de Guias - Summit - La Paz"+
  "For a full report see '20 days in the Cordillera Real - Trekking and Montanhism'"+
  "https://www.facebook.com/lucasbaruzzi/media_set?set=a.10207861573721238&type=3&pnref=story"
        
this.wrapperPopulate(HikeID,file,province,city,title,length,expTime,Ascent,Description,Difficulty,start,end);

}
    

    static  wrapperPopulate =async (HikeID,file,province,city,title,length,expTime,Ascent,Description,Difficulty,start,end)=>{
        let path="./gpx/"+file;
        const locations =require ("./HikeLocations");
        const hikes =require("./Hikes");
        const fileLocation= require("./FileNames");

        await hikes.addHike(HikeID,title,length,expTime,Ascent,Difficulty,start,end,Description);
        await locations.addLocation(HikeID,province,city);
        await fileLocation.addFile(HikeID,path);
    
    }


}





module.exports = DatabaseConnection;