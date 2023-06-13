import { NavLink } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useLogout } from "../hooks/useLogout";

// styles
import "./Sidebar.css";
import Searchbar from "./Searchbar";
import NavbarOption from "./NavbarOption";
import { useAuthContext } from "../hooks/useAuthContext";

const overviews = [
  { icon: "circle-f", name: "Feed", to: "/" },
  { icon: "bookmark", name: "Bookmarks", to: "/bookmarks" },
  { icon: "users", name: "Team blogs", to: "/b" },
  { icon: "envelope", name: "Drafts", to: "/d" },
  { icon: "chart-histogram", name: "Analytics", to: "/my-posts/analytic" },
];

const tags = [
  "Programming",
  "Data science",
  "Technology",
  "Machine learning",
  "Politics",
];

const personal = [
  { icon: "user", name: "Account", to: "/" },
  { icon: "bell", name: "Notification", to: "/bookmarks" },
];

export default function Sidebar({ screenWidth, mobileMenu, setMobileMenu }) {
  const { logout, isPending, error } = useLogout();
  const { user } = useAuthContext();
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

          {/* <Searchbar setMobileMenu={setMobileMenu} /> */}

          <ul>
            <h4>Overview</h4>
            {overviews.map((item) => (
              <li key={item.name}>
                <NavLink
                  onClick={() => setMobileMenu(false)}
                  className={
                    localColor ? `color-${localColor}` : `color-${color}`
                  }
                  exact
                  to={item.to}
                >
                  <i className={`fi fi-rr-${item.icon}`}></i>
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <ul>
            <h4>
              Tranding Tags <i className="fi fi-rr-arrow-trend-up"></i>
            </h4>
            {tags.map((item) => (
              <li className="tag-list" key={item}>
                {item}
              </li>
            ))}
          </ul>

          <ul>
            <h4>Personal</h4>
            {personal.map((item) => (
              <li key={item.name}>
                <NavLink
                  onClick={() => setMobileMenu(false)}
                  className={
                    localColor ? `color-${localColor}` : `color-${color}`
                  }
                  exact
                  to={item.to}
                >
                  <i className={`fi fi-rr-${item.icon}`}></i>
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          {error && <div className="error">{error}</div>}
          {!isPending && (
            <button className="btn" onClick={logout}>
              Logout
            </button>
          )}
          {isPending && (
            <button className="btn" disabled>
              Logging out...
            </button>
          )}

          {screenWidth < 404 && <NavbarOption />}
        </div>
      )}
    </>
  );
}
