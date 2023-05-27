import { useTheme } from "../hooks/useTheme";
import modeIcon from "../assets/mode-icon.svg";

// styles
import "./ThemeSelector.css";

const themeColors = ["2a85fe", "a058b3", "ff4545"];

export default function ThemeSelector() {
  const { changeColor, mode, changeMode } = useTheme();
  const localMode = localStorage.getItem("mode");

  const toggleMode = () => {
    changeMode(mode === "light" ? "dark" : "light");
  };

  return (
    <div className="theme-selector">
      <div className="mode-toggle">
        <button onClick={toggleMode}>
          <i
            className={
              mode === "light" || (localMode && localMode === "light")
                ? "fi fi-rr-toggle-off"
                : "fi fi-sr-toggle-on"
            }
          ></i>
        </button>
      </div>
      <div className="theme-buttons">
        {themeColors.map((color) => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{ background: "#" + color }}
          />
        ))}
      </div>
    </div>
  );
}
