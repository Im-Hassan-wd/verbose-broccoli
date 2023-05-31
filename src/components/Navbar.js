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
          <i className="fi fi-rr-bars-sort"></i>
        </button>
      )}
      <div className="logo">
        <i className="fi fi-sr-house-chimney"></i>
        <span>Home</span>
      </div>
      <ul>
        <li>
          <NavLink className="navlink" exact to="/">
            Feeds
          </NavLink>
        </li>
        <li>
          <NavLink className="navlink" to="/explore">
            Explore
          </NavLink>
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
