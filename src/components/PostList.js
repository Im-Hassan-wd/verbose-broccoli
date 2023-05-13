import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import Avatar from "./Avatar";
// styles
import "./PostList.css";

export default function PostList({ posts }) {
  const { mode } = useTheme();

  return (
    <div className="">
      {posts.length === 0 && <p>No posts yet!</p>}
      {posts.map((post) => (
        <Link className={`post ${mode}`} key={post.id} to={`/posts/${post.id}`}>
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
          <img className="post-img" src={post.imageURL} alt="" />
        </Link>
      ))}
    </div>
  );
}
