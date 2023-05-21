import Avatar from "../../components/Avatar";
import Input from "../../components/Input";
import { useTheme } from "../../hooks/useTheme";
import { useAuthContext } from "../../hooks/useAuthContext";
import Reaction from "../../components/Reaction";
import BookmarkIcon from "../../components/BookmarkIcon";

export default function PostDetails({ post }) {
  const { mode } = useTheme();
  const { user } = useAuthContext();

  return (
    <div>
      <div className={`post-summary ${mode}`}>
        <div className="info">
          <Avatar src={post.author.photoURL} />
          <li>
            <span>{post.author.displayName}</span>
            <span className="post-date">
              {post.createdAt.toDate().toDateString().slice(3)}
            </span>
          </li>
          <BookmarkIcon post={post} />
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
        <p dangerouslySetInnerHTML={{ __html: post.content }} />
        <img className="post-summary-img" src={post.imageURL} alt="" />
        <Reaction post={post} />
      </div>
      <div className="comment-header">
        <Avatar src={user.photoURL} />
        <Input post={post} />
      </div>
    </div>
  );
}
