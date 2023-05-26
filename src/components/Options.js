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
      <button className="icon-btn">
        <i className="fi fi-rr-pencil"></i>
      </button>
      <button className="icon-btn">
        <i class="fi fi-rr-cross-circle"></i>
      </button>
    </div>
  );
}
