// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrxXOOVjbUjCC1WTiasnjdA1F1lKkxhvA",
  authDomain: "portfolio-73c3c.firebaseapp.com",
  projectId: "portfolio-73c3c",
  storageBucket: "portfolio-73c3c.firebasestorage.app",
  messagingSenderId: "891503858769",
  appId: "1:891503858769:web:0a1bee2435595052101470"
};

// Initialize Firebase App (Compat SDK)
firebase.initializeApp(firebaseConfig);

// Expose globals for database and auth
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
