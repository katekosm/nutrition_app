const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const session = require('express-session');

const port = process.env.PORT || 8080;
const app = express();

const { passport, initPassport } = require('./config/passport')
// Passport config
initPassport(passport);

app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
        );
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    })
    // Sessions
    .use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: true
        })
    )
    // Passport middleware
    .use(passport.initialize())
    .use(passport.session())

    .use(express.static('static'))
    .use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\nException origin: ${origin}`);
});

db.connect(() => {
    app.listen(port, () => {
        console.log(`Server running on ${port}.`);
    });
});
