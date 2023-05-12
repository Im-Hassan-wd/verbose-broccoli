import Create from "./Create";
import { useCollection } from "../../hooks/useCollection";

// components
import PostList from "../../components/PostList";

// styles
import "./Home.css";

export default function Home() {
  const { documents, error } = useCollection("posts");

  return (
    <div className="home">
      <Create />
      {error && <p className="error">{error}</p>}
      {documents && <PostList posts={documents} />}
    </div>
  );
}
