import { useAuthContext } from "../hooks/useAuthContext";
import { useFirestore } from "../hooks/useFirestore";
import { v4 as uuid } from "uuid";

export default function BookmarkIcon({ post }) {
  const { addDocument, response: addResponse } = useFirestore("bookmarks");
  const { updateDocument, response: updateResponse } = useFirestore("posts");
  const { user } = useAuthContext();

  const author = {
    displayName: post.author.displayName,
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

  // console.log(bookmarked);

  const handleClick = async () => {
    if (bookmarked.length && bookmarked[0].userId === user.uid) {
      console.log("post already bookmarked by you");
    } else {
      // add post to bookmarked collection
      await addDocument(bookmark);
      if (!addResponse.error) {
        console.log("post added to bookmark collection");
      }
      // add post to post collection
      await updateDocument(post.id, {
        bookmarks: [...post.bookmarks, bookmarkToAdd],
      });
      if (!updateResponse.error) {
        console.log("post added to post collection");
      }
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
