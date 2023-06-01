// styles
import "./Settings.css";

//components
import ThemeSelector from "../../components/ThemeSelector";
import { useLogout } from "../../hooks/useLogout";

export default function Settings() {
  const { logout, isPending, error } = useLogout();

  return (
    <div className="settings">
      <ThemeSelector />
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
    </div>
  );
}
