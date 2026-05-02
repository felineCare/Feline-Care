import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer, initializeFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

console.log('Initializing Firebase with config:', {
  projectId: firebaseConfig.projectId,
  databaseId: firebaseConfig.firestoreDatabaseId,
  authDomain: firebaseConfig.authDomain
});

const app = initializeApp(firebaseConfig);

// Using initializeFirestore to enable forceLongPolling which can help with connection issues in proxy environments
// @ts-ignore
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  // Using regular fetch instead of streaming which can be blocked
  useFetchStreams: false,
}, firebaseConfig.firestoreDatabaseId);

export const auth = getAuth(app);

// Connectivity check as per instructions
async function testConnection() {
  try {
    console.log('Testing Firestore connection to database:', firebaseConfig.firestoreDatabaseId);
    // Increased timeout or simple get to see if it even reaches
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Firestore connection successful.');
  } catch (error: any) {
    console.error("Firestore initial connection test failed:", error);
    console.error("Error Code:", error.code);
    console.error("Error Message:", error.message);
    
    if (error instanceof Error && (error.message.includes('the client is offline') || error.message.includes('unavailable'))) {
      console.error("Please check your Firebase configuration or internet connection. If you just set up Firebase, it might take a few minutes for the database to be ready.");
    }
  }
}
testConnection();
