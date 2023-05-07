const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const validation = require('../middleware/validate');

router.get('/', userController.getAll);
router.get('/:username', userController.getOne);
router.post('/', validation.saveUser, userController.createUser);
router.put('/:username', validation.saveUser, userController.updateUser);
router.delete('/:username', userController.deleteUser);

module.exports = router;