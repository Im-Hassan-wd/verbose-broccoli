// styles
import "./Profile.css";

// components and hooks
import Avatar from "../../components/Avatar";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Profile() {
  const { user } = useAuthContext();
  return (
    <div className="profile">
      <div className="banner" />
      <Avatar src={user.photoURL} />
    </div>
  );
}
