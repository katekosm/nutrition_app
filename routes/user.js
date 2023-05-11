const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const { verifyUser } = require('../middleware/common');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', userController.getAll);
router.get('/:username', userController.getOne);
router.post('/', verifyUser, userController.createUser);
router.put('/:username', verifyUser, userController.updateUser);
router.delete('/:username', isAuthenticated, userController.deleteUser);

module.exports = router;