import React from "react";
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
import Aside from "../../components/Aside";
import Loader from "../../components/Loader";

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

  if (error) return <div className="error">{error}</div>;

  if (documents?.length === 0)
    return <div className="error">Failed to load post...</div>;

  if (isPending) return <Loader />;

  return (
    <div className="home" onClick={updateUser}>
      {userList !== null && userList[0]?.interests.length === 0 && <Interest />}
      {documents && (
        <React.Fragment>
          <div className="main-content">
            <div className="create">
              <div>
                <h1>Feed</h1>
                <p>Explore different content you’d love </p>
              </div>
              <Link className="btn" to="create-post">
                <i className="fi fi-rr-pencil"></i>
                <span>
                  Post <span>a content</span>
                </span>
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
