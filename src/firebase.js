import firebase from "firebase/app";
import "firebase/database";

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyC28nhXgkOpxuKLY2VBacsOML7V8ZhKx4s",
    authDomain: "spellbook-38955.firebaseapp.com",
    databaseURL: "https://spellbook-38955.firebaseio.com",
    projectId: "spellbook-38955",
    storageBucket: "spellbook-38955.appspot.com",
    messagingSenderId: "66976700318",
    appId: "1:66976700318:web:c1eb9d363152aef6e1a88f",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
