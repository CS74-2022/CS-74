// 
const form = document.querySelector('#form')
const signInWithGoogleButton = document.getElementById('signInWithGoogle');
const signInWithFaceBookButton = document.getElementById('signInWithFaceBook');
// firebase Config
const config = {
    apiKey: "AIzaSyAl4O5bLxRPuBChntdJDmugQXy_GYMNQyw",
    authDomain: "wedding-organizer-1.firebaseapp.com",
    projectId: "wedding-organizer-1",
    storageBucket: "wedding-organizer-1.appspot.com",
    messagingSenderId: "943196194860",
    appId: "1:943196194860:web:3892005e8a179ffb222989",
    measurementId: "G-1E74WSQ6HS"
};
firebase.initializeApp(config);
// make auth and firestore references
const FirebaseAuth = firebase.auth();
const FirebaseStore = firebase.firestore();

// Google Login 
const signInWithGoogle = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    FirebaseAuth.signInWithRedirect(googleProvider)
        .then((cred) => {
            return FirebaseStore.collection('user').doc(cred.user.uid).set({
                userId : cred.user.uid,
                username: cred.user.displayName,
                email: cred.user.email,
                ProfilePic: cred.user.photoURL,
            }).then(()=> { 
                window.location.assign(`/Home/${user.uid}`)
            })
        }).catch(error => {
            console.error(error);
        })
}
signInWithGoogleButton.addEventListener('click', signInWithGoogle);

const signInWithFaceBook = ()=>{
    const facebookProvider = new firebase.auth.FacebookAuthProvider();

    FirebaseAuth.signInWithPopup(facebookProvider)
        .then(()=>{
            window.location.assign(`/Home`)
        }).catch(error => {
            console.error(error);
        })
}

signInWithFaceBookButton.addEventListener('click', signInWithFaceBook)

FirebaseAuth.onAuthStateChanged(user => {
    if(user)
        window.location.assign(`/Home/${user.uid}`);
})

