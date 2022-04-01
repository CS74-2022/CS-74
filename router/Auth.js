const router = require('express').Router();
const {FirebaseAuth, FirebaseStore} = require('../firebase');
const { maxAge, CreateTokenUserId, CreateTokenUserName,  } = require('../util/JWT')
const { forwardAuthenticated } = require('../config/AuthConfig');
const User = require('../model/User');
const bcrypt = require('bcrypt')
const passport = require('passport')

// Get Login && Register Page //service
router.get('/sigIn',forwardAuthenticated, (req, res)=> res.status(302).render('signin'))
router.get('/signUp',forwardAuthenticated, (req, res)=> res.status(302).render('signUp'))

router.post('/register', async (req, res)=>{
    try{
        const {username, email, password, password2, address, serviceType, nameCenter, phoneNumber} = req.body;

        const error = [];

        if(!username || !email || !password || !password2) error.push({msg: "please enter data"})

        if(password != password2) error.push({msg: "Password error"})

        if(password.length <= 6) error.push({msg: "password is week"});

        if(error.length > 0){
            res.status(200).render('/', { error, username, email,password, password2 })
        }else{
            User.findOne({email: email})
                .then(result => {
                    if(result){
                        error.push({msg: "email is already registered"});
                        res.status(200).render('/', { error, username, email,password, password2 })    
                    } else {
                            const userCreate = FirebaseAuth.createUser({email, password})
                    .then(cred => {
                        FirebaseStore.collection('user').doc(cred.uid).set({
                            userID: cred.uid,
                            username: username,
                            email: email,
                            password: password,
                            address: address,
                            phoneNumber: phoneNumber,
                            serviceType: serviceType,
                            nameCenter: nameCenter
                        })
                        const firebaseID = cred.uid;
                        const newUser = User({firebaseID, username,email, password, address, phoneNumber, serviceType, nameCenter})
                            bcrypt.genSalt(10, (err, salt)=>{
                                bcrypt.hash(newUser.password, salt, (err, hash)=>{
                                    if(err) throw err;
                                    newUser.password = hash;
                                    newUser.save()
                                        .then(user => {
                                            const token_ID = CreateTokenUserId(user._id);
                                            const token_Username = CreateTokenUserName(user.username);

                                            res.cookie('SETT', token_ID, {httpOnly: true, expiresIn: maxAge * 1000})
                                            res.cookie('_contr', token_Username, {httpOnly: true, expiresIn: maxAge * 1000})

                                            res.redirect('/sigIn')
                                        })
                                })
                            })
                    })
                    }
                })
        }
    }catch(err){
        res.status(500).render('500')
    }

})

// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/sigIn',
        failureFlash: true
    })(req, res, next);
});

// Google

router.get('/404', (req, res)=>res.status(200).render('404'))
router.get('/500', (req, res)=>res.status(200).render('500'))
module.exports = router;