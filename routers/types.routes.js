const router = require('express').Router();
const {FirebaseStorageMultipleImageUploadMethod, FirebaseStorage, FirebaseStore} = require('../firebase-admin');;
const multer = require('../util/multer');

// Get Pages
router.get('/service/:id', async (req, res) => {
    const doc = await FirebaseStore.collection("user").doc(req.params.id).get();
    res.status(302).render('page/service', {contact: { id: doc.id, ...doc.data() }})
})
// Post
router.post('/Types', multer.single('img'), async (req, res) => {
    
})


module.exports = router;