import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAV3VBBAbKHOVlhC2sF9QwWh8sFgsFkJq0",
  authDomain: "crwn-db-2433c.firebaseapp.com",
  databaseURL: "https://crwn-db-2433c.firebaseio.com",
  projectId: "crwn-db-2433c",
  storageBucket: "crwn-db-2433c.appspot.com",
  messagingSenderId: "742855986238",
  appId: "1:742855986238:web:fe8201f4f25d4a14ab556f",
  measurementId: "G-GNZ9DMMM2W"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
