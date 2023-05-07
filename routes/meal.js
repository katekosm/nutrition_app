const express = require('express');
const router = express.Router();

const mealController = require('../controllers/meal');
const validation = require('../middleware/validate');

router.get('/', mealController.getAll);
router.get('/:id', mealController.getOne);
router.post('/', validation.saveMeal, mealController.createMeal);
router.put('/:id', validation.saveMeal, mealController.updateMeal);
router.delete('/:id', mealController.deleteMeal);

module.exports = router;