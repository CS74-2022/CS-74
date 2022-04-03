const router = require('express').Router();
const {FirebaseStorage, FirebaseAuth, FirebaseStore} = require('../firebase');
const upload = require('../util/multer');
const { maxAge, CreateTokenUserId, CreateTokenUserName, CreateTokenUserPassword } = require('../util/JWT')

// Get Login && Register Page
router.get('/service/:id', async (req, res)=>{
    const doc1 = await FirebaseStore.collection("user").doc(req.params.id).get();
    res.status(302).render('Page/service', { user: { id: doc1.id, ...doc1.data() }})
})
router.post('/service', upload.single('img'), async (req, res)=>{
    const User_id = req.body.userId
    const img = req.file.filename;
    const {address, serviceType, nameCenter, phoneNumber} = req.body;  
    const update_data = await FirebaseStore.collection('Service').doc(User_id).set({
        address: address, 
        serviceType: serviceType, 
        nameCenter: nameCenter, 
        phoneNumber: phoneNumber,
        input: true,
        Image: img
    })
        
    res.status(200).redirect(`/Home/${User_id}`)
})
router.get('/Home/:id', async (req, res)=>{
    const doc = await FirebaseStore.collection("user").doc(req.params.id).get();
    const doc2 = await FirebaseStore.collection("Service").doc(req.params.id).get();

    res.status(302).render('Page/Homepage', { contact: { id: doc.id, ...doc.data() }, service: {id: doc2.id, ...doc2.data()} })
})
module.exports = router;