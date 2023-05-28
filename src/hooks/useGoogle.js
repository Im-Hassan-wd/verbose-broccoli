import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { auth, db } from "../firebase/config";

export const useGoogle = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);

      if (!res) {
        throw new Error("Could not complete signup");
      }

      // create a user documant
      await db.collection("users").doc(res.user.uid).set({
        online: true,
        displayName: res.user.displayName,
        photoURL: res.user.photoURL,
        interests: [],
        email: res.user.email,
        name: res.user.displayName,
        headline: "",
      });

      // dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { googleSignIn, error, isPending };
};
