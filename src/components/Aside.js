// styles
import "./Aside.css";

// components and hooks
import Avatar from "./Avatar";
import { useDocument } from "../hooks/useDocument";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Aside() {
  const { user } = useAuthContext();
  const { error, document: currentUser } = useDocument("users", user.uid);

  return (
    <aside>
      {currentUser && (
        <div className="wrapper">
          <div className="profile">
            <div className="banner">
              <Avatar src={currentUser?.photoURL} />
            </div>

            <div className="user-info">
              <h2>{currentUser?.name}</h2>
              <p>Nigeria</p>

              <ul className="">
                <li>@{currentUser?.displayName.toLowerCase()}</li>
                <span>.</span>
                <li>{currentUser?.email}</li>
                <span>.</span>
                <li>{currentUser?.headline}</li>
              </ul>
            </div>
          </div>

          <ul className="interests">
            <h4>Interests</h4>
            {currentUser.interests.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
