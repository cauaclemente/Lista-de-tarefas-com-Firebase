import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAq3IkBnE_0Jg3imVCy46Mz0SG0Ys-MgvM",
    authDomain: "teste-c76a5.firebaseapp.com",
    projectId: "teste-c76a5",
    storageBucket: "teste-c76a5.appspot.com",
    messagingSenderId: "194379665897",
    appId: "1:194379665897:web:985fd38b7344e07170fb78",
    measurementId: "G-NZLSVPMRHQ"
}

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth }