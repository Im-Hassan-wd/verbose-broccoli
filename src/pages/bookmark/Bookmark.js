// styles
import "./Bookmark.css";

// components & hooks
import { useCollection } from "../../hooks/useCollection";
import PostList from "../../components/PostList";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Bookmark() {
  const { user } = useAuthContext();
  const {
    documents: bookmarks,
    isPending,
    error,
  } = useCollection("bookmarks", ["id", "==", user.uid]);

  return (
    <div className="bookmark">
      {isPending && <div className="loading">loading...</div>}
      {error && <div className="error">{error}</div>}
      {bookmarks && (
        <PostList
          posts={bookmarks}
          msg="Posts you put bookmark will appear here..."
        />
      )}
    </div>
  );
}
