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
    <nav className="navbar">
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
        <i className="fi fi-sr-house-chimney"></i>
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
