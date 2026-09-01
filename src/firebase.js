import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBU9yUWUC9f7J3R7VJyIBkz9HC0W-T8on8",
  authDomain: "muzammil-ai.firebaseapp.com",
  projectId: "muzammil-ai",
  storageBucket: "muzammil-ai.firebasestorage.app",
  messagingSenderId: "857760060566",
  appId: "1:857760060566:web:a8d029d64a58ac1b489eb7",
  measurementId: "G-8L9J1KF30C"
};

const app = initializeApp(firebaseConfig);

// Analytics optional hai
if (await isSupported()) {
  try {
    getAnalytics(app);
  } catch (error) {
    console.log("Analytics unavailable");
  }
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
