import { useState } from "react";
import { Link } from "react-router-dom";

// styles
import "./Options.css";
import Confirm from "./Confirm";

export default function Options({ post }) {
  const [isConfirm, setIsConfirm] = useState(false);

  return (
    <div className="options">
      <Link to={`/posts/${post.id}/analytics`}>
        <i className="fi fi-rr-chat-arrow-grow aly"></i>
      </Link>
      <button className="icon-btn">
        <i className="fi fi-rr-pencil"></i>
      </button>
      <button className="icon-btn" onClick={() => setIsConfirm(true)}>
        <i className="fi fi-rr-cross-circle"></i>
      </button>

      {isConfirm && (
        <Confirm
          title={`Post ${post.id}`}
          type="delete"
          item="post"
          setIsConfirm={setIsConfirm}
          post={post}
        />
      )}
    </div>
  );
}
