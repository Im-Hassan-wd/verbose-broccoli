import Avatar from "../../components/Avatar";
import Input from "../../components/Input";
import { useAuthContext } from "../../hooks/useAuthContext";
import Reaction from "../../components/Reaction";
import BookmarkIcon from "../../components/BookmarkIcon";
import { usePostReadTime } from "../../hooks/usePostReadTime";

export default function PostDetails({ post }) {
  const { user } = useAuthContext();
  const { calculateReadingTime } = usePostReadTime();

  return (
    <div>
      <div className="post-summary">
        <div className="info">
          <Avatar src={post.author.photoURL} />
          <li>
            <span>{post.author?.firstName}</span>
            <div className="post-date">
              {post.createdAt.toDate().toDateString().slice(3)}
            </div>
          </li>
          <BookmarkIcon post={post} />
          <button className="icon-btn">
            <i className="fi fi-sr-menu-dots-vertical"></i>
          </button>
        </div>
        <h2>{post?.title}</h2>
        <div className="read">
          <i className="fi fi-rr-book-alt"></i>
          <span>{calculateReadingTime(post.content)}</span>
        </div>
        <p
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        {post.imageURL && (
          <img
            className="post-img post-summary-img"
            src={post.imageURL}
            alt="post thumbnail"
          />
        )}
        <Reaction post={post} />
      </div>
      <div className="comment-header">
        <Avatar src={user.photoURL} />
        <Input post={post} />
      </div>
    </div>
  );
}
