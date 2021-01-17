import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD5VQOD-A_i7q_eVGHJQXOMyDN90G9wOrA",
    authDomain: "playground-2020-fc882.firebaseapp.com",
    databaseURL: "https://playground-2020-fc882.firebaseio.com",
    projectId: "playground-2020-fc882",
    storageBucket: "playground-2020-fc882.appspot.com",
    messagingSenderId: "464406162544",
    appId: "1:464406162544:web:9abb3268962c35988398b5",
    measurementId: "G-H6LSZZCEG7"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if(!snapShot.exists){
        const { displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
            return userRef;
        } catch (err) {
            console.log("Error creating user", err.message);
        }
    }else{
        return userRef;
    }
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        console.log(newDocRef);
        batch.set(newDocRef, obj);
    })
    return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(
        doc => {
            const { title, items } = doc.data();
            return {
                routeName: encodeURI(title.toLowerCase()),
                id: doc.id,
                title,
                items,
            }
        }
    )
    return transformedCollection.reduce( (accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {})
}
firebase.initializeApp(config);

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject)
    })
}
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
