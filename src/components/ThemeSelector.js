import { useTheme } from "../hooks/useTheme";
import modeIcon from "../assets/mode-icon.svg";

// styles
import "./ThemeSelector.css";

const themeColors = ["2a85fe", "a058b3", "ff4545"];

export default function ThemeSelector() {
  const { changeColor, mode, changeMode } = useTheme();

  const toggleMode = () => {
    changeMode(mode === "light" ? "dark" : "light");
  };

  return (
    <div className="theme-selector">
      <div className="mode-toggle">
        <img
          onClick={toggleMode}
          src={modeIcon}
          alt="light / dark icon mode"
          style={{ filter: mode === "dark" ? "invert(100%)" : "invert(20%)" }}
        />
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
