const express =require('express'),
      morgan = require('morgan'),
      session = require('express-session');
module.exports = (app, passport) => {
    // EJS
    app.set('view engine', 'ejs');
    // Morgan
    app.use(morgan('dev'));
    // Connect flash
    app.use( // Express session
        session({
            secret: 'secret',
            resave: true,
            saveUninitialized: true
        })
    );
    // Global variables
    
    // Express body parser
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static('public/css'))
    app.use(express.static('public/js'))
    app.use(express.static('public/img'))
    app.use( express.static('/imagesSite'))
    // Passport middleware
    app.use(passport.initialize());
    app.use(passport.session());
}