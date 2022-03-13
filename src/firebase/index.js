import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC66357n3PjNQaQZlfup7eGs-8B4RlWw7c",
    authDomain: "bullbear-5d199.firebaseapp.com",
    projectId: "bullbear-5d199",
    storageBucket: "bullbear-5d199.appspot.com",
    messagingSenderId: "459404669773",
    appId: "1:459404669773:web:44e342117eeac2c1223d04"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const signUp = ({ email, password }) => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
            if (!user) {
                throw new Error('user didnt create')
            }
            return user;
        })
        .catch(({ code, message }) => {
            throw { code, message };
        })
}

export const login = ({ email, password }) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
            if (!user) {
                throw new Error('user didnt exists')
            }
            return user;
        })
        .catch(({ code, message }) => {
            throw { code, message };
        })
}
