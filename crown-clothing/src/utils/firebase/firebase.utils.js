import { initializeApp } from 'firebase/app';
import {
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBliesuu-5fOqCOB-IFkv9UkPuGExvCAfA",
  authDomain: "crown-clothing-db-53e06.firebaseapp.com",
  projectId: "crown-clothing-db-53e06",
  storageBucket: "crown-clothing-db-53e06.appspot.com",
  messagingSenderId: "40049993535",
  appId: "1:40049993535:web:c7f7169da4e563221a558a"
};

// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'user', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch(error) {
      console.log('error ', error.message);
    }
  }
  
  return userDocRef;
};