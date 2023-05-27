import { Link } from "react-router-dom";

// styles
import "./Options.css";

export default function Options({ post }) {
  return (
    <div className="options">
      <Link to={`/posts/${post.id}/analytics`}>
        <i className="fi fi-rr-chat-arrow-grow aly"></i>
      </Link>
      <button className="icon-btn">
        <i className="fi fi-rr-pencil"></i>
      </button>
      <button className="icon-btn">
        <i class="fi fi-rr-cross-circle"></i>
      </button>
    </div>
  );
}
