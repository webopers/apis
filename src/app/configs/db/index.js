const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to Database ^_^');
    } catch (err) {
        console.log('Connect to Database failure: ', err);
    }
};

module.exports = { connect };
