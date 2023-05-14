const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const { verifyUser } = require('../middleware/common');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', userController.getAll);
router.get('/:id', userController.getOne);
router.post('/', verifyUser, userController.createUser);
router.put('/:id', verifyUser, userController.updateUser);
router.delete('/:id', isAuthenticated, userController.deleteUser);

module.exports = router;