import { useAuthContext } from "../hooks/useAuthContext";
import { useDocument } from "../hooks/useDocument";
import { useFirestore } from "../hooks/useFirestore";
import { v4 as uuid } from "uuid";

export default function BookmarkIcon({ post }) {
  const { addDocument } = useFirestore("bookmarks");
  const { updateDocument } = useFirestore("posts");
  const { user } = useAuthContext();
  const { document: currentUser } = useDocument("users", user.uid);

  // bookmark data
  const author = {
    firstName: post.author?.firstName,
    lastName: post.author?.lastName,
    photoURL: post.author.photoURL,
    id: post.author.id,
    headline: post.author.headline,
  };

  const bookmarkToAdd = {
    userId: user.uid,
    id: uuid(),
    postId: post.id,
  };

  const bookmark = {
    userId: user.uid,
    postId: post.id,
    author,
    content: post.content,
    imageURL: post.imageURL,
    comments: post.comments,
    likes: post.likes,
    share: post.share,
    views: post.views,
    bookmarks: post.bookmarks,
  };

  // post bookmarked by the current user
  const bookmarked =
    post.bookmarks &&
    post.bookmarks.filter((bookmark) => bookmark.userId === user.uid);

  const handleClick = async () => {
    if (bookmarked.length && bookmarked[0].userId === user.uid) {
      console.log("post already bookmarked by you");
    } else {
      // add post to bookmarked collection
      await addDocument(bookmark);
      // add post to post collection
      await updateDocument(post.id, {
        bookmarks: [...post.bookmarks, bookmarkToAdd],
      });
    }
  };

  return (
    <button className="icon-btn" onClick={handleClick}>
      {bookmarked.length && bookmarked[0].userId === user.uid ? (
        <i className="fi fi-sr-bookmark"></i>
      ) : (
        <i className="fi fi-rr-bookmark"></i>
      )}
    </button>
  );
}
