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

// firebase Config

// make auth and firestore references
const FirebaseAuth = firebase.auth();
const FirebaseStore = firebase.firestore();

export default {FirebaseAuth,FirebaseStore }