import { useState } from "react";
import { Link } from "react-router-dom";

// styles
import "./PostList.css";

// hooks and components
import { useTheme } from "../hooks/useTheme";
import { useFirestore } from "../hooks/useFirestore";
import { useAuthContext } from "../hooks/useAuthContext";
import Avatar from "./Avatar";
import Reaction from "./Reaction";
import BookmarkIcon from "./BookmarkIcon";
import Options from "./Options";

export default function PostList({ posts, msg }) {
  const { mode } = useTheme();
  const { user } = useAuthContext();
  const { updateDocument } = useFirestore("posts");

  const [options, setOptions] = useState(false);

  const handleClick = async (post) => {
    await updateDocument(post.id, {
      expands: (post.expands += 1),
    });
  };

  // check whether post has been viewed by user

  const handleMouseEnter = async (post) => {
    // posts viewed by the current user
    const viewed =
      post.views && post.views.filter((view) => view.uid === user.uid);

    const views = {
      uid: user.uid,
      id: Math.random(),
    };

    // check whether post has been viewed by the current user
    if (viewed) {
      if (viewed.length && viewed[0].uid === user.uid) {
        //
      } else {
        await updateDocument(post.id, {
          views: [...post.views, views],
        });
      }
    }
  };

  return (
    <div className="">
      {posts.length === 0 && <p className="msg">{msg}</p>}
      {posts.map((post) => (
        <div
          className="post"
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
            {options && <Options />}
            {user.uid !== post.author.id && <BookmarkIcon post={post} />}
            {user.uid === post.author.id && (
              <button className="icon-btn" onClick={() => setOptions(!options)}>
                <i className="fi fi-sr-menu-dots-vertical"></i>
              </button>
            )}
          </div>
          <div onClick={() => handleClick(post)}>
            <Link to={`/posts/${post.id}`}>
              <p
                className="post-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              {post.imageURL && (
                <img className="post-img" src={post.imageURL} alt="" />
              )}
            </Link>
          </div>
          <Link to={`/posts/${post.id}/analytics`}>
            <i class="fi fi-rr-chat-arrow-grow aly"></i>
          </Link>
          <Reaction post={post} />
        </div>
      ))}
    </div>
  );
}
