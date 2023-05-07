const db = require('../models');
const Meal = db.meal;
const { errMsgs } = require('../helper');

const getAll = (req, res) => {
    try {
        Meal.find({})
            .then((data) => {
                res.status(200).send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || errMsgs.errWhile + 'retrieving'
                });
            });
    } catch (err) {
        res.status(500).json(err);
    }
}

const getOne = (req, res) => {
    try {
        if (!req.params.id) {
            res.status(400).send({ message: errMsgs.notEmpty });
            return;
        }
        const mealId = new db.mongoose.mongo.ObjectId(req.params.id);
        Meal.find({ _id: mealId })
            .then((data) => {
                res.status(200).send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || errMsgs.errWhile + 'retrieving.'
                });
            });
    } catch (err) {
        res.status(500).json(err);
    }
}

const createMeal = (req, res) => {
    try {
        if (!req.body.id) {
            res.status(400).send({ message: errMsgs.notEmpty });
            return;
        }
        const meal = new Meal(req.body);
        meal
            .save()
            .then((data) => {
                console.log(data);
                res.status(201).send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || errMsgs.errWhile + 'creating'
                });
            });
    } catch (err) {
        res.status(500).json(err);
    }
}

const updateMeal = (req, res) => {
    try {
        let mealId = req.params.id;
        if (!mealId) {
            res.status(400).send({ message: errMsgs.invalidId });
            return;
        }
        mealId = new db.mongoose.mongo.ObjectId(mealId);
        Meal.findById(mealId)
            .then((meal) => {
                if (!meal) {
                    res.status(500).json(err || errMsgs.errWhile + 'updating.');
                    return;
                }
                meal.mealTime = req.body.mealTime;
                meal.proteins = req.body.proteins;
                meal.fats = req.body.fats;
                meal.carbohydrates = req.body.carbohydrates;
                meal.waterAmount = req.body.waterAmount;
                meal.calories = req.body.calories;
                meal.iron = req.body.iron;

                return meal.save();
            })
            .then((saveResult) => {
                if (!saveResult) {
                    res.status(500).json(err || errMsgs.errWhile + 'updating.');
                } else {
                    res.status(204).send();
                }
            })
            .catch((err) => {
                res.status(500).json(err);
            });

    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteMeal = (req, res) => {
    try {
        let mealId = req.params.id;
        if (!mealId) {
            res.status(400).send({ message: errMsgs.invalidId });
            return;
        }
        mealId = new db.mongoose.mongo.ObjectId(mealId);
        Meal.deleteOne({ _id: mealId })
            .then((result) => {
                if (result.deletedCount === 0) {
                    return res.status(404).send('Document not found');
                }
                return res.status(204).send('Document deleted successfully');
            })
            .catch((err) => {
                res.status(500).json(err || errMsgs.errWhile + 'deleting.');
            });
    } catch (err) {
        res.status(500).json(err || 'Some error occurred while deleting the contact.');
    }
}

module.exports = {
    getAll,
    getOne,
    createMeal,
    updateMeal,
    deleteMeal
};
