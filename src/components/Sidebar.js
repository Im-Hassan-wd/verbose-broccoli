import { NavLink } from "react-router-dom";

// styles
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <span>Chatter</span>
      </div>

      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/">Communities</NavLink>
        </li>
        <li>
          <NavLink to="/">Setting</NavLink>
        </li>
      </ul>
    </div>
  );
}
