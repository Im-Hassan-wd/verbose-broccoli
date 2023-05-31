// styles
import "./Post.css";

import { useParams, useHistory } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import PostDetails from "./PostDetails";
import PostComment from "./PostComment";

export default function Post() {
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
        <i className="fi fi-rr-arrow-left"></i>
        <span>Posts</span>
      </button>

      <div className="post-details">
        <PostDetails post={document} />
        <PostComment post={document} />
      </div>
    </>
  );
}
