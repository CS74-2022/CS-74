const router = require('express').Router();
const { FirebaseStore } = require('../firebase-admin');;
const multer = require('../util/multer');

// Get Pages
router.get('/service/:id', async (req, res) => {
    const doc = await FirebaseStore.collection("user").doc(req.params.id).get();
    res.status(302).render('page/service', {contact: { id: doc.id, ...doc.data() }})
})
// Post
router.post('/Service', async (req, res) => {
    const data = {
        userId: req.body.userId,
        CName: req.body.CName,
        serviceType: req.body.serviceType,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        titleCenter: req.body.titleCenter,
        dataInput:true
    }
    const result = await FirebaseStore.collection('service').doc(data.userId).set(data)
        .then(()=>{
            res.status(200).redirect(`/Home/${data.userId}`)
        })
})

// delete 
router.post('/Service/Delete', async (req, res) => {
        FirebaseStore.collection('service').doc(userId).delete().then(()=>{
            res.status(200).redirect(`/Home/${userId}`)
            })
})


module.exports = router;