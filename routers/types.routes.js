const router = require('express').Router();
const { FirebaseStorageMultipleImageUploadMethod, FirebaseStore } = require('../firebase-admin');
const multer = require('../util/multer');

// Get Pages
router.get('/Types/:id', async (req, res) => {
    const doc = await FirebaseStore.collection("user").doc(req.params.id).get();
    res.status(302).render('page/Types', {contact: { id: doc.id, ...doc.data() }})
})

// Post Data
router.post('/typesService', async (req, res) => {
    const data = {
        userId: req.body.userId,
        CName: req.body.CName,
        serviceType: req.body.serviceType,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        titleCenter: req.body.titleCenter,
        dataInput:true
    }
    console.log(data.userId)
})

module.exports = router;