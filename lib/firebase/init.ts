import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6npa3r8KY708PmFTrpiqdN0_lK0uOrhU",
  authDomain: "cvmakerindo.firebaseapp.com",
  projectId: "cvmakerindo",
  storageBucket: "cvmakerindo.firebasestorage.app",
  messagingSenderId: "795594439664",
  appId: "1:795594439664:web:74b0e8295ae13817d5bb35",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
export const db = getFirestore(app);

export default app;
