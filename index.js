const express = require('express');
const app = express();
const auth = require('./router/Auth')
const user = require('./router/User')
const post = require('./router/Posts')
require('dotenv').config();

//Connect MongoDB
const port = process.env.PORT || 1999
app.listen(port, ()=>{
    console.log(process.env.URL_HOST)
})
// middleware
require('./middleware/App')(app)

// Router
app.use(auth)
app.use(user)
app.use(post)
