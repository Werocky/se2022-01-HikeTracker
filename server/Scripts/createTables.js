const helper = require('../modules/populate.js');

helper.createConnection().then(()=>{
    console.log('Connection Created')
}).catch((err)=>{
    console.log('Error: '+err)
});