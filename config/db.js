const mongoose = require('mongoose');
const deURL = require('./propertis').DB;
module.exports = () => {
    mongoose . constructor(dbURL, { useNewUrl:true})
    .then(() => console.log('mongo is connected'))
    .catch(err => console.log('connection has error'))
     process.on('SIGINT', () => {
        mongoose.connection.close(() =>{
            console.log('mongo is disconnected');
            process.exit(0)
        });
     })
     
        
    }