const router = require('express').Router();
const {FirebaseStorageMultipleImageUploadMethod, FirebaseAuth, FirebaseStore} = require('../firebase');
const upload = require('../util/multer');
const { maxAge, CreateTokenUserId, CreateTokenUserName, CreateTokenUserPassword } = require('../util/JWT')

// Get Login && Register Page
router.get('/service/:id', async (req, res)=>{
    const doc = await FirebaseStore.collection("user").doc(req.params.id).get();
    res.status(302).render('Page/service', { contact: { id: doc.id, ...doc.data() }})
})
router.post('/service', async (req, res)=>{
    const User_id = req.body.userId
    const {address, serviceType, nameCenter, phoneNumber} = req.body;
    const update_data = await FirebaseStore.collection('user').doc(User_id).update({
        address: address, 
        serviceType: serviceType, 
        nameCenter: nameCenter, 
        phoneNumber: phoneNumber,
        input: true,
    })
    res.status(200).redirect(`/${User_id}`)
})
router.get('/:id', async (req, res)=>{
    const doc = await FirebaseStore.collection("user").doc(req.params.id).get();
    res.status(302).render('index', { contact: { id: doc.id, ...doc.data() }})
})
module.exports = router;