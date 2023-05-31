import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  // realtime data for documents
  useEffect(() => {
    const ref = db.collection(collection).doc(id);

    const unsub = ref.onSnapshot(
      (snapshot) => {
        setIsPending(true);
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
          setIsPending(false);
        } else {
          setError("no such document exists");
          setIsPending(false);
        }
      },
      (err) => {
        console.log(err.message);
        setIsPending(false);
        setError("failed to get document");
      }
    );

    return () => unsub();
  }, [collection, id]);

  return { document, error, isPending };
};
