// import { useTheme } from "../hooks/useTheme";
import { timestamp } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFirestore } from "../hooks/useFirestore";
// styles
import "./Reaction.css";
import { useTheme } from "../hooks/useTheme";

export default function Reaction({ post }) {
  const { updateDocument, response } = useFirestore("posts");
  const { user } = useAuthContext();
  const { color } = useTheme();
  const localColor = localStorage.getItem("color");

  const likedPost = () => {
    return post.likes.filter((like) => like.uid === user.uid);
  };

  const like = likedPost();

  // like to add
  const handleLike = async () => {
    const likeToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(),
      uid: user.uid,
    };

    // check whether post has been liked by user
    if (like.length && like[0].uid === user.uid) {
      console.log("you already like this post");
    } else {
      await updateDocument(post.id, {
        likes: [...post.likes, likeToAdd],
      });
    }
  };

  return (
    <div className="reaction">
      <button
        className={
          like.length && like[0].uid === user.uid
            ? localColor
              ? `color-${localColor}`
              : `color-${color}`
            : "reactions"
        }
        onClick={handleLike}
      >
        <i className="fi fi-rr-social-network"></i>
        <span className="like r-span">
          Like
          {like.length >= 1 && <span>d</span>}
        </span>
        <span className="count">{post.likes.length}</span>
      </button>

      <button className="reactions">
        <i className="fi fi-rr-comment-alt-middle"></i>
        <span className="r-span">Comment </span>
        <span className="count">{post.comments.length}</span>
      </button>

      <button className="reactions">
        <i className="fi fi-rr-share-square"></i>
        <span className="r-span">Share</span>
        <span className="count">0</span>
      </button>
    </div>
  );
}
