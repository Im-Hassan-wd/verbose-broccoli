import Avatar from "../../components/Avatar";

export default function PostComment({ post }) {
  console.log(post.comments);
  return (
    <ul className="post-comments">
      {post.comments.length > 0 &&
        post.comments.map((comment) => (
          <li key={comment.id}>
            <div className="comment-author">
              <Avatar src={comment.photoURL} />
              <p>{comment.displayName}</p>
            </div>
            <div className="comment-date">
              <p>Date here</p>
            </div>
            <div className="comment-content">
              <p>{comment.content}</p>
            </div>
          </li>
        ))}
    </ul>
  );
}
