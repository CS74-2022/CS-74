const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

module.exports = (app) => {
    // EJS
    app.set('view engine', 'ejs');
    // Morgan
    app.use(morgan('dev'));
    app.use(cors());
    // Express body parser
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static('layouts'))
    app.use( express.static('image'))
}