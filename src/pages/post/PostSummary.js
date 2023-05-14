import Avatar from "../../components/Avatar";
import Input from "../../components/Input";
import { useTheme } from "../../hooks/useTheme";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function PostSummary({ post }) {
  const { mode } = useTheme();
  const { user } = useAuthContext();

  return (
    <div>
      <div className={`post-summary ${mode}`}>
        <div className="info">
          <Avatar src={post.author.photoURL} />
          <li>
            <span>{post.author.displayName}</span>
            <span>date here</span>
          </li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
            />
          </svg>
        </div>
        <p>{post.content}</p>
        <img className="post-summary-img" src={post.imageURL} alt="" />
        <div className="reaction">
          <button>
            <span>Like</span>
          </button>
          <button>
            <span>Comment</span>
          </button>
          <button>
            <span>Share</span>
          </button>
        </div>
      </div>
      <div className="comment-header">
        <Avatar src={user.photoURL} />
        <Input post={post} />
      </div>
    </div>
  );
}
