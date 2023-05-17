import { useAuthContext } from "../hooks/useAuthContext";
import { useFirestore } from "../hooks/useFirestore";

export default function BookmarkIcon({ post }) {
  const { addDocument, response } = useFirestore("bookmarks");
  const { updateDocument } = useFirestore("posts");
  const { user } = useAuthContext();

  const author = {
    displayName: user.displayName,
    photoURL: user.photoURL,
    id: user.uid,
  };

  const bookmark = {
    id: user.uid,
    author,
    content: post.content,
    imageURL: post.imageURL,
    comments: post.comments,
    likes: post.likes,
    share: post.share,
  };

  const bookmarkToAdd = {
    uid: user.uid,
    id: Math.random(),
  };

  // post bookmarked by the current user
  const bookmarkedPost = () => {
    return post.bookmarks.filter((bookmark) => bookmark.uid === user.uid);
  };
  const bookmarked = bookmarkedPost();

  const handleClick = async () => {
    if (bookmarked.length && bookmarked[0].uid === user.uid) {
      console.log("post already bookmarked");
    } else {
      await updateDocument(post.id, {
        bookmarks: [...post.bookmarks, bookmarkToAdd],
      });
      // add post to bookmak document when bookmark filed is added to post document
      if (!response.error) {
        await addDocument(bookmark);
      }
    }
  };

  return (
    <svg
      onClick={handleClick}
      xmlns="http://www.w3.org/2000/svg"
      fill={
        bookmarked.length && bookmarked[0].uid === user.uid
          ? "currentColor"
          : "none"
      }
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
      />
    </svg>
  );
}
