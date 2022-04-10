const admin = require('firebase-admin');
const serviceAccount = require('./wedding-organizer.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


const FirebaseStorage = admin.storage();
const FirebaseAuth = admin.auth();
const FirebaseStore = admin.firestore();

// Upload Multiple Images
const FirebaseStorageMultipleImageUploadMethod = async file => {
    return new Promise(resolve => {
        FirebaseStorage.bucket('gs://wedding-organizer-1.appspot.com').upload(file, (err, res)=>{
            if (err) return res.status(500).send("upload image error")
            resolve({
                res: res.secure_url
            })
        })
    })
}

module.exports = {FirebaseStorageMultipleImageUploadMethod, FirebaseStorage, FirebaseAuth, FirebaseStore};