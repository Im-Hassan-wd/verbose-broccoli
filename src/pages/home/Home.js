import { useState } from "react";

// styles
import "./Home.css";

// components and hooks
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import PostList from "../../components/PostList";
import Interest from "../../components/Interest";
import Create from "./Create";
import { useFirestore } from "../../hooks/useFirestore";
import { useTheme } from "../../hooks/useTheme";

export default function Home() {
  const [isAdd, setIsAdd] = useState(false);
  const { color } = useTheme();
  const { user } = useAuthContext();
  const { updateDocument } = useFirestore("users");
  const { documents, error } = useCollection("posts", "", [
    "createdAt",
    "desc",
  ]);
  const { documents: users } = useCollection("users");

  const localColor = localStorage.getItem("color");

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
      <div
        className={
          localColor
            ? `new-post color-${localColor}`
            : `new-post color-${color}`
        }
      >
        <button onClick={() => setIsAdd(!isAdd)}>
          <i className="fi fi-sr-plus"></i>
        </button>
        {isAdd && (
          <button>
            <i className="fi fi-sr-pencil"></i>
          </button>
        )}
        {isAdd && (
          <button>
            <i className="fi fi-sr-feather"></i>
          </button>
        )}
      </div>
      {userList !== null && userList[0]?.interests.length === 0 && <Interest />}
      <Create />
      {error && <p className="error">{error}</p>}
      {documents && <PostList posts={documents} msg="No posts yet!" />}
    </div>
  );
}
