import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, GoogleAuthProvider, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const setP = async ()=>await setPersistence(auth, browserLocalPersistence);
setP();
export const persistance = auth.setPersistence(browserLocalPersistence);



export const GoogleAuth = new GoogleAuthProvider(app);
export const db = getFirestore(app);