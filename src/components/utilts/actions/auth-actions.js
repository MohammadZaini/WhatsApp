import { createUserWithEmailAndPassword, getAuth } from "@firebase/auth";
import { getFirebaseApp } from "../firebase-helper";

export const signUp = async (firstName, lastName, email, password) => {
    const app = getFirebaseApp();
    const auth = getAuth(app);

    try {
        const result = await createUserWithEmailAndPassword(auth, email, password)
        console.log(result)
    } catch (error) {
        const errorCode = error.error;
        let message = "Something went wrong";

        if (errorCode === "auth/email-already-in-use") {
            message = "This email is already in use"
        };
        throw new Error(message)
    }

};