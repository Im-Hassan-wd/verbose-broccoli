import { NavLink, Link } from "react-router-dom";

// components and hooks
import { useAuthContext } from "../hooks/useAuthContext";
import Avatar from "./Avatar";

// styles
import "./Navbar.css";
import NavbarOption from "./NavbarOption";

export default function Navbar({ screenWidth, mobileMenu, setMobileMenu }) {
  const { user } = useAuthContext();

  return (
    <nav>
      {!mobileMenu && screenWidth < 549 && (
        <button className="burger" onClick={() => setMobileMenu(true)}>
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
              d="M3.75 9h16.5m-16.5 6.75h16.5"
            />
          </svg>
        </button>
      )}
      <div className="logo">
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
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
        <span>Home</span>
      </div>
      <ul>
        <li>
          <NavLink exact to="/">
            Feeds
          </NavLink>
        </li>
        <li>
          <NavLink to="/explore">Explore</NavLink>
        </li>
      </ul>
      <div className="more">
        {screenWidth > 404 && <NavbarOption />}
        <Link to="/profile" className="user">
          <span>{user.displayName}</span>
          <Avatar src={user.photoURL} />
        </Link>
      </div>
    </nav>
  );
}
