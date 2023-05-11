const { isAuthenticated } = require('./auth');
const validate = require('./validate');


const verifyMeal = (req, res, next) => {
    isAuthenticated(req, res, next, validate.meal);
}

const verifyUser = (req, res, next) => {
    isAuthenticated(req, res, next, validate.user);
}

module.exports = { verifyMeal, verifyUser }