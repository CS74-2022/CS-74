const  axios = require('axios');
const express = require('express');
const app = express();
const mongo = require('mongoose');
const passport = require('passport')
const auth = require('./router/Auth')
const user = require('./router/User')
const {ensureAuthenticated,forwardAuthenticated} = require('./config/AuthConfig')
require('dotenv').config();
require('./config/passport')(passport);

//Connect MongoDB
const port = process.env.PORT || 1999
mongo.connect(process.env.Mongo_URL, { useNewUrlParser: true ,useUnifiedTopology: true })
    .then(() => {
        app.listen(port, ()=>{
            console.log(process.env.URL_HOST)
        })
    }).catch(err => console.log(err));
// middleware
require('./middleware/App')(app, passport)

// Router
app.use(auth)
app.use(user)

app.get('/',ensureAuthenticated,  (req, res)=> res.status(302).render('index'))