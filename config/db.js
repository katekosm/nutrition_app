const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

db = {}
db.mongoose = mongoose;
db.uri = process.env.MONGODB_URI;
db.options = { useNewUrlParser: true, useUnifiedTopology: true }

module.exports = db;