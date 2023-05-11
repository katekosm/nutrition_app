const db = require('../config/db');

const models = {};
models.user = require('./user.js')(db.mongoose);
models.meal = require('./meal.js')(db.mongoose);

module.exports = models;    