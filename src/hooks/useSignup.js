import { useState, useEffect } from "react";
import { auth, db, storage } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (
    name,
    email,
    password,
    displayName,
    headline,
    thumbnail
  ) => {
    setError(null);
    setIsPending(true);

    try {
      // signup
      const res = await auth.createUserWithEmailAndPassword(email, password);

      if (!res) {
        throw new Error("Could not complete signup");
      }

      // upload user thumbnail
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
      const img = await storage.ref(uploadPath).put(thumbnail);
      const downloadURL = await img.ref.getDownloadURL();

      // add display AND PHOTO_URL name to user
      await res.user.updateProfile({ displayName, photoURL: downloadURL });

      // create a user documant
      await db.collection("users").doc(res.user.uid).set({
        online: true,
        displayName,
        photoURL: downloadURL,
        interests: [],
        email,
        name,
        headline,
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

  return { signup, error, isPending };
};
