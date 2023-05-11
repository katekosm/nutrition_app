const express = require('express');
const router = express.Router();

const mainController = require('../controllers');

router.use('/', require('./swagger'));
router.use('/auth', require('./auth'));
router.use('/meal', require('./meal'));
router.use('/user', require('./user'));

router.get('/', mainController.index);

router.get('*', (req, res) => {
    res.status(404).send('404 Page is not found.');
});

module.exports = router;
