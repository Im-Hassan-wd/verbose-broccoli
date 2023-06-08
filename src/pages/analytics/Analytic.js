// styles
import "./Analytic.css";

// hooks and components
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import PostList from "../../components/PostList";

export default function Analytic() {
  const { user } = useAuthContext();
  const { documents, error, isPending } = useCollection(
    "posts",
    ["author.id", "==", user.uid],
    ["createdAt", "desc"]
  );

  return (
    <div className="analytic">
      <h3>Post analytics</h3>
      <div className="period">
        <span className="date">May 2023,</span>
        <span className="duration">25 days so far</span>
      </div>
      <div className="highlight">Posts highlights</div>
      <span className="date">Top posts</span>
      <span className="duration">earned 2890 impressions</span>
      {isPending && <div className="loading">Loading...</div>}
      {documents && <PostList posts={documents} btn={true} />}
      <div className="summary"></div>
    </div>
  );
}
