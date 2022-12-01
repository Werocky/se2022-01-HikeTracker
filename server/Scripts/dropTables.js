const helper = require('../modules/populate.js');

helper.dropTablesScript().then(()=>{
    console.log('Tables Dropped')
}).catch((err)=>{
    console.log('Error populating: '+err)
});