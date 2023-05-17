import Avatar from "../../components/Avatar";
// import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default function PostComment({ post }) {
  return (
    <ul className="post-comments">
      {post.comments.length > 0 ? (
        <h4>
          <span>All comments</span>
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
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </h4>
      ) : (
        <h4>No comments yet</h4>
      )}
      {post.comments.length > 0 &&
        post.comments.map((comment) => (
          <li key={comment.id}>
            <div className="comment-author">
              <Avatar src={comment.photoURL} />
              <div className="comment-content">
                <p>{comment.displayName}:</p>
                <span>{comment.content}</span>
              </div>
            </div>
            <span className="comment-date">
              date here
              {/* {formatDistanceToNow(comment.createdAt.toDate(), {
                addSuffix: true,
              })} */}
            </span>
          </li>
        ))}
    </ul>
  );
}
