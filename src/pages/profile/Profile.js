import { useState } from "react";

// styles
import "./Profile.css";

// components and hooks
import Avatar from "../../components/Avatar";
import PostList from "../../components/PostList";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useTheme } from "../../hooks/useTheme";
import { useDocument } from "../../hooks/useDocument";
import { useCollection } from "../../hooks/useCollection";

export default function Profile() {
  const { user } = useAuthContext();
  const { color } = useTheme();
  const { error, document: currentUser } = useDocument("users", user.uid);
  const localColor = localStorage.getItem("color");

  const [isTabbed, setIsTabbed] = useState(true);

  // data
  const { documents: posts } = useCollection("posts", [
    "author.id",
    "==",
    user.uid,
  ]);
  const { documents: bookmarks } = useCollection("bookmarks", [
    "id",
    "==",
    user.uid,
  ]);

  return (
    <>
      {currentUser && (
        <div className="profile">
          <div className="banner">
            <Avatar src={user.photoURL} />
          </div>

          <div className="user-info">
            <h2>{currentUser.displayName}</h2>
            <p>Nigeria</p>

            <ul className="">
              <li>@{currentUser.displayName}</li>
              <span>.</span>
              <li>{currentUser.email}</li>
              <span>.</span>
              <li>This is what I do</li>
            </ul>

            <div className="btns">
              <button>Message</button>
              <button
                style={
                  localColor
                    ? { backgroundColor: `#${localColor}` }
                    : { backgroundColor: `#${color}` }
                }
              >
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
                    d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3"
                  />
                </svg>

                <span>Share profile</span>
              </button>
            </div>
          </div>
          <div className="interests">
            <h2>Interests</h2>
            <ul>
              {currentUser.interests.map((i) => (
                <li key={i}>#{i}</li>
              ))}
            </ul>
          </div>
          <ul>
            <li onClick={() => setIsTabbed(true)}>Posts</li>
            <li onClick={() => setIsTabbed(false)}>Bookmarks</li>
          </ul>
          {isTabbed ? (
            posts && (
              <PostList
                posts={posts}
                msg="Posts you've made will appear here"
              />
            )
          ) : (
            <PostList posts={bookmarks} msg="No posts in your bookmarks" />
          )}
        </div>
      )}
    </>
  );
}
