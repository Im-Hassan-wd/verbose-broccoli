import { useState, useEffect, useRef } from "react";
import { db } from "../firebase/config";

export const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIspending] = useState(false);

  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    setIspending(true);
    let ref = db.collection(collection);

    if (query) {
      ref = ref.where(...query);
    }

    if (orderBy) {
      ref = ref.orderBy(...orderBy);
    }

    const unsub = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        // update state
        setIspending(false);
        setDocuments(results);
        setError(null);
      },
      (err) => {
        setIspending(false);
        console.log(err.message);
        setError("failed to load posts");
      }
    );

    return () => unsub();
  }, [collection, query, orderBy]);

  return { documents, error, isPending };
};
