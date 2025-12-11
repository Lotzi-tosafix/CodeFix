
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBABqz4_M8vVYIuZmLGehePksuW_c2h5y0",
  authDomain: "codefix-553a5.firebaseapp.com",
  projectId: "codefix-553a5",
  storageBucket: "codefix-553a5.firebasestorage.app",
  messagingSenderId: "1039946058720",
  appId: "1:1039946058720:web:e4bb406b89aaca9e803985",
  measurementId: "G-V7FHE7RGGH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

// Helper functions for reading/writing user data
export const saveUserData = async (userId: string, completedLessons: string[]) => {
  try {
    await setDoc(doc(db, "users", userId), {
      completedLessons: completedLessons,
      lastUpdated: new Date()
    }, { merge: true });
  } catch (e) {
    console.error("Error saving document: ", e);
  }
};

export const getUserData = async (userId: string): Promise<string[]> => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().completedLessons || [];
    }
  } catch (e) {
    console.error("Error reading document: ", e);
  }
  return [];
};