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