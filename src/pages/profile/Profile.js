// styles
import "./Profile.css";

// components and hooks
import Avatar from "../../components/Avatar";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Profile() {
  const { user } = useAuthContext();
  return (
    <div className="profile">
      <div className="banner">
        <Avatar src={user.photoURL} />
      </div>

      <div className="info">
        <h2>Amanda Smith</h2>
        <p>Nigeria</p>
        <ul className="">
          <li>@amanda21</li>
          <li>. Lead product designer</li>
        </ul>

        <div className="btns">
          <button>Message</button>
          <button>
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
    </div>
  );
}
