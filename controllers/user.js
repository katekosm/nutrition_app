const models = require('../models');
const User = models.user;
// const passwordUtil = require('../util/passwordComplexityCheck');
const { errMsgs } = require('../helper');
const ObjectId = db.mongoose.mongo.ObjectId;

const getAll = (req, res) => {
    try {
        User.find({})
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

const getOne = (req, res) => {
    try {
        let userId = req.params.id;
        if (!userId || !ObjectId.isValid(userId)) {
            res.status(400).send({ message: errMsgs.invalidId });
            return;
        }
        userId = new ObjectId(userId);
        User.find({ _id: userId })
            .then((data) => {
                if (!data) {
                    res.status(404).json(errMsgs.errWhile + 'retrieving.');
                    return;
                }
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

const createUser = (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            res.status(400).send({ message: errMsgs.notEmpty });
            return;
        }
        // const password = req.body.password;
        // const passwordCheck = passwordUtil.passwordPass(password);
        // if (passwordCheck.error) {
        //     res.status(400).send({ message: passwordCheck.error });
        //     return;
        // }
        const user = new User(req.body);
        user
            .save()
            .then((data) => {
                console.log(data);
                res.status(201).send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || errMsgs.errWhile + 'creating.'
                });
            });
    } catch (err) {
        res.status(500).json(err);
    }
}

const updateUser = (req, res) => {
    try {
        let userId = req.params.id;
        if (!userId || !ObjectId.isValid(userId)) {
            res.status(400).send({ message: errMsgs.invalidId });
            return;
        }
        userId = new ObjectId(userId);
        // const password = req.body.password;
        // const passwordCheck = passwordUtil.passwordPass(password);
        // if (passwordCheck.error) {
        //     res.status(400).send({ message: passwordCheck.error });
        //     return;
        // }
        User.findOne({ _id: userId })
            .then((user) => {
                if (!user) {
                    res.status(500).json(err || errMsgs.errWhile + 'updating.');
                    return;
                }
                user.username = req.params.username;
                user.displayName = req.body.displayName;
                user.gender = req.body.gender;
                user.password = req.body.password;
                user.email = req.body.email;
                user.phoneNumber = req.body.phoneNumber;
                user.location = req.body.location;

                return user.save();
            })
            .then((saveResult) => {
                if (!saveResult) {
                    res.status(500).json(err || errMsgs.errWhile + 'updating.');
                } else {
                    res.status(204).send();
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || errMsgs.errWhile + 'updating.'
                });
            });
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteUser = (req, res) => {
    try {
        let userId = req.params.id;
        if (!userId || !ObjectId.isValid(userId)) {
            res.status(400).send({ message: errMsgs.invalidId });
            return;
        }
        userId = new ObjectId(userId);
        User.deleteOne({ _id: userId })
            .then((result) => {
                if (!result) {
                    res.status(500).json(err || errMsgs.errWhile + 'deleting.');
                    return;
                }
                res.status(200).send(result);
            })
            .catch((err) => {
                res.status(500).json(err || errMsgs.errWhile + 'deleting.');
            });
    } catch (err) {
        res.status(500).json(err || errMsgs.errWhile + 'deleting.');
    }
}

module.exports = {
    getAll,
    getOne,
    createUser,
    updateUser,
    deleteUser
};