import Create from "./Create";
import { useCollection } from "../../hooks/useCollection";
import { useTheme } from "../../hooks/useTheme";

// components
import PostList from "../../components/PostList";

// styles
import "./Home.css";

export default function Home() {
  const { documents, error } = useCollection("posts");
  const { mode } = useTheme();

  return (
    <div className={`home ${mode}`}>
      <Create />
      {error && <p className="error">{error}</p>}
      {documents && <PostList posts={documents} />}
    </div>
  );
}
