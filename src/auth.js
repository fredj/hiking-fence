import * as firebase from 'firebase/app';
import 'firebase/auth';

const provider = new firebase.auth.GoogleAuthProvider();


export function getUser() {
  return new Promise(resolve => {
    firebase.auth().onAuthStateChanged(user => resolve(user));
  });
}


export function signIn() {
  firebase.auth().onAuthStateChanged(user => {
    if (!user) {
      firebase.auth().signInWithRedirect(provider);
    }
  });
}


export function signOut() {
  return firebase.auth().signOut();
}
