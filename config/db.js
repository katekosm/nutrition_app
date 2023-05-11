const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

db = {}
db.mongoose = mongoose;
db.uri = process.env.MONGODB_URI;
db.options = { useNewUrlParser: true, useUnifiedTopology: true }
db.connect = async (callback = null) => {
    try {
        const conn = await db.mongoose.connect(db.uri, db.options);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        if (callback) callback();
    } catch (err) {
        console.error('Cannot connect to the database!', err);
        process.exit(1);
    }
}

module.exports = db;