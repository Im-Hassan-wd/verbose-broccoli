import { Link } from "react-router-dom";

// styles
import "./Options.css";

// components && hooks
import { useAuthContext } from "../hooks/useAuthContext";

// context
import { useTheme } from "../hooks/useTheme";

export default function Options({ post }) {
  const { user } = useAuthContext();
  const { mode } = useTheme();

  return (
    <ul className={`options ${mode}`}>
      <li>
        <button>
          <Link to="/c">View anaytics</Link>
        </button>
      </li>
      {user.uid === post.author.id && (
        <li>
          <button>Delete</button>
        </li>
      )}
    </ul>
  );
}
