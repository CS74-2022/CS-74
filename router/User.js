const router = require('express').Router();
const {FirebaseStorageMultipleImageUploadMethod, FirebaseAuth, FirebaseStore} = require('../firebase');
const upload = require('../util/multer');
const { maxAge, CreateTokenUserId, CreateTokenUserName, CreateTokenUserPassword } = require('../util/JWT')

// Get Login && Register Page
router.get('/service/:id', async (req, res)=>{

    const doc = await FirebaseStore.collection("user").doc(req.params.id).get();


    res.status(302).render('service', { contact: { id: doc.id, ...doc.data() }})
})
router.post('/service', async (req, res)=>{
    const id = req.body.ss
    console.log(id)
})

module.exports = router;