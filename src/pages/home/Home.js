// styles
import "./Home.css";

// components and hooks
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import { useDocument } from "../../hooks/useDocument";
import { useTheme } from "../../hooks/useTheme";
import PostList from "../../components/PostList";
import Interest from "../../components/Interest";
import Create from "./Create";
import { useFirestore } from "../../hooks/useFirestore";
import { useEffect } from "react";

export default function Home() {
  const { user } = useAuthContext();
  const { updateDocument, response } = useFirestore("users");
  const { documents, error } = useCollection("posts", "", [
    "createdAt",
    "desc",
  ]);
  const { documents: userDocs, error: userError } = useCollection("users");
  const { mode } = useTheme();

  const userList =
    userDocs &&
    userDocs.filter((u) => {
      return u.id === user.uid;
    });

  return (
    <div className="home">
      {userList && userList[0].interests.length === 0 && <Interest />}
      <Create />
      {error && <p className="error">{error}</p>}
      {documents && <PostList posts={documents} />}
    </div>
  );
}
