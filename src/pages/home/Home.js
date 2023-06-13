import { Link } from "react-router-dom";

// styles
import "./Home.css";

// components and hooks
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import { useTheme } from "../../hooks/useTheme";
import PostList from "../../components/PostList";
import Interest from "../../components/Interest";
import Create from "./Create";
import Aside from "../../components/Aside";
import React from "react";

export default function Home({ sw }) {
  const { color } = useTheme();
  const localColor = localStorage.getItem("color");

  const { user } = useAuthContext();
  const { updateDocument } = useFirestore("users");
  const { documents: users } = useCollection("users");
  const { documents, error, isPending } = useCollection("posts", "", [
    "createdAt",
    "desc",
  ]);

  const userList =
    users &&
    users.filter((u) => {
      return u.id === user.uid;
    });

  const updateUser = async () => {
    await updateDocument(user.uid, {
      email: user.email,
    });
  };

  return (
    <div className="home" onClick={updateUser}>
      {userList !== null && userList[0]?.interests.length === 0 && <Interest />}
      {isPending && <div className="loading">Loading...</div>}
      {error && <p className="error">{error}</p>}
      {documents && (
        <React.Fragment>
          <div className="main-content">
            <div className="create">
              <h1>Feed</h1>
              <Link className="btn" to="create-post">
                <i className="fi fi-rr-pencil"></i>
                <span>Post a content</span>
              </Link>
            </div>
            <ul className="home-list">
              <li>
                <button>For you</button>
              </li>
              <li>
                <button>Featured</button>
              </li>
              <li>
                <button>Recent</button>
              </li>
            </ul>
            <PostList posts={documents} msg="No posts yet!" />
          </div>
          {sw > 1050 && <Aside />}
        </React.Fragment>
      )}
    </div>
  );
}
