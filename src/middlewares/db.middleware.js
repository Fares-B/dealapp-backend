const mongoose = require("mongoose");

//connect to DB
function connectDB() {
    mongoose.connect(process.env.DB_CONFIG, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log("Connected to bd");
    });
}

module.exports = connectDB;
