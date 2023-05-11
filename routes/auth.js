const express = require('express');
const router = express.Router();
const passport = require('../config/passport').passport;

const authController = require('../controllers/auth');
const { authGithub, callbackHandler } = require('../middleware/auth');

router.get('/login', authController.loginPage);
router.get('/github', passport.authenticate('github'));
router.get('/logout', authController.logout);

router.get(
    '/github/callback',
    passport.authenticate(
        'github',
        {
            failureRedirect: '/login',
            session: false
        }
    ),
    authController.success
);

module.exports = router;