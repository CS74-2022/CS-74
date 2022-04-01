// 
const form = document.querySelector('#form')
const signInWithGoogleButton = document.getElementById('signInWithGoogle');
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

    FirebaseAuth.signInWithPopup(googleProvider)
        .then((cred) => {
            return FirebaseStore.collection('user').doc(cred.user.uid).set({
                userId : cred.user.uid,
                username: cred.user.displayName,
                email: cred.user.email,
                ProfilePic: cred.user.photoURL
            }).then(()=> { 
                window.location.assign(`/service/${cred.user.uid}`)
            })
        }).catch(error => {
            console.error(error);
        })
}
signInWithGoogleButton.addEventListener('click', signInWithGoogle);