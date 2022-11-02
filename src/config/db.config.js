const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const cn = await mongoose.connect('mongodb+srv://oscarVillanueva:paladinpar123@cluster0.t1w9n.mongodb.net/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        cn.STATES.connected
        ? console.log('MongoDB Conected')
        : console.log('Error in MongoDB');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = {
    connectDB
}