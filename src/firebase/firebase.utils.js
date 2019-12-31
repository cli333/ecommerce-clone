import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "",
  authDomain: "crown-db-d4b4a.firebaseapp.com",
  databaseURL: "https://crown-db-d4b4a.firebaseio.com",
  projectId: "crown-db-d4b4a",
  storageBucket: "crown-db-d4b4a.appspot.com",
  messagingSenderId: "382147981072",
  appId: "1:382147981072:web:cb0c091efe753af0cb7f95",
  measurementId: "G-5SKP5SJFQ6"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // // find fake user with id: 123test
  // const userRef = firestore.doc("users/123test");
  // // get snapshot of user
  // const snapshot = await userRef.get();

  // destructure uid from userAuth returned from google api
  const { uid, displayName, email } = userAuth;
  // query firebase for user with uid
  const userRef = firestore.doc(`users/${uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const createdAt = new Date();
    // if no user exists create new user in firebase
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
