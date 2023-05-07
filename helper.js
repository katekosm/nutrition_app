const Validator = require('validatorjs');

const validator = (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
}

const errMsgs = {
    notEmpty: 'Content can not be empty!',
    errWhile: 'Some error occurred while ',
    invalidId: 'Invalid Id Supplied'
}

module.exports = {
    validator,
    errMsgs
}