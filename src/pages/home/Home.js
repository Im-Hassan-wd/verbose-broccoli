// components and hooks
import Create from "./Create";
import RichTextEditor from "./RichTextEditor";
import { useCollection } from "../../hooks/useCollection";
import { useTheme } from "../../hooks/useTheme";
import PostList from "../../components/PostList";
import { useAuthContext } from "../../hooks/useAuthContext";

// styles
import "./Home.css";

export default function Home() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection("posts", "", [
    "createdAt",
    "desc",
  ]);
  const { mode } = useTheme();

  return (
    <div className={`home ${mode}`}>
      <Create />
      <RichTextEditor />
      {error && <p className="error">{error}</p>}
      {documents && <PostList posts={documents} />}
    </div>
  );
}
