const express = require('express');
const router = express.Router();

const mealController = require('../controllers/meal');
const { verifyMeal } = require('../middleware/common');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', mealController.getAll);
router.get('/:id', mealController.getOne);
router.post('/', verifyMeal, mealController.createMeal);
router.put('/:id', verifyMeal, mealController.updateMeal);
router.delete('/:id', isAuthenticated, mealController.deleteMeal);

module.exports = router;