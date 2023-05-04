const mongodb = require('../db/connect');
const collectionName = 'meals';

const getAllMeals = async (req, res) => {
    try {
        const result = await mongodb.getDb().db().collection(collectionName).find();
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

const getOneMeal = async (req, res) => {
    try {
        const mealId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db().collection(collectionName).find({ _id: mealId });
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

const createMeal = async (req, res) => {
    try {
        const meal = {
            mealTime: req.body.mealTime,
            proteins: req.body.proteins,
            fats: req.body.fats,
            carbohydrates: req.body.carbohydrates,
            waterAmount: req.body.waterAmount,
            calories: req.body.calories,
            iron: req.body.iron
        };
        const response = await mongodb.getDb().db().collection(collectionName).insertOne(meal);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(
                response.error || 'Some error occurred while creating.'
            );
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const updateMeal = async (req, res) => {
    try {
        let id = req.params.id;
        if (id === 'undefined') {
            const lastRecord = await getLastRecord();
            id = lastRecord._id;
        }
        id = new ObjectId(id);
        const meal = {
            mealTime: req.body.mealTime,
            proteins: req.body.proteins,
            fats: req.body.fats,
            carbohydrates: req.body.carbohydrates,
            waterAmount: req.body.waterAmount,
            calories: req.body.calories,
            iron: req.body.iron
        };
        const response = await mongodb
            .getDb()
            .db()
            .collection(collectionName)
            .replaceOne({ _id: id }, meal);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(
                response.error || 'Some error occurred while updating.'
            );
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteMeal = async (req, res) => {
    try {
        let id = req.params.id;
        if (id === 'undefined') {
            const lastRecord = await getLastRecord();
            id = lastRecord._id;
        }
        id = new ObjectId(id);
        const response = await mongodb
            .getDb()
            .db()
            .collection(collectionName)
            .deleteOne({ _id: id });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(
                response.error || 'Some error occurred while deleting.'
            );
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getLastRecord = async () => {
    const lastRecord = await mongodb
        .getDb()
        .db()
        .collection(collectionName)
        .find({})
        .sort({ _id: -1 })
        .limit(1)
        .toArray();

    return lastRecord[0];
};

module.exports = { getAllMeals, getOneMeal, createMeal, updateMeal, deleteMeal };
