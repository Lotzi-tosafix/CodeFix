
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { 
    getFirestore,
    doc, 
    setDoc, 
    getDoc, 
    updateDoc, 
    increment, 
    runTransaction, 
    collection, 
    addDoc, 
    query, 
    orderBy, 
    getDocs,
    deleteDoc
} from "firebase/firestore";

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

// Standard Firestore initialization
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

// Helper functions for reading/writing user data

// Register user and increment global counter only if new
// FIX: Reads strictly before Writes
export const registerUserIfNew = async (userId: string, email: string) => {
    const userRef = doc(db, "users", userId);
    const globalStatsRef = doc(db, "stats", "global");

    try {
        await runTransaction(db, async (transaction) => {
            // Step 1: Perform ALL reads first
            const userSnap = await transaction.get(userRef);
            const globalStatsSnap = await transaction.get(globalStatsRef);
            
            // Step 2: Logic & Writes
            if (!userSnap.exists()) {
                // Create user profile
                transaction.set(userRef, {
                    email: email,
                    completedLessons: [],
                    joinedAt: new Date()
                });

                // Update global counter
                if (!globalStatsSnap.exists()) {
                     transaction.set(globalStatsRef, { totalStudents: 1, totalScore: 0 });
                } else {
                     transaction.update(globalStatsRef, {
                        totalStudents: increment(1)
                    });
                }
            }
        });
    } catch (e) {
        console.error("Transaction failed: ", e);
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

export const getLessonRating = async (lessonId: string): Promise<{score: number, userVote: 'up' | 'down' | null}> => {
  try {
    const docRef = doc(db, "ratings", lessonId);
    const docSnap = await getDoc(docRef);
    
    let userVote: 'up' | 'down' | null = null;
    if (auth.currentUser) {
       const voteRef = doc(db, "users", auth.currentUser.uid, "votes", lessonId);
       const voteSnap = await getDoc(voteRef);
       if (voteSnap.exists()) {
           userVote = voteSnap.data().type;
       }
    }

    if (docSnap.exists()) {
      return { score: docSnap.data().score || 0, userVote };
    }
    return { score: 0, userVote };
  } catch (e) {
    console.error("Error fetching rating", e);
    return { score: 0, userVote: null };
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

// Logic handles: Add Vote, Remove Vote (Toggle), Switch Vote
export const voteLesson = async (lessonId: string, voteType: 'up' | 'down', userId?: string) => {
    if (!userId) return false;

    const ratingRef = doc(db, "ratings", lessonId);
    const globalStatsRef = doc(db, "stats", "global");
    const userVoteRef = doc(db, "users", userId, "votes", lessonId);

    try {
        await runTransaction(db, async (transaction) => {
            // Step 1: Perform ALL reads
            const userVoteSnap = await transaction.get(userVoteRef);
            const ratingSnap = await transaction.get(ratingRef);
            const globalSnap = await transaction.get(globalStatsRef);

            let previousVoteType: 'up' | 'down' | null = null;
            if (userVoteSnap.exists()) {
                previousVoteType = userVoteSnap.data().type;
            }

            // Prepare Initial Docs if missing
            if (!ratingSnap.exists()) {
                transaction.set(ratingRef, { score: 0, likes: 0, dislikes: 0 });
            }
            if (!globalSnap.exists()) {
                transaction.set(globalStatsRef, { totalScore: 0, totalStudents: 0 });
            }

            // Step 2: Determine Action (Add, Remove, Switch)
            
            // CASE 1: REMOVE VOTE (User clicked the same button again)
            if (previousVoteType === voteType) {
                // Reverse the previous vote
                const scoreChange = previousVoteType === 'up' ? -1 : 1;
                const likeChange = previousVoteType === 'up' ? -1 : 0;
                const dislikeChange = previousVoteType === 'down' ? -1 : 0;

                transaction.update(ratingRef, {
                    score: increment(scoreChange),
                    likes: increment(likeChange),
                    dislikes: increment(dislikeChange)
                });
                transaction.update(globalStatsRef, {
                    totalScore: increment(scoreChange)
                });
                transaction.delete(userVoteRef);
            }
            
            // CASE 2: SWITCH VOTE (User clicked opposite button)
            else if (previousVoteType !== null && previousVoteType !== voteType) {
                // Remove old effect AND Add new effect
                // If switching Up -> Down: Score -2 (-1 to remove up, -1 to add down)
                // If switching Down -> Up: Score +2 (+1 to remove down, +1 to add up)
                
                const scoreChange = voteType === 'up' ? 2 : -2;
                
                transaction.update(ratingRef, {
                    score: increment(scoreChange),
                    likes: increment(voteType === 'up' ? 1 : -1),
                    dislikes: increment(voteType === 'down' ? 1 : -1)
                });
                transaction.update(globalStatsRef, {
                    totalScore: increment(scoreChange)
                });
                transaction.update(userVoteRef, { type: voteType, timestamp: new Date() });
            }

            // CASE 3: NEW VOTE
            else {
                const scoreChange = voteType === 'up' ? 1 : -1;
                
                transaction.update(ratingRef, {
                    score: increment(scoreChange),
                    likes: increment(voteType === 'up' ? 1 : 0),
                    dislikes: increment(voteType === 'down' ? 1 : 0)
                });
                transaction.update(globalStatsRef, {
                    totalScore: increment(scoreChange)
                });
                transaction.set(userVoteRef, { type: voteType, timestamp: new Date() });
            }
        });
        return true;
    } catch (e) {
        console.error("Vote transaction failed: ", e);
        return false;
    }
};

// --- Admin Features ---

// Save Contact Message
export const saveContactMessage = async (name: string, email: string, subject: string, message: string) => {
    try {
        await addDoc(collection(db, "contact_submissions"), {
            name,
            email,
            subject,
            message,
            timestamp: new Date()
        });
        return true;
    } catch (e) {
        console.error("Error saving contact message: ", e);
        return false;
    }
};

// Save Lesson Feedback (Dislike)
export const saveLessonFeedback = async (lessonId: string, feedback: string, userEmail?: string) => {
    try {
        await addDoc(collection(db, "lesson_feedback"), {
            lessonId,
            feedback,
            userEmail: userEmail || 'Anonymous',
            timestamp: new Date()
        });
        return true;
    } catch (e) {
        console.error("Error saving feedback: ", e);
        return false;
    }
};

// Get All Contact Messages (For Admin)
export const getAdminMessages = async () => {
    try {
        const q = query(collection(db, "contact_submissions"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
        console.error("Error fetching admin messages: ", e);
        return [];
    }
};

// Get All Feedback (For Admin)
export const getAdminFeedback = async () => {
    try {
        const q = query(collection(db, "lesson_feedback"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
        console.error("Error fetching admin feedback: ", e);
        return [];
    }
};
