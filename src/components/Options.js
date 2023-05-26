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
    <div className="options">
      <button>View anaytics</button>
      <button>Delete</button>
    </div>
  );
}
