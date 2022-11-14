const mongoose = require("mongoose");

// Replace this with your MONGOURI.
const MONGOURI = "mongodb+srv://adminTWK:adminTWK@cluster0.eqwkvz7.mongodb.net/test";

const connectDB = async () => {
    try {
        const cn = await mongoose.connect(MONGOURI, {
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