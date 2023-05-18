import { useHistory, useParams } from "react-router-dom";

// styles
import "./Analytics.css";

// components and hooks
import Avatar from "../../components/Avatar";
import { useDocument } from "../../hooks/useDocument";
import Reaction from "../../components/Reaction";

export default function Analytics() {
  const history = useHistory();
  const { id } = useParams();
  const { error, document: post } = useDocument("posts", id);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="analytics">
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

        <span>Post Analytics</span>
      </button>

      {post && (
        <div className="analytic">
          <h3>Overview</h3>
          <div className="post">
            <div className="author">
              <Avatar src={post.author.photoURL} />
              <span>{post.author.displayName}</span>
              <span className="post-date">. date here</span>
            </div>
            <div className="content">
              <div className="img-div">
                <img src={post.imageURL} alt="" />
              </div>

              <p>{post.content}</p>
            </div>
          </div>
          <div className="react">
            <Reaction post={post} />
          </div>
        </div>
      )}
    </div>
  );
}
