// const passport = require('../config/passport').passport;
const passport = require('passport');

const isAuthenticated = (req, res, next, callback = null) => {
    if (req.session.user === undefined) {
        // res.redirect('/auth/login');
        return res.status(401).json("You do not have access.");
    } else if (callback) {
        callback(req, res, next);
    } else {
        next();
    }
};

const authGithub = () => {
    passport.authenticate('github', { scope: ['user:email'] });
}

const callbackHandler = () => {
    passport.authenticate(
        'github',
        {
            failureRedirect: '/login',
            session: false
        }
    )
}

module.exports = { isAuthenticated, authGithub, callbackHandler };