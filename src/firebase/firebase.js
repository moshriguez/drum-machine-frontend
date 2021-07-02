import firebase from 'firebase'
import 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBLbzPkdDB_0ahx7JggBA-nca1uvIZCzKg",
    authDomain: "drum-machine-27.firebaseapp.com",
    projectId: "drum-machine-27",
    storageBucket: "drum-machine-27.appspot.com",
    messagingSenderId: "477939781777",
    appId: "1:477939781777:web:d9a42c9a609d1839f06f30"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()

export { storage, firebase as default }