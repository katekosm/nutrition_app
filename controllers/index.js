const db = require('../models');
const { errMsgs } = require('../helper');

const index = async (req, res) => {
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
    } catch (error) {
        console.error(err);
        res.status(500).send(errMsgs.errWhile + 'retrieving');
    }
};

module.exports = { index }
