const path = require('path');
const { errMsgs } = require('../helper');

const loginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../static/login.html'));
}

const success = (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
}

const logout = (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
}

module.exports = { loginPage, success, logout }
