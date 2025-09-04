// firebase-config.js (versión correcta para usar en <script src="firebase-config.js"></script>)
const firebaseConfig = {
  apiKey: "AIzaSyBpku94Ge1DGotBTLk-rYdY1zyQUvEYuMY",
  authDomain: "moringa-85b1f.firebaseapp.com",
  projectId: "moringa-85b1f",
  storageBucket: "moringa-85b1f.appspot.com",
  messagingSenderId: "40668368704",
  appId: "1:40668368704:web:142dabce23add5de39b4a5",
  measurementId: "G-G2LFXD4BTF"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
