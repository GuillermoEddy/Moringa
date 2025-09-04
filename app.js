// Importar Firebase (cargar desde CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
// Import the functions you need from the SDKs you need
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
const auth = getAuth(app);
const db = getFirestore(app);

// Referencias HTML
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const logoutBtn = document.getElementById("logoutBtn");
const postArea = document.getElementById("postArea");
const postText = document.getElementById("postText");
const postBtn = document.getElementById("postBtn");
const postsDiv = document.getElementById("posts");

// Registro
registerBtn.onclick = async () => {
  try {
    await createUserWithEmailAndPassword(auth, emailInput.value, passInput.value);
  } catch (err) {
    alert(err.message);
  }
};

// Login
loginBtn.onclick = async () => {
  try {
    await signInWithEmailAndPassword(auth, emailInput.value, passInput.value);
  } catch (err) {
    alert(err.message);
  }
};

// Logout
logoutBtn.onclick = () => signOut(auth);

// Detectar sesión
onAuthStateChanged(auth, (user) => {
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

// Publicar post
postBtn.onclick = async () => {
  const user = auth.currentUser;
  if (user && postText.value.trim() !== "") {
    await addDoc(collection(db, "posts"), {
      autor: user.email,
      contenido: postText.value,
      fecha: serverTimestamp()
    });
    postText.value = "";
  }
};

// Cargar posts en tiempo real
function cargarPosts() {
  const q = query(collection(db, "posts"), orderBy("fecha", "desc"));
  onSnapshot(q, (snapshot) => {
    postsDiv.innerHTML = "";
    snapshot.forEach(doc => {
      const p = doc.data();
      const div = document.createElement("div");
      div.className = "post";
      div.innerHTML = `<b>${p.autor}</b><br>${p.contenido}<br><small>${p.fecha?.toDate?.() || ""}</small>`;
      postsDiv.appendChild(div);
    });
  });
}

}
