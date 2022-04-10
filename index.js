const express = require('express');
const {FirebaseStore, FirebaseAuth} = require('./firebase-admin')
const app = express();
const passport = require('passport')
const auth = require('./routers/auth.routes')
const service = require('./routers/service.routes')
const types = require('./routers/types.routes')
require('./Config/passport')(passport);
require('./middleware/app')(app, passport);

app.get('/Home/:id', async (req, res)=>{
    const doc = await FirebaseStore.collection("user").doc(req.params.id).get();
    const doc2 = await FirebaseStore.collection("service").doc(req.params.id).get();
    const doc3 = await FirebaseStore.collection('DataCenter').doc(req.params.id).get();

    res.status(302).render('page/hamePage', { contact: { id: doc.id, ...doc.data() }, service: {id: doc2.id, ...doc2.data()}, DataCenter: {id: doc3.id, ...doc3.data()}})
})

app.use(auth)
app.use(service)
app.use(types)
app.listen(1999,()=>{
    console.log('http://localhost:1999')
})