const mongoose = require('mongoose');
const shema = mongoose.shema;
 const userShema = new Shema ({
    run:{
        type: String,
        require: true,
        trin: true,
        unique:true,
    }
    
  
    }, {
        timestamps:true,
    });