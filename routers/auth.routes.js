const router = require('express').Router();
const {FirebaseStore, FirebaseAuth} = require('../firebase-admin')
const TokenUserId = require('../util/Token');

router.get('/login', (req, res)=>{
    res.status(302).render('login')
})
router.get('/', (req, res) => {
    res.status(302).render('signin')
})

// Register
router.post('/register', (req, res)=>{
        const {username, email, password} = req.body;
        const user = FirebaseAuth.createUser({email, password})
            .then(cred => {
                const user  = FirebaseStore.collection('user').doc(cred.uid).set({
                    uid: cred.uid,
                    username: username,
                    email: email,
                    password: password,
                    ProfilePic: "user.jpeg"
                })
                const maxAge = 1000;
                const token = TokenUserId(cred.uid);
                res.cookie('CS74', token, {httpOnly: true})
                res.status(200).redirect('/login')
            });

})

// Login
router.post('/login', (req, res)=>{
    const email = req.body.email
    FirebaseStore.collection('user').where("email", "==", `${email}`).get()
        .then(() =>{
            const password = req.body.password
            const passwordCechs = FirebaseStore.collection('user').where("password", "==", `${password}`).get()
                .then(passwordCechs =>{
                    if (passwordCechs.empty) {
                        console.log('No matching documents.');
                        return;
                    }  
                    passwordCechs.forEach(doc => {
                        if(doc.data().password == password){
                            res.redirect(`/Home/${doc.data().uid}`)
                        }
                    });
                })
        })
})
module.exports = router