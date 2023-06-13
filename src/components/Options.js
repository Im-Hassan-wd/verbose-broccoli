import { useState } from "react";

// styles
import "./Options.css";
import Confirm from "./Confirm";

export default function Options({ post, setOptions }) {
  const [isConfirm, setIsConfirm] = useState(false);

  return (
    <div className="options">
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
          setOptions={setOptions}
        />
      )}
    </div>
  );
}
