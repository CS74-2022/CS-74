const router = require('express').Router();
const { maxAge, CreateTokenUserId, CreateTokenUserName,  } = require('../util/JWT')
const {FirebaseAuth} = require('../firebase')
// Get Login && Register Page //service
router.get('/', (req, res)=> res.status(302).render('signin'))

// Google

router.get('/404', (req, res)=>res.status(200).render('404'))
router.get('/500', (req, res)=>res.status(200).render('500'))
module.exports = router;