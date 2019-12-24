import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyB320pNxRcvJs2Ids62wGUv_5HeKkBlDDE",
  authDomain: "crown-db-d4b4a.firebaseapp.com",
  databaseURL: "https://crown-db-d4b4a.firebaseio.com",
  projectId: "crown-db-d4b4a",
  storageBucket: "crown-db-d4b4a.appspot.com",
  messagingSenderId: "382147981072",
  appId: "1:382147981072:web:cb0c091efe753af0cb7f95",
  measurementId: "G-5SKP5SJFQ6"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
