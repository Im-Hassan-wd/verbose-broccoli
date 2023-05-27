import { NavLink } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

// styles
import "./Sidebar.css";
import Searchbar from "./Searchbar";
import NavbarOption from "./NavbarOption";

export default function Sidebar({ screenWidth, mobileMenu, setMobileMenu }) {
  const { color } = useTheme();

  const localColor = localStorage.getItem("color");

  return (
    <>
      {(mobileMenu || screenWidth > 550) && (
        <div className="sidebar">
          <div
            className={
              localColor ? `logo color-${localColor}` : `logo color-${color}`
            }
          >
            <i className="fi fi-sr-comment-quote"></i>

            <span>Chatter</span>
          </div>

          <Searchbar setMobileMenu={setMobileMenu} />

          <ul>
            <li>
              <NavLink
                onClick={() => setMobileMenu(false)}
                className={
                  localColor ? `color-${localColor}` : `color-${color}`
                }
                exact
                to="/"
              >
                <i className="fi fi-sr-house-chimney"></i>
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => setMobileMenu(false)}
                className={
                  localColor ? `color-${localColor}` : `color-${color}`
                }
                to="/c"
              >
                <i className="fi fi-sr-users-alt"></i>
                <span>Communities</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => setMobileMenu(false)}
                className={
                  localColor ? `color-${localColor}` : `color-${color}`
                }
                to="/settings"
              >
                <i className="fi fi-sr-settings"></i>
                <span>Setting</span>
              </NavLink>
            </li>
          </ul>

          {screenWidth < 404 && <NavbarOption />}
        </div>
      )}
    </>
  );
}
