
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc, increment, runTransaction } from "firebase/firestore";

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

// Register user and increment global counter only if new
export const registerUserIfNew = async (userId: string, email: string) => {
    const userRef = doc(db, "users", userId);
    const globalStatsRef = doc(db, "stats", "global");

    try {
        await runTransaction(db, async (transaction) => {
            const userSnap = await transaction.get(userRef);
            
            if (!userSnap.exists()) {
                // User doesn't exist, create profile and increment counter
                transaction.set(userRef, {
                    email: email,
                    completedLessons: [],
                    joinedAt: new Date()
                });

                // Increment student count
                transaction.update(globalStatsRef, {
                    totalStudents: increment(1)
                });
            }
        });
    } catch (e) {
        console.error("Transaction failed: ", e);
        // If global stats doc doesn't exist yet, we might need to create it manually or handle error
        // For this demo, we assume stats/global exists or is created by the first vote/register
    }
};

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

// --- Voting & Stats System ---

export const getLessonRating = async (lessonId: string): Promise<number> => {
  try {
    const docRef = doc(db, "ratings", lessonId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().score || 0;
    }
    return 0;
  } catch (e) {
    console.error("Error fetching rating", e);
    return 0;
  }
};

export interface GlobalStats {
    totalScore: number;
    totalStudents: number;
}

export const getGlobalStats = async (): Promise<GlobalStats> => {
    try {
        const docRef = doc(db, "stats", "global");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                totalScore: data.totalScore || 0,
                totalStudents: data.totalStudents || 0
            };
        }
        return { totalScore: 0, totalStudents: 0 };
    } catch (e) {
        return { totalScore: 0, totalStudents: 0 };
    }
}

export const voteLesson = async (lessonId: string, voteType: 'up' | 'down', userId?: string) => {
    const ratingRef = doc(db, "ratings", lessonId);
    const globalStatsRef = doc(db, "stats", "global");
    const userVoteRef = userId ? doc(db, "users", userId, "votes", lessonId) : null;

    try {
        await runTransaction(db, async (transaction) => {
            // Check if user already voted (if logged in)
            if (userVoteRef) {
                const userVoteSnap = await transaction.get(userVoteRef);
                if (userVoteSnap.exists()) {
                    throw new Error("User already voted");
                }
            }

            // Get current lesson rating or init
            const ratingSnap = await transaction.get(ratingRef);
            if (!ratingSnap.exists()) {
                transaction.set(ratingRef, { score: 0, likes: 0, dislikes: 0 });
            }

            // Get global stats or init
            const globalSnap = await transaction.get(globalStatsRef);
            if (!globalSnap.exists()) {
                transaction.set(globalStatsRef, { totalScore: 0, totalStudents: 0 });
            }

            const change = voteType === 'up' ? 1 : -1;

            // Updates
            transaction.update(ratingRef, { 
                score: increment(change),
                likes: voteType === 'up' ? increment(1) : increment(0),
                dislikes: voteType === 'down' ? increment(1) : increment(0)
            });

            transaction.update(globalStatsRef, {
                totalScore: increment(change)
            });

            if (userVoteRef) {
                transaction.set(userVoteRef, { type: voteType, timestamp: new Date() });
            }
        });
        return true;
    } catch (e) {
        console.error("Vote failed: ", e);
        return false;
    }
};
