import { useHistory, useParams } from "react-router-dom";

// styles
import "./Analytics.css";

// components and hooks
import Avatar from "../../components/Avatar";
import Reaction from "../../components/Reaction";
import { useDocument } from "../../hooks/useDocument";
import { useTheme } from "../../hooks/useTheme";

export default function Analytics() {
  const history = useHistory();
  const { id } = useParams();
  const { mode } = useTheme();
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
          <div className="post">
            <div className="author">
              <Avatar src={post.author.photoURL} />
              <span>{post.author.displayName}</span>
              <span className="post-date">
                . {post.createdAt.toDate().toDateString()}
              </span>
            </div>
            <div className="content">
              {post.imageURL && (
                <div className="img-div">
                  <img src={post.imageURL} alt="" />
                </div>
              )}

              <p
                className="post-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>

          <div className="react">
            <Reaction post={post} />
          </div>

          <ul className="impressions">
            <li>
              <div className="svg-div">
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
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <span>Unique views</span>
                <p>{post.views.length}</p>
              </div>
            </li>

            <li>
              <div className="svg-div svg-div-2">
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
                    d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                  />
                </svg>
              </div>
              <div>
                <span>Detail expands</span>
                <p>{post.expands}</p>
              </div>
            </li>

            <li>
              <div className="svg-div svg-div-3">
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
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg>
              </div>
              <div>
                <span>Bookmarks</span>
                <p>{post.bookmarks.length}</p>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
