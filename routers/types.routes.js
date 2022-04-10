const router = require('express').Router();
const { FirebaseStorageMultipleImageUploadMethod, FirebaseStore } = require('../firebase-admin');
const multer = require('../util/multer');

// Get Pages
router.get('/Types/:id', async (req, res) => {
    const doc = await FirebaseStore.collection("user").doc(req.params.id).get();
    res.status(302).render('page/Types', {contact: { id: doc.id, ...doc.data() }})
})

// Post Data
router.post('/typesService', multer.array('image', 5), async (req, res) => {

            const userId = req.params.id
            // Upload Images Function
            const urls = [];
            const files = req.files;
            for (const file of files) {
                const { path } = file;
                const newPath = await FirebaseStorageMultipleImageUploadMethod(path);
                urls.push(newPath);
            }
            
})

module.exports = router;