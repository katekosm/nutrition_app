const { validator } = require('../helper.js');

const validatorTemplate = (validationRule, req, res, next) => {
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
}

const user = (req, res, next) => {
    const validationRule = {
        displayName: 'required|string',
        gender: 'required|string',
        email: 'required|email',
        phoneNumber: 'required|string',
        location: 'string'
    };

    validatorTemplate(validationRule, req, res, next);
};

const meal = (req, res, next) => {
    const validationRule = {
        mealTime: 'required|string',
        proteins: 'required|string',
        fats: 'required|string',
        carbohydrates: 'required|string',
        waterAmount: 'string',
        calories: 'required|string',
        iron: 'string'
    };

    validatorTemplate(validationRule, req, res, next);
}

module.exports = {
    user,
    meal
};