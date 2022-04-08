const router = require('express').Router();
const {FirebaseStorageMultipleImageUploadMethod, FirebaseStorage, FirebaseStore} = require('../firebase-admin');;
const multer = require('../util/multer');

// Get Pages
router.get('/Types/:id', async (req, res) => {
    const doc = await FirebaseStore.collection("user").doc(req.params.id).get();
    res.status(302).render('page/Types', {contact: { id: doc.id, ...doc.data() }})
})



module.exports = router;