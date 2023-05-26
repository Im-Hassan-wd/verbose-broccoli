import Avatar from "../../components/Avatar";
import Input from "../../components/Input";
import { useAuthContext } from "../../hooks/useAuthContext";
import Reaction from "../../components/Reaction";
import BookmarkIcon from "../../components/BookmarkIcon";

export default function PostDetails({ post }) {
  const { user } = useAuthContext();

  return (
    <div>
      <div className="post-summary">
        <div className="info">
          <Avatar src={post.author.photoURL} />
          <li>
            <span>{post.author.displayName}</span>
            <span className="post-date">
              {post.createdAt.toDate().toDateString().slice(3)}
            </span>
          </li>
          <BookmarkIcon post={post} />
          <button className="icon-btn">
            <i className="fi fi-sr-menu-dots-vertical"></i>
          </button>
        </div>
        <p
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
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
