import { useHistory, useParams } from "react-router-dom";

// styles
import "./Analytics.css";

// components and hooks
import Avatar from "../../components/Avatar";
import Reaction from "../../components/Reaction";
import { useDocument } from "../../hooks/useDocument";
import { useTheme } from "../../hooks/useTheme";
import Loader from "../../components/Loader";

export default function Analytics() {
  const history = useHistory();
  const { id } = useParams();
  const { mode } = useTheme();
  const { error, document: post } = useDocument("posts", id);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!document) {
    return <Loader />;
  }

  return (
    <div className="analytics">
      <button className="navigation" onClick={() => history.goBack()}>
        <i className="fi fi-rr-arrow-left"></i>
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
              <div className="icon-div">
                <i className="fi fi-sr-eye"></i>
              </div>
              <div>
                <span>Unique views</span>
                <p>{post.views.length}</p>
              </div>
            </li>

            <li>
              <div className="icon-div icon-div-2">
                <i className="fi fi-rr-expand-arrows-alt"></i>
              </div>
              <div>
                <span>Detail expands</span>
                <p>{post.expands}</p>
              </div>
            </li>

            <li>
              <div className="icon-div icon-div-3">
                <i className="fi fi-rr-bookmark"></i>
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
