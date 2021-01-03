import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
  apiKey: "AIzaSyDxhiDeIUiz9BnGmT0-H0h1wi2DVrwMVms",
  authDomain: "crwn-db-1e369.firebaseapp.com",
  projectId: "crwn-db-1e369",
  storageBucket: "crwn-db-1e369.appspot.com",
  messagingSenderId: "329780591772",
  appId: "1:329780591772:web:eab17b41594272ba464159",
  measurementId: "G-CP5XGLDE44"
};



firebase.initializeApp(config);

// set provide (google)
const provider = new firebase.auth.GoogleAuthProvider();

// It should be Async function since it will ask API - takes time
// Await when get or set user data
export const createUserProfileDocument = async (userAuth, additionalData) => {

  // if user doesn't exist, get out of function
  if (!userAuth) return;

  // get user document
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // const collectionRef = firestore.collection('users');

  // get user data - await.
  const snapShot = await userRef.get();
  // const collectionSnapshot = await collectionRef.get();
  // console.log({ collection: collectionSnapshot.docs.map(doc => doc.data()) });

  // If user does not exist
  if (!snapShot.exists) {

    // Export displayName and email from userAuth
    const { displayName, email } = userAuth;
    // Set date
    const createAt = new Date();

    try {
      // Set new user to firestore - await.
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  // return user Document
  return userRef;
}


export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  // Group all requests together into one big request to make sure
  // All of request sent, all of request set, any of requests fail, all requests will be failed
  const batch = firestore.batch();

  objectsToAdd.forEach(obj => {
    // Get a new document referene (id is automatically generated)
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  })

  return await batch.commit();
}


export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};


// auth and firestore
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// This will pops up the sign-in page (Google)
export const signInWithGoogle = () => firebase.auth().signInWithPopup(provider);

export default firebase;

