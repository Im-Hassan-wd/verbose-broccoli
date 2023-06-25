// styles
import "./Bookmark.css";

// components & hooks
import { useCollection } from "../../hooks/useCollection";
import PostList from "../../components/PostList";
import { useAuthContext } from "../../hooks/useAuthContext";
import Loader from "../../components/Loader";

export default function Bookmark() {
  const { user } = useAuthContext();
  const {
    documents: bookmarks,
    isPending,
    error,
  } = useCollection("bookmarks", ["id", "==", user.uid]);

  if (isPending) return <Loader />;

  if (error) return <div className="error"></div>;

  return (
    <div className="bookmark">
      {bookmarks && (
        <PostList
          posts={bookmarks}
          msg="Posts you put bookmark will appear here..."
        />
      )}
    </div>
  );
}
