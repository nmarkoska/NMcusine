import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBok_slhK4DzpCJNFI8NYXT5MK6mPvjlIg",
    authDomain: "recipesapp-a98ee.firebaseapp.com",
    projectId: "recipesapp-a98ee",
    storageBucket: "recipesapp-a98ee.appspot.com",
    messagingSenderId: "981530988792",
    appId: "1:981530988792:web:6b010d00835c29efd7ab0d",
    measurementId: "G-3H5XTJ3BX3"
  };

firebase.initializeApp(firebaseConfig);
  
export const firestore = firebase.firestore();
