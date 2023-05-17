// styles
import "./Options.css";

// components && hooks

// context
import { useTheme } from "../hooks/useTheme";

export default function Options() {
  const { mode } = useTheme();

  return (
    <ul className={`options ${mode}`}>
      <li>
        <button>view analytics</button>
      </li>
      <li>
        <button>Delete</button>
      </li>
    </ul>
  );
}
