import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import Avatar from "./Avatar";
import Reaction from "./Reaction";
import { useFirestore } from "../hooks/useFirestore";

// styles
import "./PostList.css";
import { useAuthContext } from "../hooks/useAuthContext";

export default function PostList({ posts }) {
  const { mode } = useTheme();
  const { user } = useAuthContext();
  const { updateDocument } = useFirestore("posts");

  const handleClick = async (post) => {
    await updateDocument(post.id, {
      expands: (post.expands += 1),
    });
  };

  // check whether post has been viewed by user

  const handleMouseEnter = async (post) => {
    const viewPost = () => {
      return post.views && post.views.filter((view) => view.uid === user.uid);
    };

    const viewed = viewPost();

    const views = {
      uid: user.uid,
      id: Math.random(),
    };

    // check whether post has been liked by user
    if (viewed) {
      if (viewed.length && viewed[0].uid === user.uid) {
        console.log("you already viewed");
      } else {
        await updateDocument(post.id, {
          views: [...post.views, views],
        });
      }
    }
  };

  return (
    <div className="">
      {posts.length === 0 && <p>No posts yet!</p>}
      {posts.map((post) => (
        <div
          className={`post ${mode}`}
          key={post.id}
          onMouseEnter={() => handleMouseEnter(post)}
        >
          <div className="info">
            <Avatar src={post.author.photoURL} />
            <li>
              <span className="name">{post.author.displayName}</span>
              <span className="post-date">
                {post.createdAt.toDate().toDateString().slice(3)}
              </span>
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
          <div onClick={() => handleClick(post)}>
            <Link to={`/posts/${post.id}`}>
              <p>{post.content}</p>
              {post.imageURL && (
                <img className="post-img" src={post.imageURL} alt="" />
              )}
            </Link>
          </div>
          <Reaction post={post} />
        </div>
      ))}
    </div>
  );
}
