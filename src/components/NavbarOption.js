import { useLogout } from "../hooks/useLogout";

export default function NavbarOption() {
  const { logout, isPending } = useLogout();

  return (
    <div className="navbar-option">
      <button className="action">
        <i className="fi fi-sr-bell"></i>
      </button>
      {!isPending && (
        <button className="action" onClick={logout}>
          <i className="fi fi-sr-sign-out-alt"></i>
        </button>
      )}
      {isPending && (
        <button className="action" disabled>
          <i className="fi fi-sr-menu-dots"></i>
        </button>
      )}
    </div>
  );
}
