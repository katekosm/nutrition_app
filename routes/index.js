const express = require('express');

const router = express.Router();
const mainController = require('../controllers');

router.use('/', require('./swagger'));
router.get('/', mainController.getAllMeals);
router.get('/:id', mainController.getOneMeal);
router.post('/', mainController.createMeal);
router.put('/:id', mainController.updateMeal);
router.delete('/:id', mainController.deleteMeal);

router.get('*', (req, res) => {
    res.status(404).send('404 Not found.');
});

module.exports = router;
