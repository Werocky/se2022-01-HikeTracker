const helper = require('./populate.js');

helper.populateScript().then(()=>{
    console.log('Populated')
}).catch((err)=>{
    console.log('Error populating: '+err)
});