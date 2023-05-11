// const mongoose = require('./db').mongoose;
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const initPassport = () => {
    passport.use(new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL
        },
        function (accessToken, refreshToken, profile, done) {
            //User.findOrCreate({ githubId: profile.id }, function (err, user) {
            return done(null, profile);
            //});
        }
    ));

    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));
}

module.exports = { passport, initPassport }