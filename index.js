const express = require('express');
const {FirebaseStore, FirebaseAuth} = require('./firebase-admin')
const app = express();
const passport = require('passport')
const auth = require('./routers/auth.routes')
require('./Config/passport')(passport);
require('./middleware/app')(app, passport);

app.get('/Home/:id', async (req, res)=>{
    const doc = await FirebaseStore.collection("user").doc(req.params.id).get();
    const doc2 = await FirebaseStore.collection("Service").doc(req.params.id).get();

    res.status(302).render('page/hamePage', { contact: { id: doc.id, ...doc.data() }, service: {id: doc2.id, ...doc2.data()}})
})

app.use(auth)
app.listen(1999,()=>{
    console.log('http://localhost:1999')
})