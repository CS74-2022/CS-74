const router = require('express').Router();
const {FirebaseStorageMultipleImageUploadMethod, FirebaseStore} = require('../firebase');

// Get Pages
router.get('/AddService/:id', (req, res) => res.status(302).render('Page/PostService'))

// Post 

// Delete

// Update

module.exports = router;