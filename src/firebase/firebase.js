import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAq-qt825Syn4jAB19Ew61G4K4Eq0XHIiU",
  authDomain: "tiktok-clone-omarro.firebaseapp.com",
  projectId: "tiktok-clone-omarro",
  storageBucket: "tiktok-clone-omarro.appspot.com",
  messagingSenderId: "356213169410",
  appId: "1:356213169410:web:390c56aff46b24562f361b",
};
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);
/* const auth = getAuth(app); */
const storage = getStorage(app);

// export
/* export { app, auth, firestore, storage }; */
export { app, firestore, storage };
