const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.options = { useNewUrlParser: true, useUnifiedTopology: true }
db.user = require('./user.js')(mongoose);
db.meal = require('./meal.js')(mongoose);

module.exports = db;