import { Link } from "react-router-dom";
import { timestamp } from "../firebase/config";

// styles
import "./Reaction.css";

// hooks
import { useTheme } from "../hooks/useTheme";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFirestore } from "../hooks/useFirestore";

export default function Reaction({ post }) {
  const { updateDocument, response } = useFirestore("posts");
  const { user } = useAuthContext();
  const { color } = useTheme();
  const localColor = localStorage.getItem("color");

  const like = post.likes.filter((like) => like.uid === user.uid);

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
      <button className="reactions">
        <Link to={`/posts/${post.id}`}>
          <i className="fi fi-rr-comments"></i>
          <span className="count">{post.comments.length}</span>
        </Link>
      </button>

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
        <i className="fi fi-rr-heart"></i>
        <span className="count">{post.likes.length}</span>
      </button>

      <button className="reactions">
        <i className="fi fi-rr-share-square"></i>
        <span className="count">{post.views.length}</span>
        <span className="r-span">views</span>
      </button>
    </div>
  );
}
