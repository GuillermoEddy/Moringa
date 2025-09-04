// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpku94Ge1DGotBTLk-rYdY1zyQUvEYuMY",
  authDomain: "moringa-85b1f.firebaseapp.com",
  projectId: "moringa-85b1f",
  storageBucket: "moringa-85b1f.firebasestorage.app",
  messagingSenderId: "40668368704",
  appId: "1:40668368704:web:142dabce23add5de39b4a5",
  measurementId: "G-G2LFXD4BTF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = firebase.auth();
const db = firebase.firestore();

// 🔹 Referencias a elementos HTML
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const logoutBtn = document.getElementById("logoutBtn");
const postArea = document.getElementById("postArea");
const postText = document.getElementById("postText");
const postBtn = document.getElementById("postBtn");
const postsDiv = document.getElementById("posts");

// 🔹 Autenticación
registerBtn.onclick = () => {
  auth.createUserWithEmailAndPassword(emailInput.value, passInput.value)
    .catch(err => alert(err.message));
};

loginBtn.onclick = () => {
  auth.signInWithEmailAndPassword(emailInput.value, passInput.value)
    .catch(err => alert(err.message));
};

logoutBtn.onclick = () => auth.signOut();

// 🔹 Cambios de sesión
auth.onAuthStateChanged(user => {
  if (user) {
    postArea.style.display = "block";
    logoutBtn.style.display = "inline";
    loginBtn.style.display = "none";
    registerBtn.style.display = "none";
    cargarPosts();
  } else {
    postArea.style.display = "none";
    logoutBtn.style.display = "none";
    loginBtn.style.display = "inline";
    registerBtn.style.display = "inline";
    postsDiv.innerHTML = "";
  }
});

// 🔹 Publicar
postBtn.onclick = () => {
  const user = auth.currentUser;
  if (user && postText.value.trim() !== "") {
    db.collection("posts").add({
      autor: user.email,
      contenido: postText.value,
      fecha: new Date()
    });
    postText.value = "";
  }
};

// 🔹 Mostrar posts en tiempo real
function cargarPosts() {
  db.collection("posts").orderBy("fecha", "desc").onSnapshot(snapshot => {
    postsDiv.innerHTML = "";
    snapshot.forEach(doc => {
      const p = doc.data();
      const div = document.createElement("div");
      div.className = "post";
      div.innerHTML = `<b>${p.autor}</b><br>${p.contenido}<br><small>${p.fecha.toDate()}</small>`;
      postsDiv.appendChild(div);
    });
  });
}