const express = require('express');
const router = express.Router();

const mainController = require('../controllers');

router.use('/', require('./swagger'));
router.use('/meal', require('./meal'));
router.use('/user', require('./user'));

router.get('/', mainController.index);

router.get('*', (req, res) => {
    res.status(404).send('404 Not found.');
});

module.exports = router;
