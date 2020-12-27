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


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
