const router = require('express').Router();
const {FirebaseStorageMultipleImageUploadMethod, FirebaseStorage, FirebaseStore} = require('../firebase-admin');;
const multer = require('../util/multer');

// Get Pages
router.get('/service/:id', async (req, res) => {
    const doc = await FirebaseStore.collection("user").doc(req.params.id).get();
    res.status(302).render('page/service', {contact: { id: doc.id, ...doc.data() }})
})
// Post
router.post('/Service', multer.single('img'), async (req, res) => {
    const { CName, serviceType, address, phoneNumber, userId , titleCenter} = req.body;
        const file = req.file.filename;
        FirebaseStorage.bucket('gs://wedding-organizer-1.appspot.com').file(file, (err, res)=>{
            if (err) return res.status(500).send("upload image error")
            resolve({
                res: res.secure_url
            })
})
        FirebaseStore.collection('Service').doc(userId).set({
            CenterName: CName,
            serviceType: serviceType,
            address: address,
            phoneNumber: phoneNumber,
            Image: file,
            dataInput: true,
            titleCenter: titleCenter
        }).then(()=>{
            res.status(200).redirect(`/Home/${userId}`)
            })
})

// delete 
router.post('/Service/Delete', async (req, res) => {
        FirebaseStore.collection('Service').doc(userId).delete().then(()=>{
            res.status(200).redirect(`/Home/${userId}`)
            })
})


module.exports = router;