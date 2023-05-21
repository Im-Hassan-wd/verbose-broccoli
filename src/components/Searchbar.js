// styles
import "./Searchbar.css";

// hooks
import { useTheme } from "../hooks/useTheme";

export default function Searchbar() {
  const { mode } = useTheme();

  return (
    <div className={`searchbar ${mode}`}>
      <div className="seachbar-input-div">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>

        <input type="text" placeholder="Explore chatter..." />
      </div>
    </div>
  );
}
