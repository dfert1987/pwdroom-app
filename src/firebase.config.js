import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDzyKgjeV0hVV3q9CI0nLFzAlrnhuPDdEk',
    authDomain: 'pwdroom-app.firebaseapp.com',
    projectId: 'pwdroom-app',
    storageBucket: 'pwdroom-app.appspot.com',
    messagingSenderId: '836444993373',
    appId: '1:836444993373:web:a2ff3ce2f7c55aa3db5ab4',
};

initializeApp(firebaseConfig);
export const db = getFirestore();
