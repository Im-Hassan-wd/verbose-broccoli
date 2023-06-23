// styles
import "./Analytic.css";

// hooks and components
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import PostList from "../../components/PostList";
import React from "react";

export default function Analytic() {
  const { user } = useAuthContext();
  const { documents, error, isPending } = useCollection(
    "posts",
    ["author.id", "==", user.uid],
    ["createdAt", "desc"]
  );

  if (error) return <div className="error">{error}</div>;

  if (isPending) return <div className="loading">Loading...</div>;

  if (documents?.length === 0)
    return <div className="error">No analytics to display</div>;

  return (
    <React.Fragment>
      {documents?.length > 0 && (
        <div className="analytic">
          <h3>Posts analytics</h3>
          <div className="period">
            <span className="date">May 2023,</span>
            <span className="duration">25 days so far</span>
          </div>
          <div className="highlight">Posts highlights</div>
          <span className="date">Top posts</span>
          <span className="duration">earned 2890 impressions</span>
          <PostList posts={documents} btn={true} />

          <div className="summary">
            <h3>Posts summary</h3>
            <span className="duration">May 2023 summary</span>
          </div>
          <ul>
            <li>
              <span>Posts</span>
              <p>{documents?.length}</p>
            </li>
            <li>
              <span>Post impressions</span>
              <p>2.98k views</p>
            </li>
            <li>
              <span>Post visits</span>
              <p>300</p>
            </li>
            <li>
              <span>New followers</span>
              <p>300</p>
            </li>
          </ul>
        </div>
      )}
    </React.Fragment>
  );
}
