// styles
import "./Home.css";

// components and hooks
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import PostList from "../../components/PostList";
import Interest from "../../components/Interest";
import Create from "./Create";
import { useFirestore } from "../../hooks/useFirestore";

export default function Home() {
  const { user } = useAuthContext();
  const { updateDocument } = useFirestore("users");
  const { documents, error } = useCollection("posts", "", [
    "createdAt",
    "desc",
  ]);
  const { documents: users } = useCollection("users");

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
      <Create />
      {error && <p className="error">{error}</p>}
      {documents && <PostList posts={documents} msg="No posts yet!" />}
    </div>
  );
}
