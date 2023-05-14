const db = require('../config/db');
const path = require('path');
const { errMsgs } = require('../helper');

const index = (req, res) => {
    try {
        if (req.session.user !== undefined) {
            res.send(`Logged in as <img width='25' height='25' src='${req.session.user._json.avatar_url}'> ${req.session.user.displayName}. <a href='/auth/logout'>Logout</a> <a href='/api-docs'>API Documentation</a>`);
        } else {
            res.send("You are logged out. <a href='/auth/login'>Login Page</a>");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

const collections = async (req, res) => {
    try {
        db.mongoose.connection.db.listCollections().toArray()
            .then((collections) => {
                if (collections.length === 0) {
                    res.status(404).send('No collections found');
                } else {
                    collections = collections.map(item => item.name).join('<br>');
                    res.status(200).send(collections);
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send(errMsgs.errWhile + 'retrieving');
            });
    } catch (err) {
        console.error(err);
        res.status(500).send(errMsgs.errWhile + 'retrieving');
    }
};

module.exports = { index }
