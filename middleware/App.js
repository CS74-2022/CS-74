const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session')
const flash = require('connect-flash')


module.exports = (app, passport) => {
    // EJS
    app.set('view engine', 'ejs');
    // Morgan
    app.use(morgan('dev'));
    app.use(cors());
    // Connect flash
    app.use(flash());
    app.use( // Express session
        session({
            secret: 'secret',
            resave: true,
            saveUninitialized: true
        })
    );
    // Global variables
    app.use(function(req, res, next) {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        next();
    });
    // Express body parser
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static('layouts'))
    app.use( express.static('image'))
    // Passport middleware
    app.use(passport.initialize());
    app.use(passport.session());
}