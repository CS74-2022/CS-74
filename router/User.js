const router = require('express').Router();
const {FirebaseStorageMultipleImageUploadMethod, FirebaseAuth, FirebaseStore} = require('../firebase');
const upload = require('../util/multer');
const { maxAge, CreateTokenUserId, CreateTokenUserName, CreateTokenUserPassword } = require('../util/JWT')

// Get Login && Register Page
router.get('/service/:id', (req, res)=> res.status(302).render('service'))
router.post('/service/:id', async (req, res)=>{
    try{
        console.log(req.params.id)
    }catch(err){{
        res.status(500).json(err)
    }}

})
/*
router.post('/SignUp',upload.array('img', 10), async (req, res)=>{
    try{
        const {username, email, password} = req.body;
        


    res.status(200).json('ok')
    }catch(err){{
        res.status(500).json(err)
    }}

})
*/
module.exports = router;