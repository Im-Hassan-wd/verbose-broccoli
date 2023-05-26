import { useAuthContext } from "../hooks/useAuthContext";
import { useFirestore } from "../hooks/useFirestore";

export default function BookmarkIcon({ post }) {
  const { addDocument, response } = useFirestore("bookmarks");
  const { updateDocument } = useFirestore("posts");
  const { user } = useAuthContext();

  const author = {
    displayName: post.author.displayName,
    photoURL: post.author.photoURL,
    id: post.author.id,
  };

  const bookmark = {
    id: user.uid,
    author,
    content: post.content,
    imageURL: post.imageURL,
    comments: post.comments,
    likes: post.likes,
    share: post.share,
    views: post.views,
    bookmarks: post.bookmarks,
  };

  const bookmarkToAdd = {
    uid: user.uid,
    id: Math.random(),
  };

  // post bookmarked by the current user

  const bookmarked =
    post.bookmarks &&
    post.bookmarks.filter((bookmark) => bookmark.uid === user.uid);

  const handleClick = async () => {
    if (bookmarked.length && bookmarked[0].uid === user.uid) {
      console.log("post already bookmarked by you");
    } else {
      await updateDocument(post.id, {
        bookmarks: [...post.bookmarks, bookmarkToAdd],
      });
      await addDocument(bookmark);
    }
  };

  return (
    <button className="icon-btn" onClick={handleClick}>
      {bookmarked.length && bookmarked[0].uid === user.uid ? (
        <i className="fi fi-sr-bookmark"></i>
      ) : (
        <i className="fi fi-rr-bookmark"></i>
      )}
    </button>
  );
}
