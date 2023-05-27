import { useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

// styles
import "./PostList.css";

// hooks and components
import { useFirestore } from "../hooks/useFirestore";
import { useAuthContext } from "../hooks/useAuthContext";
import Avatar from "./Avatar";
import Reaction from "./Reaction";
import BookmarkIcon from "./BookmarkIcon";
import Options from "./Options";
import Confirm from "./Confirm";

export default function PostList({ posts, msg }) {
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
      id: uuid(),
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

  const handleOptions = (index) => {
    setOptions((state) => ({
      ...state,
      [index]: !state[index],
    }));
  };

  return (
    <div className="">
      {posts.length === 0 && <p className="msg">{msg}</p>}
      {posts.map((post, index) => (
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
            {options[index] && <Options post={post} />}
            {user.uid !== post.author.id && <BookmarkIcon post={post} />}
            {user.uid === post.author.id && (
              <button className="icon-btn" onClick={() => handleOptions(index)}>
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
          <Reaction post={post} />
          {/* <Confirm /> */}
        </div>
      ))}
    </div>
  );
}
