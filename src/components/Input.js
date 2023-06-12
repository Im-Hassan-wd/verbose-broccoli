import { useState } from "react";
import { timestamp } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFirestore } from "../hooks/useFirestore";
import { useDocument } from "../hooks/useDocument";
import { v4 as uuid } from "uuid";

// styles
import "./Input.css";

export default function Input({ post }) {
  const { updateDocument, response } = useFirestore("posts");
  const { user } = useAuthContext();
  const { document: currentUser } = useDocument("users", user.uid);

  const [newComment, setNewComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      firstName: currentUser?.firstName,
      photoURL: currentUser?.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: uuid(),
    };
    await updateDocument(post.id, {
      comments: [...post.comments, commentToAdd],
    });
    if (!response.error) {
      setNewComment("");
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Leave a comment"
        required
        onChange={(e) => setNewComment(e.target.value)}
        value={newComment}
      />
    </form>
  );
}
