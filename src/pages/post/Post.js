// styles
import "./Post.css";

import { useParams, useHistory } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import { useTheme } from "../../hooks/useTheme";
import PostDetails from "./PostDetails";
import PostComment from "./PostComment";

export default function Post() {
  const { mode } = useTheme();
  const history = useHistory();
  const { id } = useParams();
  const { error, document } = useDocument("posts", id);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <button className="navigation" onClick={() => history.goBack()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>

        <span>Posts</span>
      </button>
      <div className={`post-details ${mode}`}>
        <PostDetails post={document} />
        <PostComment post={document} />
      </div>
    </>
  );
}
